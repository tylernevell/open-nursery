import { zValidator } from '@hono/zod-validator';
import { and, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import type { auth } from 'src/lib/auth';
import type { ApiResponse } from 'src/lib/types';
import {
  type Baby,
  type BabyWithCaregivers,
  babiesTable,
  babyToCaregiversTable,
  insertBabySchema,
} from '~/schema/personas-schema';
import { nurseryDb } from '~/service';
const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
}>();

// Get all babies for the current caregiver
app.get('/', async (c) => {
  try {
    const userId = c.get('user').id;

    const babies = await nurseryDb.query.babiesTable.findMany({
      with: {
        caregivers: {
          columns: {
            role: true,
          },
          where: eq(babyToCaregiversTable.caregiverId, Number(userId)),
        },
      },
    });

    return c.json<ApiResponse<Baby[]>>({
      data: babies,
      error: null,
    });
  } catch (error) {
    return c.json<ApiResponse<Baby[]>>(
      {
        data: null,
        error: {
          message: 'Failed to fetch babies',
          code: 'FETCH_ERROR',
        },
      },
      500
    );
  }
});

// Create new baby
app.post('/', zValidator('json', insertBabySchema), async (c) => {
  try {
    const userId = c.get('user').id;

    const body = await c.req.json();

    // Start a transaction to create baby and relationship
    const result = await nurseryDb.transaction(async (tx) => {
      const [baby] = await tx.insert(babiesTable).values(body).returning();

      await tx.insert(babyToCaregiversTable).values({
        babyId: baby.id,
        caregiverId: Number(userId),
        role: 'primary',
      });

      return baby;
    });

    return c.json<ApiResponse<Baby>>({
      data: result,
      error: null,
    });
  } catch (error) {
    return c.json<ApiResponse<Baby>>(
      {
        data: null,
        error: {
          message: 'Failed to create baby profile',
          code: 'CREATE_ERROR',
        },
      },
      500
    );
  }
});

// Get specific baby
app.get('/:id', async (c) => {
  try {
    const userId = c.get('user').id;
    const id = Number(c.req.param('id'));

    const baby = await nurseryDb.query.babiesTable.findFirst({
      where: eq(babiesTable.id, id),
      with: {
        caregivers: {
          with: {
            caregiver: true,
          },
        },
      },
    });

    if (!baby) {
      return c.json<ApiResponse<Baby>>(
        {
          data: null,
          error: {
            message: 'Baby not found',
            code: 'NOT_FOUND',
          },
        },
        404
      );
    }

    // Verify caregiver has access to this baby
    const hasAccess = baby.caregivers.some((rel) => rel.caregiverId === Number(userId));
    if (!hasAccess) {
      return c.json<ApiResponse<Baby>>(
        {
          data: null,
          error: {
            message: 'Unauthorized access',
            code: 'UNAUTHORIZED',
          },
        },
        403
      );
    }

    return c.json<ApiResponse<BabyWithCaregivers>>({
      data: baby,
      error: null,
    });
  } catch (error) {
    return c.json<ApiResponse<Baby>>(
      {
        data: null,
        error: {
          message: 'Failed to fetch baby',
          code: 'FETCH_ERROR',
        },
      },
      500
    );
  }
});

// Update baby
app.put('/:id', zValidator('json', insertBabySchema.partial()), async (c) => {
  try {
    const userId = c.get('user').id;

    const id = Number(c.req.param('id'));
    const body = await c.req.json();

    // Verify caregiver has access and is primary
    const relationship = await nurseryDb.query.babyToCaregiversTable.findFirst({
      where: and(eq(babyToCaregiversTable.babyId, id), eq(babyToCaregiversTable.caregiverId, Number(userId))),
    });

    if (!relationship || relationship.role !== 'primary') {
      return c.json<ApiResponse<Baby>>(
        {
          data: null,
          error: {
            message: 'Unauthorized access',
            code: 'UNAUTHORIZED',
          },
        },
        403
      );
    }

    const [result] = await nurseryDb.update(babiesTable).set(body).where(eq(babiesTable.id, id)).returning();

    return c.json<ApiResponse<Baby>>({
      data: result,
      error: null,
    });
  } catch (error) {
    return c.json<ApiResponse<Baby>>(
      {
        data: null,
        error: {
          message: 'Failed to update baby',
          code: 'UPDATE_ERROR',
        },
      },
      500
    );
  }
});

// Archive baby
app.delete('/:id', async (c) => {
  try {
    const userId = c.get('user').id;
    const id = Number(c.req.param('id'));

    // Verify caregiver has access and is primary
    const relationship = await nurseryDb.query.babyToCaregiversTable.findFirst({
      where: and(eq(babyToCaregiversTable.babyId, id), eq(babyToCaregiversTable.caregiverId, Number(userId))),
    });

    if (!relationship || relationship.role !== 'primary') {
      return c.json<ApiResponse<void>>(
        {
          data: null,
          error: {
            message: 'Unauthorized access',
            code: 'UNAUTHORIZED',
          },
        },
        403
      );
    }

    await nurseryDb.update(babiesTable).set({ status: 'archived' }).where(eq(babiesTable.id, id));

    return c.json<ApiResponse<void>>({
      data: null,
      error: {
        message: 'Baby archived successfully',
        code: 'ARCHIVE_SUCCESS',
      },
    });
  } catch (error) {
    return c.json<ApiResponse<void>>(
      {
        data: null,
        error: {
          message: 'Failed to archive baby',
          code: 'ARCHIVE_ERROR',
        },
      },
      500
    );
  }
});

export default app;

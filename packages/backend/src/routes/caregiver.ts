import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { babiesTable, babyToCaregiversTable, caregiversTable } from '~/schema/personas-schema';
import { nurseryDb } from '~/service';

const app = new Hono();

// Get all caregivers
app.get('/', async (c) => {
  return c.json({
    caregivers: await nurseryDb.select().from(caregiversTable),
  });
});

// Create new caregiver
app.post('/', async (c) => {
  const body = await c.req.json();
  const result = await nurseryDb.insert(caregiversTable).values(body).returning();
  return c.json({ user: result[0] });
});

// Get specific caregiver
app.get('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await nurseryDb.select().from(caregiversTable).where(eq(caregiversTable.id, id)).limit(1);
  return c.json({ user: result[0] });
});

// Update caregiver
app.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const result = await nurseryDb.update(caregiversTable).set(body).where(eq(caregiversTable.id, id)).returning();
  return c.json({ user: result[0] });
});

// Delete caregiver
app.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  await nurseryDb.delete(caregiversTable).where(eq(caregiversTable.id, id));
  return c.json({ success: true });
});

// Get babies for caregiver
app.get('/:id/babies', async (c) => {
  const id = Number(c.req.param('id'));

  const results = await nurseryDb
    .select({
      baby: babiesTable,
      role: babyToCaregiversTable.role,
    })
    .from(babyToCaregiversTable)
    .where(eq(babyToCaregiversTable.caregiverId, id))
    .innerJoin(babiesTable, eq(babiesTable.id, babyToCaregiversTable.babyId));
  return c.json({ babies: results });
});

export default app;

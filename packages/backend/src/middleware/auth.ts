import type { MiddlewareHandler } from 'hono';
import { auth } from 'src/lib/auth';

export const setSession: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log('Session', session);
  c.set('user', session?.user ?? null);
  c.set('session', session?.session ?? null);
  await next();
};

export const requireAuth: MiddlewareHandler = async (c, next) => {
  const user = c.get('user');

  if (!user) {
    return c.json(
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

  // Add validated userId to context
  c.set('userId', Number(user.id));
  await next();
};

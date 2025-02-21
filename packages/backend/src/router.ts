import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './lib/auth';
import { requireAuth, setSession } from './middleware/auth';
import babies from './routes/baby';
import caregivers from './routes/caregiver';
import events from './routes/events';
import health from './routes/health';
import users from './routes/users';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>().basePath('/api');

app.use(
  '*',
  cors({
    origin: 'http://localhost:3001', // frontend app url
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true, // Important for cookies/sessions
  })
);

app.on(['POST', 'GET'], '/auth/**', (c) => auth.handler(c.req.raw));

// Apply session middleware to all routes
app.use('*', setSession);

app.route('/health', health);
app.route('/auth', users);

// Protected routes with requireAuth middleware
app.use('/auth/*', requireAuth);
app.route('/auth/caregivers', caregivers);
app.route('/auth/babies', babies);
app.route('/auth/events', events);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import caregivers from './src/routes/users'
import events from './events';

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Welcome to the nursery!')
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

app.route('/caregivers', caregivers)
app.route('/events', events)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

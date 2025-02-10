import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { eventsTable, sleepEventsTable, feedingEventsTable, diaperEventsTable } from "~/schema/events"
import { nurseryDb } from "~/service"
import { createEventSchema } from "~/types"

const app = new Hono()

// Get all events
app.get('/', async (c) => {
  const results = await nurseryDb
    .select()
    .from(eventsTable)
  return c.json({ events: results })
})

// Get event by ID
app.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await nurseryDb
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, id))
    .limit(1)
  return c.json({ event: result[0] })
})

// Create new event
app.post('/', zValidator('json', createEventSchema), async (c) => {
  const body = await c.req.json()
  const { type, ...eventData } = body

  const result = await nurseryDb.transaction(async (tx) => {
    const [event] = await tx
      .insert(eventsTable)
      .values(eventData)
      .returning()

    switch (type) {
      case 'sleep':
        await tx.insert(sleepEventsTable).values({
          eventId: event.id,
          ...body.sleep
        })
        break
      case 'feeding':
        await tx.insert(feedingEventsTable).values({
          eventId: event.id,
          ...body.feeding
        })
        break
      case 'diaper':
        await tx.insert(diaperEventsTable).values({
          eventId: event.id,
          ...body.diaper
        })
        break
    }

    return event
  })

  return c.json({ event: result })
})

// Update event
app.put('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const { type, ...eventData } = body

  const result = await nurseryDb.transaction(async (tx) => {
    const [event] = await tx
      .update(eventsTable)
      .set(eventData)
      .where(eq(eventsTable.id, id))
      .returning()

    switch (type) {
      case 'sleep':
        await tx.update(sleepEventsTable)
          .set(body.sleep)
          .where(eq(sleepEventsTable.eventId, id))
        break
      case 'feeding':
        await tx.update(feedingEventsTable)
          .set(body.feeding)
          .where(eq(feedingEventsTable.eventId, id))
        break
      case 'diaper':
        await tx.update(diaperEventsTable)
          .set(body.diaper)
          .where(eq(diaperEventsTable.eventId, id))
        break
    }

    return event
  })

  return c.json({ event: result })
})

// Delete event
app.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await nurseryDb
    .delete(eventsTable)
    .where(eq(eventsTable.id, id))
  return c.json({ success: true })
})

// Get events by baby
app.get('/baby/:babyId', async (c) => {
  const babyId = Number(c.req.param('babyId'))
  const results = await nurseryDb
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.babyId, babyId))
  return c.json({ events: results })
})

export default app

import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { babiesTable } from "~/schema/users";
import { nurseryDb } from "~/service";

const app = new Hono();

// Get all babies
app.get("/", async (c) => {
  return c.json({
    babies: await nurseryDb.select().from(babiesTable)
  });
});

// Create new baby
app.post("/", async (c) => {
  const body = await c.req.json();
  const result = await nurseryDb
    .insert(babiesTable)
    .values(body)
    .returning();
  return c.json({ baby: result[0] });
});

// Get specific baby
app.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await nurseryDb
    .select()
    .from(babiesTable)
    .where(eq(babiesTable.id, id))
    .limit(1);
  return c.json({ baby: result[0] });
});

// Update baby
app.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const result = await nurseryDb
    .update(babiesTable)
    .set(body)
    .where(eq(babiesTable.id, id))
    .returning();
  return c.json({ baby: result[0] });
});

// Delete baby
app.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await nurseryDb.delete(babiesTable).where(eq(babiesTable.id, id));
  return c.json({ success: true });
});

export default app;

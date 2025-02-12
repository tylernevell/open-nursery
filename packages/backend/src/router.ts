import { serve } from "@hono/node-server";
import { Hono } from "hono";
import caregivers from "./routes/caregiver";
import babies from "./routes/baby";
import events from "./routes/events";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use(
  "/*",
  cors({
    origin: "http://localhost:3001", // Your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowHeaders: ['Content-Type', 'Authorization'],
    // exposeHeaders: ['Content-Length', 'X-Requested-With'],
    // credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Welcome to the nursery!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.route("/caregivers", caregivers);
app.route("/babies", babies);
app.route("/events", events);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;

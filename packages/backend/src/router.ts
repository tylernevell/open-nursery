import { serve } from "@hono/node-server";
import { Hono } from "hono";
import caregivers from "./routes/caregiver";
import babies from "./routes/baby";
import events from "./routes/events";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import users from "./routes/users";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}>().basePath("/api");

app.use("*",
  cors({
    origin: "http://localhost:3001", // frontend app url
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true, // Important for cookies/sessions
  })
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  console.log({
    where: "app.use '*'",
    session
  })

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.get("/", (c) => {
  return c.text("Welcome to the nursery!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.route("/auth", users);

const requireAuth = async (c: any, next: any) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return next();
};

// Apply requireAuth middleware to all /auth/* routes
app.use("/auth/*", requireAuth);

// Protected routes
app.route("/auth/caregivers", caregivers);
app.route("/auth/babies", babies);
app.route("/auth/events", events);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;

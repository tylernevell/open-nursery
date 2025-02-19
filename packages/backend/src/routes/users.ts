import { Hono } from "hono";
import { auth } from "../lib/auth";
import { caregiversTable } from "~/schema/personas-schema";
import { nurseryDb } from "~/service";
import { APIError } from "better-auth/api";

const app = new Hono();

app.post("/sign-up", async (c) => {
  const body = await c.req.json();

  try {
    const { user } = await auth.api.signUpEmail({
      body: {
        name: body.name,
        email: body.email,
        password: body.password,
      }
    });

    console.log({ user })

    await nurseryDb.insert(caregiversTable).values({
      name: body.name,
      email: body.email,
      relationship: 'parent',
      userId: user.id,
    });

    return c.json({
      data: {
        user
      }
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status)
      return c.json({
        error: error.message,
        status: error.status
      })
    }

    return c.json({
      error: "Failed to add caregiver entry"
    }, 500);
  }
});

app.post("/login", async (c) => {
  const body = await c.req.json();

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: body.email,
        password: body.password
      },
      asResponse: true,
      fetchOptions: {
        redirect: "/daily-log"
      }
    });

    console.log("Login response", response);

    return response;
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status)
      return c.json({
        error: error.message,
        status: error.status
      })
    }

    return c.json({
      error: "Invalid credentials"
    }, 401);
  }
});

app.post("/logout", async (c) => {
  try {
    const response = await auth.api.signOut({
      headers: c.req.raw.headers,
      asResponse: true,
    });

    return response;
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status)
      return c.json({
        error: error.message,
        status: error.status
      })
    }

    return c.json({
      error: "Failed to logout"
    }, 500);
  }
});

app.get("/session", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
    asResponse: true,
  });

  console.log("/GET Session", session);

  return session;
});

export default app;

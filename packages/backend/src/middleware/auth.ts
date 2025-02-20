import { type MiddlewareHandler } from "hono";
import { auth } from "src/lib/auth";
import { type ApiResponse } from "~/schema/personas-schema";

export const setSession: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set("user", session?.user ?? null);
  c.set("session", session?.session ?? null);
  await next();
};

export const requireAuth: MiddlewareHandler = async (c, next) => {
  const user = c.get("user");

  if (!user) {
    return c.json<ApiResponse<any>>({
      data: null,
      error: {
        message: "Unauthorized access",
        code: "UNAUTHORIZED"
      }
    }, 403);
  }

  // Add validated userId to context
  c.set('userId', Number(user.id));
  await next();
};

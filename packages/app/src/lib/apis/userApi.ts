import type { NewUser, SignInUser } from "../types";
import { fetchApi } from "./helpers";

type CreateUserResponse = {
  user: NewUser;
}

type SignInUserResponse = {
  user: SignInUser;
}

type SessionModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
}

const baseUrl = '/auth'

export const userApi = {
  signUp: (user: NewUser) => {
    console.log("Signing up", user);
    return fetchApi<CreateUserResponse>(`${baseUrl}/sign-up`, {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  signIn: async (user: SignInUser) => {
    const result = await fetchApi<SignInUserResponse>(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
    });

    console.log("Sign in result", result);

    return result;
  },

  signOut: () => {
    return fetchApi<void>(`${baseUrl}/logout`, {
      method: 'POST',
    });
  },

  getSession: () => {
    return fetchApi<SessionModel>(`${baseUrl}/session`, {
      method: 'GET',
    });
  }
}

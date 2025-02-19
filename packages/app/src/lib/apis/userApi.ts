import type { NewUser, SignInUser } from "../types";
import { fetchApi } from "./helpers";

type CreateUserResponse = {
  user: NewUser;
}

type SignInUserResponse = {
  user: SignInUser;
}

const baseUrl = '/auth'

export const userApi = {
  signUp: (user: NewUser) => {
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
    return fetchApi(`${baseUrl}/logout`, {
      method: 'POST',
    });
  },

  getSession: () => {
    return fetchApi(`${baseUrl}/session`, {
      method: 'GET',
    });
  }
}

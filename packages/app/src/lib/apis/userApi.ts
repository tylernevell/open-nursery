import type { NewUser, SignInUser } from '../types';
import { fetchApi } from './helpers';

type CreateUserResponse = {
  user: NewUser;
};

type SignInUserResponse = {
  user: SignInUser;
};

type SessionModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
};

type SessionResponse = {
  session: SessionModel;
  user: SignInUser;
};

const baseUrl = '/auth';

export const userApi = {
  signUp: (user: NewUser) => {
    console.log('Signing up', user);
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

    return result;
  },

  signOut: () => {
    return fetchApi<void>(`${baseUrl}/logout`, {
      method: 'POST',
    });
  },

  getSession: () => {
    return fetchApi<SessionResponse>(`${baseUrl}/session`, {
      method: 'GET',
    });
  },
};

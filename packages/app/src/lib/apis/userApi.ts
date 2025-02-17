import { ApiResponse, NewUser } from "../types";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const API_URL = 'http://localhost:3000/api';

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    const data = await response.json();
    return response.ok ? { data, error: null } : { data: null, error: data };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

type CreateUserResponse = {
  user: NewUser;
}

export const userApi = {
  createUser: (user: NewUser) => {
    return fetchApi<CreateUserResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
    });
  },
}

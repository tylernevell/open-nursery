import { ApiResponse, BabyModel, Caregiver, NewCaregiver } from "../types";

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

/**
 * Response types
 */
interface CaregiversResponse {
  caregivers: Caregiver[];
}

interface CaregiverResponse {
  user: Caregiver;
}

interface BabiesResponse {
  babies: BabyModel[];
}

export const caregiverApi = {
  getCaregivers: () => {
    return fetchApi<CaregiversResponse>('/caregivers');
  },

  getCaregiver: (id: number) => {
    return fetchApi<CaregiverResponse>(`/caregivers/${id}`);
  },

  createCaregiver: (caregiver: NewCaregiver) => {
    return fetchApi<CaregiverResponse>('/caregivers', {
      method: 'POST',
      body: JSON.stringify(caregiver),
    });
  },

  updateCaregiver: (id: number, updates: Partial<NewCaregiver>) => {
    return fetchApi<CaregiverResponse>(`/caregivers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deleteCaregiver: (id: number) => {
    return fetchApi<{ success: true }>(`/caregivers/${id}`, {
      method: 'DELETE',
    });
  },

  getCaregiverBabies: (id: number) => {
    return fetchApi<BabiesResponse>(`/caregivers/${id}/babies`);
  },
};

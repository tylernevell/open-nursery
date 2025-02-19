import { BabyModel, Caregiver, NewCaregiver } from "../types";
import { fetchApi } from "./helpers";

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

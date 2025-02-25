import type { ApiResponse, Baby } from '../types';
import { fetchApi } from './helpers';

const baseUrl = '/auth/babies';

type CreateBabyFetchResponse = ApiResponse<Baby>;
type GetBabiesFetchResponse = ApiResponse<Baby[]>;

interface BabyApi {
  createBaby: (baby: Partial<Baby>) => Promise<Baby>;
  getBabies: () => Promise<Baby[]>;
}

export const babyApi: BabyApi = {
  createBaby: async (baby: Partial<Baby>) => {
    const response = await fetchApi<CreateBabyFetchResponse>(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(baby),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    if (!response.data?.data) {
      throw new Error('No data returned from API');
    }

    const { data: newBaby } = response.data;
    return newBaby;
  },

  getBabies: async () => {
    const response = await fetchApi<GetBabiesFetchResponse>(`${baseUrl}`);

    if (response.error) {
      throw new Error(response.error.message);
    }

    if (!response.data?.data) {
      return [];
    }

    const { data: babies } = response.data;
    return babies;
  },
};

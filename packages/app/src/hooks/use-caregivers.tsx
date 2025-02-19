import { useQuery, useMutation } from "@tanstack/react-query";
import { caregiverApi } from "@/lib/apis/caregiverApi";
import type { NewCaregiver } from "@/lib/types";

export function useCaregiversList() {
  return useQuery({
    queryKey: ["caregivers"],
    queryFn: async () => {
      const result = await caregiverApi.getCaregivers();
      if (result.error) throw new Error(result.error.message);
      return result.data.caregivers;
    },
  });
}

export function useCaregiverDetails(id: number) {
  return useQuery({
    queryKey: ["caregiver", id],
    queryFn: async () => {
      const result = await caregiverApi.getCaregiver(id);
      if (result.error) throw new Error(result.error.message);
      return result.data.user;
    },
  });
}

export function useCreateCaregiver() {
  return useMutation({
    mutationFn: async (newCaregiver: NewCaregiver) => {
      const result = await caregiverApi.createCaregiver(newCaregiver);
      if (result.error) throw new Error(result.error.message);
      return result.data.user;
    },
  });
}

export type ApiResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: {
        message: string;
        code?: string;
      };
    };

export const CaregiverRelationship = {
  MOTHER: 'mother',
  FATHER: 'father',
  GRANDPARENT: 'grandparent',
  NANNY: 'nanny',
  OTHER: 'other',
} as const;

export type CaregiverRelationship = (typeof CaregiverRelationship)[keyof typeof CaregiverRelationship];

export interface Caregiver {
  id: number;
  fullName: string;
  email: string;
  relationship: CaregiverRelationship;
  createdAt: string;
  updatedAt: string;
}

export type NewCaregiver = Pick<Caregiver, 'fullName' | 'email' | 'relationship'>;

export interface BabyModel {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  birthWeight: number;
  birthLength: number;
  currentWeight: number;
  currentLength: number;
  notes: string;
}

export interface Baby {
  id: number;
  name: string;
  dateOfBirth: Date | string;
  birthWeight?: number; // in grams
  birthLength?: number; // in millimeters
  gender?: 'male' | 'female' | 'other';
  notes?: string;
  currentWeight?: number; // in grams
  currentLength?: number; // in millimeters
  status: 'active' | 'archived';
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface BabyWithCaregivers extends Baby {
  caregivers: Array<{
    caregiver: {
      id: number;
      name: string;
      email: string;
      relationship: 'parent';
    };
    role: 'primary' | 'secondary' | 'support';
  }>;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface SignInUser {
  email: string;
  password: string;
  rememberMe?: boolean;
}

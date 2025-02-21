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
}

export type Baby = Omit<BabyModel, 'id'>;

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

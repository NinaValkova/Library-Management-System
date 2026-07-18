export interface SafeUser {
  id: number;
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  role: string;
  birthNumber?: string | null;
  createdAt: Date;
}

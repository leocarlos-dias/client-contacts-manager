export interface OutputGetClientUseCaseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
  contacts: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registeredAt: Date;
    clientId: string;
  }[];
}
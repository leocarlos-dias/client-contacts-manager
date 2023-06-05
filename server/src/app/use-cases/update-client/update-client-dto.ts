export interface InputUpdateClientDTO {
  id: string;
  newClient: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}

export interface OutputUpdateClientDTO {
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
  }[];
}
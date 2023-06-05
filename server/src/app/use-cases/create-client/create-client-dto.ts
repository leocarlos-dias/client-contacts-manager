export interface InputCreateClientDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OutputCreateClientDTO {
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
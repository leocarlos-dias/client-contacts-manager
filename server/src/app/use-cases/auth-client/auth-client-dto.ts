export interface InputAuthClientDTO {
  email: string;
  phone: string;
}

export interface OutputAuthClientDTO {
  access_token: string;
  client: {
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
}
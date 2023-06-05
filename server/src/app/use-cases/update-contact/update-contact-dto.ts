export interface InputUpdateContactUseCaseDTO {
  id: string;
  contactId: string;
  newContact: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}

export interface OutputUpdateContactUseCaseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registeredAt: Date;
}
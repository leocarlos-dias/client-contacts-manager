
export class InputAddContactUseCaseDTO {
  id: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export class OutputAddContactUseCaseDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registeredAt: Date;
}
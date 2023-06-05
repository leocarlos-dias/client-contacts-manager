import { randomUUID } from "node:crypto";
import { BadRequestError } from "../exceptions/bad-request.error";

export type ContactProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clientId: string
}

export class Contact {
  private _id: string;
  private _registeredAt: Date;

  constructor(private props: ContactProps, id?: string, registeredAt?: Date) {
    Object.assign(this, props);
    this._id = id ? id : randomUUID();
    this._registeredAt = registeredAt ? registeredAt : new Date();
  }

  get id(): string {
    return this._id;
  }
  get firstName(): string {
    return this.props.firstName;
  }
  get lastName(): string {
    return this.props.lastName;
  }
  get email(): string {
    return this.props.email;
  }
  get phone(): string {
    return this.props.phone;
  }
  get registeredAt(): Date {
    return this._registeredAt;
  }
  get clientId(): string {
    return this.props.clientId;
  }
  set firstName(firstName: string) {
    if (!firstName) {
      throw new BadRequestError("Invalid first name");
    }
    this.props.firstName = firstName;
  }
  set lastName(lastName: string) {
    if (!lastName) {
      throw new BadRequestError("Invalid last name");
    }
    this.props.lastName = lastName;
  }
  set email(email: string) {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isValid) {
      throw new BadRequestError("Invalid email address");
    }
    this.props.email = email;
  }
  set phone(phone: string) {
    if (phone.length !== 11) {
      throw new BadRequestError("Invalid phone number");
    }
    this.props.phone = phone;
  }
  set clientId(clientId: string) {
    this.props.clientId = clientId;
  }
}

import { randomUUID } from "node:crypto";
import { Contact, ContactProps } from "../contacts/contact.entity";
import { BadRequestError } from "../exceptions/bad-request.error";
import { ConflictError } from "../exceptions/conflict.error";
import { NotFoundError } from "../exceptions/not-found.error";

export type ClientProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class Client {
  private _id: string;
  private _createdAt: Date;
  private _contacts: Contact[];

  constructor(private props: ClientProps, id?: string, contacts?: Contact[], createdAt?: Date) {
    Object.assign(this, props);
    this._id = id ? id : randomUUID();
    this._createdAt = createdAt ? createdAt : new Date();
    this._contacts = contacts ? contacts : [];
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
  get createdAt(): Date {
    return this._createdAt;
  }
  get contacts(): Contact[] {
    return this._contacts;
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
  addContact(contact: Contact): void {
    const contactAlreadyAdded = this.contacts.find(c => c.id === contact.id);
    if (contactAlreadyAdded) {
      throw new ConflictError("The contact is already added");
    }
    this._contacts.push(contact);
  }
  removeContact(contact: Contact): void {
    const index = this._contacts.findIndex(c => c.id === contact.id);
    if (index === -1) {
      throw new NotFoundError("Contact not found");
    }
    this._contacts.splice(index, 1);
  }
  updateContact(contact: Contact, newContact: Partial<ContactProps>): Contact {
    const contactIndex = this._contacts.findIndex(c => c.id === contact.id);
    if (contactIndex === -1) {
      throw new NotFoundError("Contact not found");
    }
    Object.assign(this._contacts[contactIndex], newContact);
    return this._contacts[contactIndex];
  }
}
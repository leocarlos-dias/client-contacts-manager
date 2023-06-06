import { randomUUID } from "crypto";
import { Contact } from "../contacts/contact.entity";

export type ClientProps = {
  fullName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  contacts?: Contact[];
}

export class Client {
  private _id: string;
  constructor(private props: ClientProps, id?: string) {
    Object.assign(this, props);
    this._id = id ?? randomUUID();
    this.props.createdAt ??= new Date();
    this.props.contacts ??= [];
  }
  public toObject() {
    return {
      id: this._id,
      ...this.props,
      contacts: this.props.contacts.map(contact => contact.toObject()),
    };
  }
  public update(props: Partial<ClientProps>): Client {
    Object.assign(this.props, props);
    return this;
  }
  public addContact(contact: Contact): Contact {
    this.props.contacts.push(contact);
    return contact;
  }
  public updateContact(contact: Contact): Contact {
    const index = this.props.contacts.findIndex(c => c.id === contact.id);
    if (index > -1) {
      this.props.contacts[index] = contact;
    }
    return this.props.contacts[index];
  }
  public removeContact(contact: Contact): Contact {
    const index = this.props.contacts.findIndex(c => c.id === contact.id);
    if (index > -1) {
      this.props.contacts.splice(index, 1);
    }
    return this.props.contacts[index];
  }
  get fullName(): string {
    return this.props.fullName;
  }
  get email(): string {
    return this.props.email;
  }
  get phone(): string {
    return this.props.phone;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get contacts(): Contact[] {
    return this.props.contacts;
  }
  get id(): string {
    return this._id;
  }
  set fullName(fullName: string) {
    this.props.fullName = fullName;
  }
  set email(email: string) {
    this.props.email = email;
  }
  set phone(phone: string) {
    this.props.phone = phone;
  }
  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
  set contacts(contacts: Contact[]) {
    this.props.contacts = contacts;
  }
}
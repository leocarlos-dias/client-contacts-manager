import { randomUUID } from "crypto";

export type ContactProps = {
  fullName: string;
  email: string;
  phone: string;
  registrationDate: Date;
  clientId: string;
}

export class Contact {
  private _id: string;

  constructor(private props: ContactProps, id?: string) {
    Object.assign(this, props);
    this._id = id ?? randomUUID();
  }

  public toObject() {
    return {
      id: this._id,
      ...this.props,
    };
  }
  get clientId(): string {
    return this.props.clientId;
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
  get registrationDate(): Date {
    return this.props.registrationDate;
  }
  get id(): string {
    return this._id;
  }
  set clientId(clientId: string) {
    this.props.clientId = clientId;
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
  set registrationDate(registrationDate: Date) {
    this.props.registrationDate = registrationDate;
  }
}

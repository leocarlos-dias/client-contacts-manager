import { Contact as ContactModel } from "@prisma/client";
import { Contact, ContactProps } from "../../domain/contacts/contact.entity";

export class ContactMapper {
  static toDomain(contact: ContactModel): Contact {
    const { id, fullName, email, phone, registrationDate, clientId } = contact;
    const contactProps: ContactProps = {
      fullName,
      email,
      phone,
      registrationDate,
      clientId,
    };

    return new Contact(contactProps, id);
  }

  static toPersistence(contact: Contact): ContactModel {
    const { id, fullName, email, phone, registrationDate, clientId } = contact.toObject();

    const contactPersistence: ContactModel = {
      id,
      fullName,
      email,
      phone,
      registrationDate,
      clientId
    };
    return contactPersistence;
  }
}
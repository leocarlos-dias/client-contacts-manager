import { Injectable } from "@nestjs/common";
import { Client } from "../../../domain/clients/client.entity";
import { Contact } from "../../../domain/contacts/contact.entity";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { InputUpdateContactUseCaseDTO, OutputUpdateContactUseCaseDTO } from "./update-contact-dto";

@Injectable()
export class UpdateContactUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute({ id, contactId, newContact }: InputUpdateContactUseCaseDTO): Promise<OutputUpdateContactUseCaseDTO> {
    try {
      const clientExists = await this.clientRepository.findById(id);
      if (!clientExists) {
        throw new Error("Client not found");

      }
      const contactExists = clientExists.contacts.find(contact => contact.id === contactId);
      if (!contactExists) {
        throw new Error("Contact not found");
      }
      const { id: clientId, contacts, createdAt, ...clientProps } = clientExists;
      const clientInstance = new Client(clientProps, clientId, contacts.map(({ id, registeredAt, ...props }) => new Contact(props, id, registeredAt)), createdAt);
      const { id: _, registeredAt, ...props } = contactExists;
      const contactInstance = new Contact(props, contactId, registeredAt);
      const contactUpdated = clientInstance.updateContact(contactInstance, newContact);
      const contact = await this.clientRepository.updateContact(contactId, contactUpdated);
      return {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        registeredAt: contact.registeredAt
      };
    } catch (error) {
      throw new Error("Error updating contact");
    }
  }
}
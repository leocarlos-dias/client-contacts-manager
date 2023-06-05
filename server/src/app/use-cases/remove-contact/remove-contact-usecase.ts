import { Injectable } from "@nestjs/common";
import { Client } from "../../../domain/clients/client.entity";
import { Contact } from "../../../domain/contacts/contact.entity";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { InputRemoveContactUseCaseDTO } from "./remove-contact-dto";

@Injectable()
export class RemoveContactUseCase {
  constructor(private clientRepository: ClientRepository) { }
  async execute({ id, contactId }: InputRemoveContactUseCaseDTO): Promise<void> {
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
      clientInstance.removeContact(contactInstance);
      await this.clientRepository.removeContact(contactInstance.id);
    }
    catch (error) {
      throw new Error("Error removing contact");
    }
  }
}
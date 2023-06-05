import { Injectable } from "@nestjs/common";
import { Client } from "../../../domain/clients/client.entity";
import { Contact } from "../../../domain/contacts/contact.entity";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { InputAddContactUseCaseDTO, OutputAddContactUseCaseDTO } from "./add-contact-dto";

@Injectable()
export class AddContactUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute({ id, contact }: InputAddContactUseCaseDTO): Promise<OutputAddContactUseCaseDTO> {
    const clientExists = await this.clientRepository.findById(id);
    if (!clientExists) {
      throw new Error("Client not found");
    }
    const { id: _id, contacts, createdAt, ...props } = clientExists;
    try {
      const clientInstance = new Client(props, _id, contacts.map(({ id, registeredAt, ...props }) => new Contact(props, id, registeredAt)), createdAt);
      const contactInstance = new Contact(Object.assign(contact, { clientId: id }));
      clientInstance.addContact(contactInstance);
      const contactAdded = await this.clientRepository.addContact(clientInstance.id, contactInstance);
      return {
        id: contactAdded.id,
        firstName: contactAdded.firstName,
        lastName: contactAdded.lastName,
        email: contactAdded.email,
        phone: contactAdded.phone,
        registeredAt: contactAdded.registeredAt,
      };
    } catch (error) {
      throw new Error("Error adding contact");
    }
  }
}
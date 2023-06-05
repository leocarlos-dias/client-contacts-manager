import { Injectable } from "@nestjs/common";
import { Client } from "../../../domain/clients/client.entity";
import { Contact } from "../../../domain/contacts/contact.entity";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { InputUpdateClientDTO, OutputUpdateClientDTO } from "./update-client-dto";

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute({ id, newClient }: InputUpdateClientDTO): Promise<OutputUpdateClientDTO> {
    try {
      const clientExists = await this.clientRepository.findById(id);
      if (!clientExists) {
        throw new Error("Client not found");
      }
      const { id: _id, contacts, createdAt, ...props } = clientExists;
      const clientInstance = new Client(props, _id, contacts.map(({ id, registeredAt, ...props }) => new Contact(props, id, registeredAt)), createdAt);
      const client = await this.clientRepository.save(clientInstance, newClient);
      return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        createdAt: client.createdAt,
        contacts: client.contacts ? client.contacts.map(contact => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          registeredAt: contact.registeredAt
        })) : []
      };
    } catch (error) {
      throw new Error("Error updating client");
    }
  }
}
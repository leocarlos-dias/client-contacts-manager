import { Injectable } from "@nestjs/common";
import { Client } from "../../../domain/clients/client.entity";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { InputCreateClientDTO, OutputCreateClientDTO } from "./create-client-dto";

@Injectable()
export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute(data: InputCreateClientDTO): Promise<OutputCreateClientDTO> {
    const clientInstance = new Client(data);
    try {
      await this.clientRepository.create(clientInstance);
      return {
        id: clientInstance.id,
        firstName: clientInstance.firstName,
        lastName: clientInstance.lastName,
        email: clientInstance.email,
        phone: clientInstance.phone,
        createdAt: clientInstance.createdAt,
        contacts: clientInstance.contacts.map(contact => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          registeredAt: contact.registeredAt
        }))
      };
    } catch (error) {
      throw new Error("Error creating client");
    }
  }
}
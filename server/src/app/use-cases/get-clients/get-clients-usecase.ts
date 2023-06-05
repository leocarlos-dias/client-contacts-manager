import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { OutputGetClientUseCaseDTO } from "../get-client/get-client-dto";

@Injectable()
export class GetClientsUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute(): Promise<OutputGetClientUseCaseDTO[]> {
    try {
      const clients = await this.clientRepository.find();
      return clients.map(client => ({
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
      }));
    } catch (error) {
      throw new Error("Error getting clients");
    }
  }
}
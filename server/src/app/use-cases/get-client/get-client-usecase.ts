import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { OutputGetClientUseCaseDTO } from "./get-client-dto";

@Injectable()
export class GetClientUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute(id: string): Promise<OutputGetClientUseCaseDTO> {
    try {
      const clientExists = await this.clientRepository.findById(id);
      if (!clientExists) {
        throw new Error("Client not found");
      }
      return {
        id: clientExists.id,
        firstName: clientExists.firstName,
        lastName: clientExists.lastName,
        email: clientExists.email,
        phone: clientExists.phone,
        createdAt: clientExists.createdAt,
        contacts: clientExists.contacts ? clientExists.contacts.map(contact => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          registeredAt: contact.registeredAt,
          clientId: contact.clientId
        })) : []
      };
    } catch (error) {
      throw new Error("Error getting client");
    }
  }
}
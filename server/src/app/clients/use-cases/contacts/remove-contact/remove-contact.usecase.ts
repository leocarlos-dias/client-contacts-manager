import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../../../../../domain/clients/client.repository";

@Injectable()
export class RemoveContactFromClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(clientId: string, contactId: string): Promise<void> {
    const clientExisting = await this.clientRepository.getById(clientId);
    if (!clientExisting) {
      throw new NotFoundException("Client not found");
    }
    const contact = clientExisting.contacts.find(c => c.id === contactId);
    if (!contact) {
      throw new NotFoundException("Contact not found");
    }
    clientExisting.removeContact(contact);

    try {
      await this.clientRepository.removeContact(clientExisting.id, contact.id);
    } catch (error) {
      throw new InternalServerErrorException("Error on remove contact");
    }
  }
}

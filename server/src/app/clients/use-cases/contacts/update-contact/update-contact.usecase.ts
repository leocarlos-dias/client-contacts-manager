import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../../../../../domain/clients/client.repository";
import { Contact } from "../../../../../domain/contacts/contact.entity";
import { InputUpdateContactDTO, OutputUpdateContactDTO } from "./update-client.dto";

@Injectable()
export class UpdateContactInClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(clientId: string, contactId: string, updatedContact: InputUpdateContactDTO): Promise<OutputUpdateContactDTO> {
    const clientExisting = await this.clientRepository.getById(clientId);
    if (!clientExisting) {
      throw new NotFoundException("Client not found");
    }
    const contactExisting = clientExisting.contacts.find(c => c.id === contactId);
    if (!contactExisting) {
      throw new NotFoundException("Contact not found");
    }
    const contact = new Contact({ ...Object.assign({ ...contactExisting, ...updatedContact }), registrationDate: new Date(), clientId }, contactExisting.id);
    clientExisting.updateContact(contact);
    try {
      await this.clientRepository.update(clientExisting);
      return contact.toObject();
    } catch (error) {
      throw new InternalServerErrorException("Error on update contact");
    }
  }
}

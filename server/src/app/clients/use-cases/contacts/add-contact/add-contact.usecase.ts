import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../../../../../domain/clients/client.repository";
import { Contact } from "../../../../../domain/contacts/contact.entity";
import { InputAddContactDTO, OutputAddContactDTO } from "./add-contact.dto";

@Injectable()
export class AddContactToClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(clientId: string, contact: InputAddContactDTO): Promise<OutputAddContactDTO> {
    const clientExisting = await this.clientRepository.getById(clientId);
    if (!clientExisting) {
      throw new NotFoundException("Client not found");
    }

    const newContact = new Contact({ ...contact, registrationDate: new Date(), clientId });
    clientExisting.addContact(newContact);
    try {
      await this.clientRepository.update(clientExisting);
      return newContact.toObject();
    } catch (error) {
      throw new InternalServerErrorException("Error on save contact");
    }
  }
}

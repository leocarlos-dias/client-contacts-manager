import { Injectable } from "@nestjs/common";
import { ClientRepository } from "src/domain/repositories/client.repository";
import { OutputAddContactUseCaseDTO } from "../../../app/use-cases/add-contact/add-contact-dto";
import { OutputUpdateContactUseCaseDTO } from "../../../app/use-cases/update-contact/update-contact-dto";
import { Client, ClientProps } from "../../../domain/clients/client.entity";
import { Contact } from "../../../domain/contacts/contact.entity";

@Injectable()
export class ClientInMemoryRepository implements ClientRepository {
  private clients: Client[] = [];

  async addContact(id: string, contact: Contact): Promise<OutputAddContactUseCaseDTO> {
    const client = this.clients.find(c => c.id === id);
    client.contacts.push(contact);
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      registeredAt: contact.registeredAt
    };
  }

  async updateContact(id: string, newContact: Contact): Promise<OutputUpdateContactUseCaseDTO> {
    const client = this.clients.find(c => c.id === id);
    const contact = client.contacts.find(c => c.id === newContact.id);
    Object.assign(contact, newContact);
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      registeredAt: contact.registeredAt,
    };
  }

  async removeContact(id: string): Promise<void> {
    // this.contacts = this.contacts.filter(c => c.id !== id);
  }

  async create(data: Client): Promise<void> {
    this.clients.push(data);
  }

  async save(data: Client, newClient: Partial<ClientProps>): Promise<Client> {
    const client = this.clients.find(c => c.id === data.id);
    Object.assign(client, newClient);
    return client;
  }

  async find(): Promise<Client[]> {
    return this.clients;
  }

  async findById(id: string): Promise<Client> {
    return this.clients.find(c => c.id === id);
  }

  async findByEmail(email: string): Promise<Client> {
    return this.clients.find(c => c.email === email);
  }

  async remove(id: string): Promise<void> {
    this.clients = this.clients.filter(c => c.id !== id);
  }
  
}
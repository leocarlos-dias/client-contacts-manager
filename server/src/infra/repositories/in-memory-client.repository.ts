import { Injectable } from "@nestjs/common";
import { Client } from "../../domain/clients/client.entity";
import { ClientRepository } from "../../domain/clients/client.repository";

@Injectable()
export class InMemoryClientRepository implements ClientRepository {
  private clients: Client[] = [];

  async getById(id: string): Promise<Client | null> {
    const client = this.clients.find((c) => c.id === id);
    return client ?? null;
  }

  async getByEmail(email: string): Promise<Client | null> {
    const client = this.clients.find((c) => c.email === email);
    return client ?? null;
  }

  async getAll(): Promise<Client[]> {
    return this.clients;
  }

  async create(client: Client): Promise<Client> {
    this.clients.push(client);
    return client ?? null;
  }

  async update(client: Client): Promise<Client> {
    const index = this.clients.findIndex(c => c.id === client.id);
    if (index === -1) {
      throw new Error("Client not found");
    }
    this.clients[index] = client;
    return client ?? null;
  }

  async delete(id: string): Promise<void> {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Client not found");
    }
    this.clients.splice(index, 1);
  }

  async removeContact(id: string): Promise<void> {
    this.clients.forEach((client) => {
      const index = client.contacts.findIndex((c) => c.id === id);
      if (index !== -1) {
        client.contacts.splice(index, 1);
      }
    });
  }

  async findUnique(email: string, phone: string): Promise<boolean> {
    const client = this.clients.find((c) => c.email === email || c.phone === phone);
    return client ? false : true;
  }
}

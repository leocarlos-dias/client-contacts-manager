import { Injectable } from "@nestjs/common";
import { Client } from "../../domain/clients/client.entity";
import { ClientRepository } from "../../domain/clients/client.repository";
import { PrismaService } from "../database/prisma/prisma.service";
import { ClientMapper } from "../mappers/client.mapper";

@Injectable()
export class PrismaClientRepository implements ClientRepository {

  constructor(private prisma: PrismaService) { }

  async getById(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { id }, include: { contacts: true } });
    const { contacts, ...clientProps } = client;
    return client ? ClientMapper.toDomain(clientProps, contacts) : null;
  }

  async getByEmail(email: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { email }, include: { contacts: true } });
    const { contacts, ...clientProps } = client;
    return client ? ClientMapper.toDomain(clientProps, contacts) : null;
  }

  async getAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({ include: { contacts: true } });
    return clients.map(client => {
      const { contacts, ...clientProps } = client;
      return ClientMapper.toDomain(clientProps, contacts);
    });
  }

  async findUnique(email: string, phone: string): Promise<boolean> {
    const client = await this.prisma.client.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      },
    });
    return client ? false : true;
  }

  async create(client: Client): Promise<Client> {
    const createdClient = await this.prisma.client.create({ data: ClientMapper.toPersistence(client), include: { contacts: true } });
    const { contacts, ...clientProps } = createdClient;
    return createdClient ? ClientMapper.toDomain(clientProps, contacts) : null;
  }

  async update(client: Client): Promise<Client> {
    const updatedClient = await this.prisma.client.update({
      where: { id: client.id },
      data: {
        ...ClientMapper.toPersistence(client),
        contacts: {
          upsert: client.contacts.map((contact) => ({
            where: { id: contact.id },
            update: {
              fullName: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              registrationDate: contact.registrationDate
            },
            create: {
              id: contact.id,
              fullName: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              registrationDate: contact.registrationDate
            },
          })),
        },
      },
      include: { contacts: true },
    });

    const { contacts, ...clientProps } = updatedClient;
    return updatedClient ? ClientMapper.toDomain(clientProps, contacts) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }

  async removeContact(id: string, contactId: string): Promise<void> {
    await this.prisma.contact.deleteMany({
      where: {
        id: contactId,
        clientId: id,
      },
    });
  }
}

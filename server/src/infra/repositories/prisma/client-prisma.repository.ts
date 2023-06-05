import { Injectable } from "@nestjs/common";
import { OutputUpdateContactUseCaseDTO } from "src/app/use-cases/update-contact/update-contact-dto";
import { OutputAddContactUseCaseDTO } from "../../../app/use-cases/add-contact/add-contact-dto";
import { OutputGetClientUseCaseDTO } from "../../../app/use-cases/get-client/get-client-dto";
import { Client, ClientProps } from "../../../domain/clients/client.entity";
import { Contact } from "../../../domain/contacts/contact.entity";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { prisma } from "../../../main";

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
  async create(data: Client): Promise<void> {
    await prisma.client.create({
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        createdAt: data.createdAt,
      }
    });
  }
  async save(data: Client, newClient: Partial<ClientProps>): Promise<any> {
    return await prisma.client.update({
      where: {
        id: data.id
      },
      data: {
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        email: newClient.email,
        phone: newClient.phone,
      }
    });
  }
  async find(): Promise<OutputGetClientUseCaseDTO[]> {

    const client = await prisma.client.findMany({
      include: {
        contactsAssociated: true
      }
    });
    return client.map(client => ({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      contacts: client.contactsAssociated
    }));
  }
  async findById(id: string): Promise<OutputGetClientUseCaseDTO> {
    const client = await prisma.client.findUnique({
      where: {
        id: id
      },
      include: {
        contactsAssociated: true,
      }
    });
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      contacts: client.contactsAssociated
    };
  }
  async findByEmail(email: string): Promise<OutputGetClientUseCaseDTO> {
    const client = await prisma.client.findUnique({
      where: {
        email: email
      },
      include: {
        contactsAssociated: true,
      }
    });
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      contacts: client.contactsAssociated
    };
  }
  async remove(id: string): Promise<void> {
    await prisma.client.delete({
      where: {
        id
      }
    });
  }
  async addContact(id: string, contact: Contact): Promise<OutputAddContactUseCaseDTO> {
    return await prisma.contact.create({
      data: {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        registeredAt: contact.registeredAt,
        client: {
          connect: {
            id: id
          }
        }
      }
    });
  }
  async removeContact(id: string): Promise<void> {
    await prisma.contact.delete({
      where: {
        id
      }
    });
  }
  async updateContact(id: string, contact: Contact): Promise<OutputUpdateContactUseCaseDTO> {
    return await prisma.contact.update({
      where: {
        id
      },
      data: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
      }
    });
  }
}
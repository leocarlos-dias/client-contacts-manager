import { Client as ClientModel, Contact as ContactModel } from "@prisma/client";
import { Client, ClientProps } from "../../domain/clients/client.entity";
import { ContactMapper } from "./contact.mapper";

export class ClientMapper {
  static toDomain(client: ClientModel, contacts: ContactModel[]): Client {
    const { id, email, phone, fullName, createdAt } = client;
    const clientProps: ClientProps = {
      fullName,
      email,
      phone,
      createdAt,
      contacts: contacts.map((contact) => ContactMapper.toDomain(contact)),
    };

    return new Client(clientProps, id);
  }

  static toPersistence(client: Client): ClientModel {
    const { id, email, phone, fullName, createdAt } = client.toObject();
    const clientPersistence: ClientModel = {
      id,
      fullName,
      email,
      phone,
      createdAt,
    };
    return clientPersistence;
  }
}
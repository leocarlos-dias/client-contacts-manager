import { InputCreateDTO } from "../../app/clients/use-cases/create/create-client.dto";
import { Client } from "./client.entity";

export abstract class ClientRepository {
  abstract create(data: InputCreateDTO): Promise<Client>;
  abstract update(data: Client): Promise<Client | null>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<Client | null>;
  abstract getByEmail(email: string): Promise<Client | null>;
  abstract getAll(): Promise<Client[]>;
  abstract removeContact(id: string, contactId: string): Promise<void>;
  abstract findUnique(email: string, phone: string): Promise<boolean>;
}
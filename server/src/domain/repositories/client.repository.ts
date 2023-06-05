import { OutputAddContactUseCaseDTO } from "../../app/use-cases/add-contact/add-contact-dto";
import { OutputGetClientUseCaseDTO } from "../../app/use-cases/get-client/get-client-dto";
import { OutputUpdateContactUseCaseDTO } from "../../app/use-cases/update-contact/update-contact-dto";
import { Client, ClientProps } from "../clients/client.entity";
import { Contact } from "../contacts/contact.entity";

export abstract class ClientRepository {
  abstract create(data: Client): Promise<void>;
  abstract save(data: Client, newClient: Partial<ClientProps>): Promise<any>;
  abstract find(): Promise<any[]>;
  abstract findById(id: string): Promise<OutputGetClientUseCaseDTO>;
  abstract findByEmail(email: string): Promise<OutputGetClientUseCaseDTO>
  abstract remove(id: string): Promise<void>;
  abstract addContact(id: string, contact: Contact): Promise<OutputAddContactUseCaseDTO>;
  abstract updateContact(id: string, contact: Contact): Promise<OutputUpdateContactUseCaseDTO>;
  abstract removeContact(id: string): Promise<void>
}
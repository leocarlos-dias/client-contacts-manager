import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { AddContactUseCase } from "../add-contact/add-contanct-usecase";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { GetClientUseCase } from "../get-client/get-client-usecase";
import { RemoveContactUseCase } from "./remove-contact-usecase";

describe("ClientRemoveContactUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;
  let addContactUseCase: AddContactUseCase;
  let removeContactUseCase: RemoveContactUseCase;
  let getClientUseCase: GetClientUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    addContactUseCase = new AddContactUseCase(clientRepository);
    removeContactUseCase = new RemoveContactUseCase(clientRepository);
    getClientUseCase = new GetClientUseCase(clientRepository);
  });
  it("should be able to remove contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567890"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    const contact = await addContactUseCase.execute({ id: clientCreated.id, contact: contactData });
    expect(contact).toBeDefined();
    expect(contact).toBeInstanceOf(Object);
    expect(contact.id).toBeDefined();
    expect(contact.id).toEqual(expect.any(String));
    expect(contact.firstName).toEqual(contactData.firstName);
    expect(contact.lastName).toEqual(contactData.lastName);
    expect(contact.email).toEqual(contactData.email);
    expect(contact.phone).toEqual(contactData.phone);
    expect(contact.registeredAt).toBeDefined();
    expect(contact.registeredAt).toBeInstanceOf(Date);

    await removeContactUseCase.execute({ id: clientCreated.id, contactId: contact.id });

    const clientWithoutContact = await getClientUseCase.execute(clientCreated.id);
    expect(clientWithoutContact).toBeDefined();
    expect(clientWithoutContact).toBeInstanceOf(Object);
    expect(clientWithoutContact.id).toBeDefined();
    expect(clientWithoutContact.id).toEqual(expect.any(String));
    expect(clientWithoutContact.firstName).toEqual(clientData.firstName);
    expect(clientWithoutContact.lastName).toEqual(clientData.lastName);
    expect(clientWithoutContact.email).toEqual(clientData.email);
    expect(clientWithoutContact.phone).toEqual(clientData.phone);
    expect(clientWithoutContact.createdAt).toBeDefined();
    expect(clientWithoutContact.createdAt).toBeInstanceOf(Date);
    expect(clientWithoutContact.contacts).toBeDefined();
    expect(clientWithoutContact.contacts).toBeInstanceOf(Array);
    expect(clientWithoutContact.contacts).toHaveLength(0);
  });

  it("should not be able to remove contact from a non-existent client", async () => {
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567890"
    };
    await expect(addContactUseCase.execute({ id: "invalid-id", contact: contactData })).rejects.toThrow("Client not found");
  });

  it("should not be able to remove contact from a client with a non-existent contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    await expect(removeContactUseCase.execute({ id: clientCreated.id, contactId: "invalid-id" })).rejects.toThrow("Contact not found");
  });
});
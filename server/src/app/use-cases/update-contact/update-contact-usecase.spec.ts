import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { AddContactUseCase } from "../add-contact/add-contanct-usecase";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { UpdateContactUseCase } from "./update-contact-usecase";

describe("ClientUpdateContactUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;
  let addContactUseCase: AddContactUseCase;
  let updateContactUseCase: UpdateContactUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    addContactUseCase = new AddContactUseCase(clientRepository);
    updateContactUseCase = new UpdateContactUseCase(clientRepository);
  });

  it("should be able to update contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "99999999999"
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "99999999991"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    const contactAdded = await addContactUseCase.execute({ id: clientCreated.id, contact: contactData });
    const newContactData = {
      firstName: "Jack",
      lastName: "Doe",
      email: "jackdoe@example.com",
      phone: "99999999992"
    };
    const clientUpdated = await updateContactUseCase.execute({ id: clientCreated.id, contactId: contactAdded.id, newContact: newContactData });
    expect(clientUpdated).toBeDefined();
    expect(clientUpdated).toBeInstanceOf(Object);
    expect(clientUpdated.id).toBeDefined();
    expect(clientUpdated.id).toEqual(expect.any(String));
    expect(clientUpdated.firstName).toEqual(newContactData.firstName);
    expect(clientUpdated.lastName).toEqual(newContactData.lastName);
    expect(clientUpdated.email).toEqual(newContactData.email);
    expect(clientUpdated.phone).toEqual(newContactData.phone);
    expect(clientUpdated.registeredAt).toBeDefined();
    expect(clientUpdated.registeredAt).toBeInstanceOf(Date);
  });

  it("should not be able to update contact from a non-existent client", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "99999999999"
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "99999999991"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    const contactAdded = await addContactUseCase.execute({ id: clientCreated.id, contact: contactData });
    const newContactData = {
      firstName: "Jack",
      lastName: "Doe",
      email: "jackdoe@example.com",
      phone: "99999999992"
    };
    await expect(updateContactUseCase.execute({ id: "invalid-id", contactId: contactAdded.id, newContact: newContactData })).rejects.toThrowError("Client not found");
  });

  it("should not be able to update contact from a client with a non-existent contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "99999999999"
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "99999999991"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    await addContactUseCase.execute({ id: clientCreated.id, contact: contactData });
    const newContactData = {
      firstName: "Jack",
      lastName: "Doe",
      email: "jackdoe@example.com",
      phone: "99999999992"
    };
    await expect(updateContactUseCase.execute({ id: clientCreated.id, contactId: "invalid-id", newContact: newContactData })).rejects.toThrowError("Contact not found");
  });
});
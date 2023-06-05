import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { AddContactUseCase } from "./add-contanct-usecase";

describe("AddContactUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;
  let clientAddContactUseCase: AddContactUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    clientAddContactUseCase = new AddContactUseCase(clientRepository);
  });

  it("should be able to add contact", async () => {
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
      phone: "98765432109"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    const contact = await clientAddContactUseCase.execute({ id: clientCreated.id, contact: contactData });
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
  });

  it("should not be able to add contact with invalid id", async () => {
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "98765432109"
    };
    await expect(clientAddContactUseCase.execute({ id: "invalid-id", contact: contactData })).rejects.toThrow();
  });
});
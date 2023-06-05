import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { UpdateClientUseCase } from "./update-client-usecase";

describe("UpdateClientUseCase", () => {
  let clientRepository: ClientRepository;
  let updateClientUseCase: UpdateClientUseCase;
  let createClientUseCase: CreateClientUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    updateClientUseCase = new UpdateClientUseCase(clientRepository);
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });


  it("should be able to update", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    expect(clientCreated).toBeDefined();
    expect(clientCreated).toBeInstanceOf(Object);
    expect(clientCreated.id).toBeDefined();
    expect(clientCreated.id).toEqual(expect.any(String));
    expect(clientCreated.firstName).toEqual(clientData.firstName);
    expect(clientCreated.lastName).toEqual(clientData.lastName);
    expect(clientCreated.email).toEqual(clientData.email);
    expect(clientCreated.phone).toEqual(clientData.phone);
    expect(clientCreated.createdAt).toBeDefined();
    expect(clientCreated.createdAt).toBeInstanceOf(Date);
    expect(clientCreated.contacts).toBeDefined();
    expect(clientCreated.contacts.length).toEqual(0);
    const newClientData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "98765432109"
    };
    const newClientUpdated = await updateClientUseCase.execute({ id: clientCreated.id, newClient: newClientData });
    expect(newClientUpdated).toBeDefined();
    expect(newClientUpdated).toBeInstanceOf(Object);
    expect(newClientUpdated.id).toBeDefined();
    expect(newClientUpdated.id).toEqual(clientCreated.id);
    expect(newClientUpdated.firstName).toEqual(newClientData.firstName);
    expect(newClientUpdated.lastName).toEqual(newClientData.lastName);
    expect(newClientUpdated.email).toEqual(newClientData.email);
    expect(newClientUpdated.phone).toEqual(newClientData.phone);
    expect(newClientUpdated.contacts).toBeDefined();
    expect(newClientUpdated.contacts).toHaveLength(0);
  });

  it("should not be able to update with invalid phone", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    expect(clientCreated).toBeDefined();
    expect(clientCreated).toBeInstanceOf(Object);
    expect(clientCreated.id).toBeDefined();
    expect(clientCreated.id).toEqual(expect.any(String));
    expect(clientCreated.firstName).toEqual(clientData.firstName);
    expect(clientCreated.lastName).toEqual(clientData.lastName);
    expect(clientCreated.email).toEqual(clientData.email);
    expect(clientCreated.phone).toEqual(clientData.phone);
    expect(clientCreated.createdAt).toBeDefined();
    expect(clientCreated.createdAt).toBeInstanceOf(Date);
    expect(clientCreated.contacts).toBeDefined();
    expect(clientCreated.contacts.length).toEqual(0);
    const newClientData = {
      phone: "invalid-phone"
    };
    await expect(updateClientUseCase.execute({ id: clientCreated.id, newClient: newClientData })).rejects.toThrowError("Invalid phone");
  });

  it("should not be able to update with invalid email", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientCreated = await createClientUseCase.execute(clientData);
    expect(clientCreated).toBeDefined();
    expect(clientCreated).toBeInstanceOf(Object);
    expect(clientCreated.id).toBeDefined();
    expect(clientCreated.id).toEqual(expect.any(String));
    expect(clientCreated.firstName).toEqual(clientData.firstName);
    expect(clientCreated.lastName).toEqual(clientData.lastName);
    expect(clientCreated.email).toEqual(clientData.email);
    expect(clientCreated.phone).toEqual(clientData.phone);
    expect(clientCreated.createdAt).toBeDefined();
    expect(clientCreated.createdAt).toBeInstanceOf(Date);
    expect(clientCreated.contacts).toBeDefined();
    expect(clientCreated.contacts.length).toEqual(0);
    const newClientData = {
      email: "invalid-email"
    };
    await expect(updateClientUseCase.execute({ id: clientCreated.id, newClient: newClientData })).rejects.toThrowError("Invalid email");
  });

  it("should not be able to update with invalid id", async () => {
    const newClientData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "98765432109"
    };
    await expect(updateClientUseCase.execute({ id: "invalid-id", newClient: newClientData })).rejects.toThrowError("Client not found");

  });
});
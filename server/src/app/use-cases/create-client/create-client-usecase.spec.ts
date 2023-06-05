import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client-usecase";

describe("CreateClientUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });

  it("should be able to create", async () => {
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
  });

  it("should not be able to create with invalid phone", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "invalid-phone"
    };
    await expect(createClientUseCase.execute(clientData)).rejects.toThrow();
  });

  it("should not be able to create with invalid email", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      phone: "01234567891"
    };
    await expect(createClientUseCase.execute(clientData)).rejects.toThrow();
  });

});

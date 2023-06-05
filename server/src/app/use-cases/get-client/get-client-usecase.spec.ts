import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { GetClientUseCase } from "./get-client-usecase";

describe("GetClientUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;
  let getClientUseCase: GetClientUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    getClientUseCase = new GetClientUseCase(clientRepository);
  });
  it("should be able to get", async () => {
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
    expect(clientCreated.contacts).toBeInstanceOf(Array);
    expect(clientCreated.contacts).toHaveLength(0);
    const client = await getClientUseCase.execute(clientCreated.id);
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(Object);
    expect(client.id).toBeDefined();
    expect(client.id).toEqual(expect.any(String));
    expect(client.firstName).toEqual(clientData.firstName);
    expect(client.lastName).toEqual(clientData.lastName);
    expect(client.email).toEqual(clientData.email);
    expect(client.phone).toEqual(clientData.phone);
    expect(client.createdAt).toBeDefined();
    expect(client.createdAt).toBeInstanceOf(Date);
    expect(client.contacts).toBeDefined();
    expect(client.contacts).toBeInstanceOf(Array);
    expect(client.contacts).toHaveLength(0);
  });

  it("should not be able to get with invalid id", async () => {
    await expect(getClientUseCase.execute("invalid-id")).rejects.toThrow("Client not found");
  });
});
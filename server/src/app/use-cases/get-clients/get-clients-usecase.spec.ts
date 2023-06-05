import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { GetClientsUseCase } from "./get-clients-usecase";

describe("GetClientsUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;
  let getClientsUseCase: GetClientsUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    getClientsUseCase = new GetClientsUseCase(clientRepository);
  });
  it("should be able to get all", async () => {
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
    const clients = await getClientsUseCase.execute();
    expect(clients).toBeDefined();
    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(1);
    expect(clients[0]).toBeDefined();
    expect(clients[0]).toBeInstanceOf(Object);
    expect(clients[0].id).toBeDefined();
    expect(clients[0].id).toEqual(clientCreated.id);
    expect(clients[0].firstName).toEqual(clientData.firstName);
    expect(clients[0].lastName).toEqual(clientData.lastName);
    expect(clients[0].email).toEqual(clientData.email);
    expect(clients[0].phone).toEqual(clientData.phone);
    expect(clients[0].createdAt).toBeDefined();
    expect(clients[0].createdAt).toBeInstanceOf(Date);
    expect(clients[0].contacts).toBeDefined();
    expect(clients[0].contacts).toBeInstanceOf(Array);
    expect(clients[0].contacts).toHaveLength(0);
  });
});
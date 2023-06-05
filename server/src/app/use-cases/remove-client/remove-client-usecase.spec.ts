import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { GetClientUseCase } from "../get-client/get-client-usecase";
import { RemoveClientUseCase } from "./remove-client-usecase";

describe("RemoveClientUseCase", () => {
  let clientRepository: ClientRepository;
  let createClientUseCase: CreateClientUseCase;
  let removeClientUseCase: RemoveClientUseCase;
  let getClientUseCase: GetClientUseCase;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    removeClientUseCase = new RemoveClientUseCase(clientRepository);
    getClientUseCase = new GetClientUseCase(clientRepository);
  });

  it("should be able to remove", async () => {
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
    await removeClientUseCase.execute(clientCreated.id);
    await expect(getClientUseCase.execute(clientCreated.id)).rejects.toThrow("Client not found");
  });

  it("should not be able to remove with invalid id", async () => {
    await expect(removeClientUseCase.execute("invalid-id")).rejects.toThrow("Client not found");
  });
});
import { Client } from "../../../../domain/clients/client.entity";
import { InMemoryClientRepository } from "../../../../infra/repositories/in-memory-client.repository";
import { DeleteClientUseCase } from "./delete-client.usecase";

describe("DeleteClientUseCase", () => {
  let deleteClientUseCase: DeleteClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    deleteClientUseCase = new DeleteClientUseCase(clientRepository);
  });

  it("should delete an existing client", async () => {
    const clientId = "b2e47622-c181-4291-8779-0322b5c9c596";
    const clientCreated = new Client({
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890"
    }, clientId);
    await clientRepository.create(clientCreated);

    await deleteClientUseCase.execute(clientId);

    const deletedClient = await clientRepository.getById(clientId);
    expect(deletedClient).toBeNull();
  });

  it("should throw an error if the client does not exist", async () => {
    const clientId = "non-existing-client-id";

    await expect(deleteClientUseCase.execute(clientId)).rejects.toThrowError("Client not found");
  });
});

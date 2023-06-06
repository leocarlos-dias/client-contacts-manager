import { Client } from "../../../../domain/clients/client.entity";
import { InMemoryClientRepository } from "../../../../infra/repositories/in-memory-client.repository";
import { InputCreateDTO } from "../create/create-client.dto";
import { UpdateClientUseCase } from "./update-client.usecase";

describe("UpdateClientUseCase", () => {
  let updateClientUseCase: UpdateClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    updateClientUseCase = new UpdateClientUseCase(clientRepository);
  });

  it("should update the client with the specified ID", async () => {
    const clientProps: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };
    const createdClient = await clientRepository.create(new Client(clientProps));

    const updatedData = {
      fullName: "Jane Doe",
      email: "janedoe@example.com",
    };
    const result = await updateClientUseCase.execute(createdClient.id, updatedData);

    expect(result.id).toEqual(createdClient.id);
    expect(result.fullName).toEqual(updatedData.fullName);
    expect(result.email).toEqual(updatedData.email);
    expect(result.phone).toEqual(createdClient.phone);
  });

  it("should throw an error if the client with the specified ID does not exist", async () => {
    const nonExistentId = "non-existent-id";
    const updatedData = {
      fullName: "Jane Doe",
      email: "janedoe@example.com",
    };
    await expect(updateClientUseCase.execute(nonExistentId, updatedData)).rejects.toThrowError(
      "Client not found"
    );
  });
});

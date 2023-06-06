import { Client } from "../../../../domain/clients/client.entity";
import { InMemoryClientRepository } from "../../../../infra/repositories/in-memory-client.repository";
import { InputCreateDTO } from "../create/create-client.dto";
import { GetClientByIdUseCase } from "./get-by-id.usecase";

describe("GetClientByIdUseCase", () => {
  let getClientByIdUseCase: GetClientByIdUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    getClientByIdUseCase = new GetClientByIdUseCase(clientRepository);
  });

  it("should return the client with the specified ID", async () => {
    const clientProps: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };
    const createdClient = await clientRepository.create(new Client(clientProps));

    const result = await getClientByIdUseCase.execute(createdClient.id);

    expect(result.id).toEqual(createdClient.id);
    expect(result.fullName).toEqual(createdClient.fullName);
    expect(result.email).toEqual(createdClient.email);
    expect(result.phone).toEqual(createdClient.phone);
  });

  it("should throw an error if the client with the specified ID does not exist", async () => {
    const nonExistentId = "non-existent-id";
    await expect(getClientByIdUseCase.execute(nonExistentId)).rejects.toThrowError(
      "Client not found"
    );
  });
});

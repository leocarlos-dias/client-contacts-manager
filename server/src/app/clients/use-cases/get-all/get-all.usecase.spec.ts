import { Client } from "../../../../domain/clients/client.entity";
import { InMemoryClientRepository } from "../../../../infra/repositories/in-memory-client.repository";
import { InputCreateDTO } from "../create/create-client.dto";
import { GetAllClientUseCase } from "./get-all.usecase";

describe("GetAllClientUseCase", () => {
  let getAllClientUseCase: GetAllClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    getAllClientUseCase = new GetAllClientUseCase(clientRepository);
  });

  it("should return all clients", async () => {
    const clients: InputCreateDTO[] = [
      {
        fullName: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
      },
      {
        fullName: "Jane Smith",
        email: "janesmith@example.com",
        phone: "9876543210",
      },
    ];
    clients.forEach(async (clientProps) => {
      await clientRepository.create(new Client(clientProps));
    });

    const result = await getAllClientUseCase.execute();

    expect(result).toHaveLength(clients.length);
    result.forEach((resultClient, index) => {
      expect(resultClient.fullName).toEqual(clients[index].fullName);
      expect(resultClient.email).toEqual(clients[index].email);
      expect(resultClient.phone).toEqual(clients[index].phone);
    });
  });

  it("should return an empty array if no clients exist", async () => {
    const result = await getAllClientUseCase.execute();

    expect(result).toHaveLength(0);
  });
});

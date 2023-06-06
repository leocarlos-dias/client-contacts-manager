import { InMemoryClientRepository } from "../../../../infra/repositories/in-memory-client.repository";
import { InputCreateDTO, OutputCreateDTO } from "./create-client.dto";
import { CreateClientUseCase } from "./create-client.usecase";

describe("CreateClientUseCase", () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });

  it("should create a new client", async () => {
    const createClientDTO: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };

    const result: OutputCreateDTO = await createClientUseCase.execute(createClientDTO);

    expect(result.fullName).toEqual(createClientDTO.fullName);
    expect(result.email).toEqual(createClientDTO.email);
    expect(result.phone).toEqual(createClientDTO.phone);
    expect(result.id).toBeTruthy();
    expect(result.createdAt).toBeTruthy();
    expect(result.contacts).toEqual([]);
  });

  it("should save the created client in the repository", async () => {
    const createClientDTO: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };

    const result: OutputCreateDTO = await createClientUseCase.execute(createClientDTO);

    const createdClient = await clientRepository.getById(result.id);
    expect(createdClient).toBeDefined();
    expect(createdClient?.toObject()).toEqual(result);
  });
});


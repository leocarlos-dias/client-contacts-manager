import { JwtService } from "@nestjs/jwt";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { ClientInMemoryRepository } from "../../../infra/repositories/in-memory-repository/client-in-memory.repository";
import { CreateClientUseCase } from "../create-client/create-client-usecase";
import { AuthClientUseCase } from "./auth-client-usecase";

describe("AuthClientUseCase", () => {
  let createClientUseCase: CreateClientUseCase;
  let authClientUseCase: AuthClientUseCase;
  let clientRepository: ClientRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    clientRepository = new ClientInMemoryRepository();
    jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    });
    authClientUseCase = new AuthClientUseCase(clientRepository, jwtService);
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });

  it("should create a client and authenticate", async () => {
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
    const clientAuthenticated = await authClientUseCase.execute({ email: clientData.email, phone: clientData.phone });
    expect(clientAuthenticated).toBeDefined();
    expect(clientAuthenticated).toBeInstanceOf(Object);
    expect(clientAuthenticated).toHaveProperty("access_token");
    expect(clientAuthenticated.access_token).toEqual(expect.any(String));
  });
});
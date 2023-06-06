import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Client } from "../../../../domain/clients/client.entity";
import { InMemoryClientRepository } from "../../../../infra/repositories/in-memory-client.repository";
import { InputCreateDTO } from "../create/create-client.dto";
import { InputAuthenticateDTO } from "./authentication-client.dto";
import { AuthenticationClientUseCase } from "./authentication-client.usecase";

describe("AuthenticationClientUseCase", () => {
  let authenticationClientUseCase: AuthenticationClientUseCase;
  let clientRepository: InMemoryClientRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    jwtService = new JwtService({ secret: "secret" });
    authenticationClientUseCase = new AuthenticationClientUseCase(clientRepository, jwtService);
  });

  it("should authenticate the user and return the access token", async () => {
    const clientProps: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };
    const authenticateProps: InputAuthenticateDTO = {
      email: clientProps.email,
      phone: clientProps.phone,
    };

    await clientRepository.create(new Client(clientProps));

    const result = await authenticationClientUseCase.execute(authenticateProps);

    expect(result.access_token).toBeTruthy();
    expect(result.access_token).toEqual(expect.any(String));
  });

  it("should throw UnauthorizedException if the user is not authenticated", async () => {
    const authenticateProps: InputAuthenticateDTO = {
      email: "johndoe@example.com",
      phone: "1234567890",
    };

    await expect(authenticationClientUseCase.execute(authenticateProps)).rejects.toThrowError(UnauthorizedException);
  });

  it("should throw UnauthorizedException if the user's phone is incorrect", async () => {
    const clientProps: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };
    const authenticateProps: InputAuthenticateDTO = {
      email: clientProps.email,
      phone: "0987654321"
    };

    await clientRepository.create(new Client(clientProps));

    await expect(authenticationClientUseCase.execute(authenticateProps)).rejects.toThrowError(UnauthorizedException);
  });
});

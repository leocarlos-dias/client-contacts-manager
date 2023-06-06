import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientRepository } from "../../../../domain/clients/client.repository";
import { InputAuthenticateDTO, OutputAuthenticateDTO } from "./authentication-client.dto";

@Injectable()
export class AuthenticationClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private jwtService: JwtService
  ) { }

  async execute({ email, phone }: InputAuthenticateDTO): Promise<OutputAuthenticateDTO> {
    const client = await this.clientRepository.getByEmail(email);

    if (!client || client?.phone !== phone) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: client.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
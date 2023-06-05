import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { InputAuthClientDTO, OutputAuthClientDTO } from "./auth-client-dto";

@Injectable()
export class AuthClientUseCase {
  constructor(private clientRepository: ClientRepository, private jwtService: JwtService) { }

  async execute(input: InputAuthClientDTO): Promise<OutputAuthClientDTO> {
    try {
      const clientExists = await this.clientRepository.findByEmail(input.email);
      if (!clientExists) {
        throw new Error("Client not found");
      }
      if (clientExists.phone !== input.phone) {
        throw new Error("Unauthorized");
      }
      const payload = { sub: clientExists.id, username: clientExists.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        client: {
          id: clientExists.id,
          firstName: clientExists.firstName,
          lastName: clientExists.lastName,
          email: clientExists.email,
          phone: clientExists.phone,
          createdAt: clientExists.createdAt,
          contacts: clientExists.contacts ? clientExists.contacts.map(contact => ({
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            registeredAt: contact.registeredAt
          })) : []
        }
      };
    }
    catch (error) {
      throw new Error("Error authenticating client");
    }
  }
}


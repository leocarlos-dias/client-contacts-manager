import { ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Client } from "../../../../domain/clients/client.entity";
import { ClientRepository } from "../../../../domain/clients/client.repository";
import { InputCreateDTO, OutputCreateDTO } from "./create-client.dto";

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(createClientDTO: InputCreateDTO): Promise<OutputCreateDTO> {
    const isUnique = await this.clientRepository.findUnique(createClientDTO.email, createClientDTO.phone);
    if (!isUnique) {
      throw new ForbiddenException("Client already exists");
    }

    try {
      const client = new Client(createClientDTO);
      await this.clientRepository.create(client);
      return client.toObject();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error on create client");
    }
  }
}
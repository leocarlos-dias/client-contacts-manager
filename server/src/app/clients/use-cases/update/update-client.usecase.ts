import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../../../../domain/clients/client.repository";
import { InputUpdateDTO, OutputUpdateDTO } from "./update-client.dto";

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(id: string, data: InputUpdateDTO): Promise<OutputUpdateDTO> {
    const clientExisting = await this.clientRepository.getById(id);
    if (!clientExisting) {
      throw new NotFoundException("Client not found");
    }
    clientExisting.update(data);
    try {
      await this.clientRepository.update(clientExisting);
      return clientExisting.toObject();
    } catch (error) {
      throw new InternalServerErrorException("Error on update client");
    }
  }
}

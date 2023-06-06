import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../../../../domain/clients/client.repository";
import { OutputGetDTO } from "./get-by-id.dto";

@Injectable()
export class GetClientByIdUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(id: string): Promise<OutputGetDTO> {
    const clientExisting = await this.clientRepository.getById(id);
    if (!clientExisting) {
      throw new NotFoundException("Client not found");
    }
    return clientExisting.toObject();
  }
}

import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../../../../domain/clients/client.repository";

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(id: string): Promise<void> {
    const clientExisting = await this.clientRepository.getById(id);
    if (!clientExisting) {
      throw new NotFoundException("Client not found");
    }
    try {
      await this.clientRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException("Error on delete client");
    }
  }
}

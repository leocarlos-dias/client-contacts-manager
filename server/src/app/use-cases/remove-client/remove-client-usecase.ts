import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../../../domain/repositories/client.repository";

@Injectable()
export class RemoveClientUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute(id: string): Promise<void> {
    try {
      const clientExists = await this.clientRepository.findById(id);
      if (!clientExists) {
        throw new Error("Client not found");
      }
      await this.clientRepository.remove(clientExists.id);
    } catch (error) {
      throw new Error("Error removing client");
    }
  }
}
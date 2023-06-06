import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ClientRepository } from "../../../../domain/clients/client.repository";
import { OutputGetDTO } from "../get-by-id/get-by-id.dto";

@Injectable()
export class GetAllClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute(): Promise<OutputGetDTO[]> {
    try {
      const client = await this.clientRepository.getAll();
      return client.map(client => client.toObject());
    } catch (error) {
      throw new InternalServerErrorException("Error on get clients");
    }
  }
}

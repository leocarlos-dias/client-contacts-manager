import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { OutputAddContactUseCaseDTO } from "../../app/use-cases/add-contact/add-contact-dto";
import { AddContactUseCase } from "../../app/use-cases/add-contact/add-contanct-usecase";
import { InputAuthClientDTO, OutputAuthClientDTO } from "../../app/use-cases/auth-client/auth-client-dto";
import { AuthClientUseCase } from "../../app/use-cases/auth-client/auth-client-usecase";
import { AuthGuard } from "../../app/use-cases/auth-guard/auth-guard";
import { InputCreateClientDTO, OutputCreateClientDTO } from "../../app/use-cases/create-client/create-client-dto";
import { CreateClientUseCase } from "../../app/use-cases/create-client/create-client-usecase";
import { OutputGetClientUseCaseDTO } from "../../app/use-cases/get-client/get-client-dto";
import { GetClientUseCase } from "../../app/use-cases/get-client/get-client-usecase";
import { GetClientsUseCase } from "../../app/use-cases/get-clients/get-clients-usecase";
import { RemoveClientUseCase } from "../../app/use-cases/remove-client/remove-client-usecase";
import { RemoveContactUseCase } from "../../app/use-cases/remove-contact/remove-contact-usecase";
import { OutputUpdateClientDTO } from "../../app/use-cases/update-client/update-client-dto";
import { UpdateClientUseCase } from "../../app/use-cases/update-client/update-client-usecase";
import { OutputUpdateContactUseCaseDTO } from "../../app/use-cases/update-contact/update-contact-dto";
import { UpdateContactUseCase } from "../../app/use-cases/update-contact/update-contact-usecase";

@Controller("/clients")
export class ClientController {
  constructor(
    private authClientUseCase: AuthClientUseCase,
    private createClientUseCase: CreateClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private getClientUseCase: GetClientUseCase,
    private getClientsUseCase: GetClientsUseCase,
    private removeClientUseCase: RemoveClientUseCase,
    private addContactUseCase: AddContactUseCase,
    private updateContactUseCase: UpdateContactUseCase,
    private removeContactUseCase: RemoveContactUseCase
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post("/auth")
  async authClient(@Body() body: InputAuthClientDTO): Promise<OutputAuthClientDTO> {
    return await this.authClientUseCase.execute(body);
  }

  @Post()
  async createClient(@Body() body: InputCreateClientDTO): Promise<OutputCreateClientDTO> {
    return await this.createClientUseCase.execute(body);
  }

  @UseGuards(AuthGuard)
  @Patch("/:id")
  async updateClient(@Param("id") id: string, @Body() body: any): Promise<OutputUpdateClientDTO> {
    return await this.updateClientUseCase.execute({ id, newClient: body });
  }

  @UseGuards(AuthGuard)
  @Get("/:id")
  async getClient(@Param("id") id: string): Promise<OutputGetClientUseCaseDTO> {
    return await this.getClientUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getClients(): Promise<OutputGetClientUseCaseDTO[]> {
    return await this.getClientsUseCase.execute();
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  async deleteClient(@Param("id") id: string): Promise<void> {
    return await this.removeClientUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @Post("/:id/contacts")
  async createContact(@Param("id") id: string, @Body() body: any): Promise<OutputAddContactUseCaseDTO> {
    return await this.addContactUseCase.execute({ id, contact: body });
  }

  @UseGuards(AuthGuard)
  @Patch("/:id/contacts/:contactId")
  async updateContact(@Param("id") id: string, @Param("contactId") contactId: string, @Body() body: any): Promise<OutputUpdateContactUseCaseDTO> {
    return await this.updateContactUseCase.execute({ id, contactId, newContact: body });
  }

  @UseGuards(AuthGuard)
  @Delete("/:id/contacts/:contactId")
  async deleteContact(@Param("id") id: string, @Param("contactId") contactId: string): Promise<void> {
    return await this.removeContactUseCase.execute({ id, contactId });
  }
}
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InputAuthenticateDTO, OutputAuthenticateDTO } from "../../app/clients/use-cases/auth/authentication-client.dto";
import { AuthenticationClientUseCase } from "../../app/clients/use-cases/auth/authentication-client.usecase";
import { InputAddContactDTO, OutputAddContactDTO } from "../../app/clients/use-cases/contacts/add-contact/add-contact.dto";
import { AddContactToClientUseCase } from "../../app/clients/use-cases/contacts/add-contact/add-contact.usecase";
import { RemoveContactFromClientUseCase } from "../../app/clients/use-cases/contacts/remove-contact/remove-contact.usecase";
import { UpdateContactInClientUseCase } from "../../app/clients/use-cases/contacts/update-contact/update-contact.usecase";
import { InputCreateDTO, OutputCreateDTO } from "../../app/clients/use-cases/create/create-client.dto";
import { CreateClientUseCase } from "../../app/clients/use-cases/create/create-client.usecase";
import { DeleteClientUseCase } from "../../app/clients/use-cases/delete/delete-client.usecase";
import { GetAllClientUseCase } from "../../app/clients/use-cases/get-all/get-all.usecase";
import { OutputGetDTO } from "../../app/clients/use-cases/get-by-id/get-by-id.dto";
import { GetClientByIdUseCase } from "../../app/clients/use-cases/get-by-id/get-by-id.usecase";
import { AuthenticateGuard } from "../../app/clients/use-cases/guard/authenticate-guard.usecase";
import { InputUpdateDTO, OutputUpdateDTO } from "../../app/clients/use-cases/update/update-client.dto";
import { UpdateClientUseCase } from "../../app/clients/use-cases/update/update-client.usecase";

@ApiBearerAuth()
@ApiTags("clients")
@Controller()
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getAllClientUseCase: GetAllClientUseCase,
    private readonly getClientByIdUseCase: GetClientByIdUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
    private readonly addContactToClientUseCase: AddContactToClientUseCase,
    private readonly updateContactInClientUseCase: UpdateContactInClientUseCase,
    private readonly removeContactFromClientUseCase: RemoveContactFromClientUseCase,
    private readonly authenticationClientUseCase: AuthenticationClientUseCase
  ) { }

  @ApiOperation({ summary: "Authenticate a client" })
  @ApiResponse({ description: "Authenticated client", status: HttpStatus.OK, type: OutputAuthenticateDTO })
  @ApiResponse({ description: "Invalid credentials", status: HttpStatus.UNAUTHORIZED })
  @HttpCode(HttpStatus.OK)
  @Post("auth")
  async authenticate(@Body() inputAuthenticateDTO: InputAuthenticateDTO): Promise<OutputAuthenticateDTO> {
    const authenticatedClient = await this.authenticationClientUseCase.execute(inputAuthenticateDTO);
    return authenticatedClient;
  }

  @ApiOperation({ summary: "Create a client" })
  @ApiResponse({ description: "Contact added to client", status: HttpStatus.OK, type: OutputCreateDTO })
  @ApiResponse({ description: "Client already exists", status: HttpStatus.UNAUTHORIZED })
  @Post("clients")
  async createClient(@Body() inputCreateDTO: InputCreateDTO): Promise<OutputCreateDTO> {
    const createdClient = await this.createClientUseCase.execute(inputCreateDTO);
    return createdClient;
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Get all clients" })
  @ApiResponse({ description: "All clients", status: HttpStatus.OK, type: OutputGetDTO, isArray: true })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
   @UseGuards(AuthenticateGuard)
  @Get("clients")
  async getAllClients(): Promise<OutputGetDTO[]> {
    const clients = await this.getAllClientUseCase.execute();
    return clients;
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Get a client by id" })
  @ApiParam({ description: "Client id", name: "id" })
  @ApiResponse({ description: "Client", status: HttpStatus.OK, type: OutputGetDTO })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @UseGuards(AuthenticateGuard)
  @Get("clients/:id")
  async getClientById(@Param("id") id: string): Promise<OutputGetDTO> {
    const client = await this.getClientByIdUseCase.execute(id);
    return client;
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Get the profile of the authenticated client" })
  @ApiResponse({ description: "Client", status: HttpStatus.OK, type: OutputGetDTO })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Client", status: HttpStatus.OK, type: OutputGetDTO })
  @UseGuards(AuthenticateGuard)
  @Get("profile")
  async getProfile(@Req() request: Request): Promise<OutputGetDTO> {
    const client = await this.getClientByIdUseCase.execute(request["profile"].sub);
    return client;
  }


  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Update a client" })
  @ApiResponse({ description: "Updated client", status: HttpStatus.OK, type: OutputUpdateDTO })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @UseGuards(AuthenticateGuard)
  @Patch("clients/:id")
  async updateClient(@Param("id") id: string, @Body() inputUpdateDTO: InputUpdateDTO): Promise<OutputUpdateDTO> {
    const updatedClient = await this.updateClientUseCase.execute(id, inputUpdateDTO);
    return updatedClient;
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Delete a client" })
  @ApiParam({ description: "Client id", name: "id" })
  @ApiResponse({ description: "No content", status: HttpStatus.NO_CONTENT })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @UseGuards(AuthenticateGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("clients/:id")
  async deleteClient(@Param("id") id: string): Promise<void> {
    await this.deleteClientUseCase.execute(id);
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Add a contact to a client" })
  @ApiParam({ description: "Client id", name: "id" })
  @ApiResponse({ description: "Contact added to client", status: HttpStatus.OK, type: OutputAddContactDTO })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @UseGuards(AuthenticateGuard)
  @Post("clients/:id/contacts")
  async addContact(@Param("id") id: string, @Body() inputAddContactDTO: InputAddContactDTO): Promise<OutputAddContactDTO> {
    const addedContact = await this.addContactToClientUseCase.execute(id, inputAddContactDTO);
    return addedContact;
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Update a contact of a client" })
  @ApiParam({ description: "Client id", name: "id" })
  @ApiParam({ description: "Contact id", name: "contactId" })
  @ApiResponse({ description: "Contact updated", status: HttpStatus.OK, type: OutputAddContactDTO })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Contact not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @UseGuards(AuthenticateGuard)
  @Patch("clients/:id/contacts/:contactId")
  async updateContact(@Param("id") id: string, @Param("contactId") contactId: string, @Body() inputAddContactDTO: InputAddContactDTO): Promise<OutputAddContactDTO> {
    const updatedContact = await this.updateContactInClientUseCase.execute(id, contactId, inputAddContactDTO);
    return updatedContact;
  }

  @ApiHeader({ name: "Authorization", description: "Bearer token" })
  @ApiOperation({ summary: "Remove a contact from a client" })
  @ApiResponse({ description: "No content", status: HttpStatus.NO_CONTENT })
  @ApiParam({ description: "Client id", name: "id" })
  @ApiParam({ description: "Contact id", name: "contactId" })
  @ApiResponse({ description: "Contact updated", status: HttpStatus.OK, type: OutputAddContactDTO })
  @ApiResponse({ description: "Client not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Contact not found", status: HttpStatus.NOT_FOUND })
  @ApiResponse({ description: "Invalid token", status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ description: "Token not found", status: HttpStatus.UNAUTHORIZED })
  @UseGuards(AuthenticateGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("clients/:id/contacts/:contactId")
  async removeContact(@Param("id") id: string, @Param("contactId") contactId: string): Promise<void> {
    await this.removeContactFromClientUseCase.execute(id, contactId);
  }
}
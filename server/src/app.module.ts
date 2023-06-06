import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationClientUseCase } from "./app/clients/use-cases/auth/authentication-client.usecase";
import { AddContactToClientUseCase } from "./app/clients/use-cases/contacts/add-contact/add-contact.usecase";
import { RemoveContactFromClientUseCase } from "./app/clients/use-cases/contacts/remove-contact/remove-contact.usecase";
import { UpdateContactInClientUseCase } from "./app/clients/use-cases/contacts/update-contact/update-contact.usecase";
import { CreateClientUseCase } from "./app/clients/use-cases/create/create-client.usecase";
import { DeleteClientUseCase } from "./app/clients/use-cases/delete/delete-client.usecase";
import { GetAllClientUseCase } from "./app/clients/use-cases/get-all/get-all.usecase";
import { GetClientByIdUseCase } from "./app/clients/use-cases/get-by-id/get-by-id.usecase";
import { UpdateClientUseCase } from "./app/clients/use-cases/update/update-client.usecase";
import { ClientRepository } from "./domain/clients/client.repository";
import { ClientController } from "./infra/controllers/clients.controller";
import { PrismaService } from "./infra/database/prisma/prisma.service";
import { InMemoryClientRepository } from "./infra/repositories/in-memory-client.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"]
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [ClientController],
  providers: [
    CreateClientUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    GetClientByIdUseCase,
    GetAllClientUseCase,
    AddContactToClientUseCase,
    UpdateContactInClientUseCase,
    RemoveContactFromClientUseCase,
    AuthenticationClientUseCase,
    PrismaService,
    {
      provide: ClientRepository,
      // useClass: PrismaClientRepository, // <-- Change this line to use the PrismaClientRepository
      useClass: InMemoryClientRepository, // <-- Change this line to use the InMemoryClientRepository
    }
  ],
})
export class AppModule { }

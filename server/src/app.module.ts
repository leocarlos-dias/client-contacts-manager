import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";
import { AddContactUseCase } from "./app/use-cases/add-contact/add-contanct-usecase";
import { AuthClientUseCase } from "./app/use-cases/auth-client/auth-client-usecase";
import { CreateClientUseCase } from "./app/use-cases/create-client/create-client-usecase";
import { GetClientUseCase } from "./app/use-cases/get-client/get-client-usecase";
import { GetClientsUseCase } from "./app/use-cases/get-clients/get-clients-usecase";
import { RemoveClientUseCase } from "./app/use-cases/remove-client/remove-client-usecase";
import { RemoveContactUseCase } from "./app/use-cases/remove-contact/remove-contact-usecase";
import { UpdateClientUseCase } from "./app/use-cases/update-client/update-client-usecase";
import { UpdateContactUseCase } from "./app/use-cases/update-contact/update-contact-usecase";
import { ClientRepository } from "./domain/repositories/client.repository";
import { ClientController } from "./infra/controllers/client.controller";
import { ErrorInterceptor } from "./infra/error.interceptor";
import { ClientPrismaRepository } from "./infra/repositories/prisma/client-prisma.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    })],
  controllers: [ClientController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: ClientRepository,
      useClass: ClientPrismaRepository
    },
    CreateClientUseCase, RemoveClientUseCase, UpdateClientUseCase, GetClientUseCase, AuthClientUseCase,
    GetClientsUseCase, AddContactUseCase, RemoveContactUseCase, UpdateContactUseCase,
  ],
})
export class AppModule { }

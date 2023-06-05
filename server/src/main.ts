import { NestFactory } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";
import { AppModule } from "./app.module";
export const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3333);
}
bootstrap();

import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class InputAddContactDTO {
  @ApiProperty({ description: "Client's full name", example: "John Doe", required: true })
  fullName: string;

  @ApiProperty({ description: "Client's email", example: "client@example.com", required: true })
  email: string;

  @ApiProperty({ description: "Client's phone", example: "11999999999", required: true })
  phone: string;
}

export class OutputAddContactDTO {
  @ApiResponseProperty({ example: "5f8b8b3a-3b1a-4b0a-8f0a-0b7b8b3a1a1a", type: "string" })
  id: string;

  @ApiResponseProperty({ example: "John Doe", type: "string" })
  fullName: string;

  @ApiResponseProperty({ example: "jonhdoe@example.com", type: "string" })
  email: string;

  @ApiResponseProperty({ example: "11999999999", type: "string" })
  phone: string;

  @ApiResponseProperty({ example: "2020-10-18T00:00:00.000Z", type: "string" })
  registrationDate: Date;
}
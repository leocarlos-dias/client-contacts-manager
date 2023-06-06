import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";

export class InputUpdateDTO {
  @ApiPropertyOptional({ description: "Client's full name", example: "John Doe", required: false })
  fullName?: string;

  @ApiPropertyOptional({ description: "Client's email", example: "client@example.com", required: false })
  email?: string;

  @ApiPropertyOptional({ description: "Client's phone", example: "11999999999", required: false })
  phone?: string;
}

export class OutputUpdateDTO {
  @ApiResponseProperty({ example: "5f8b8b3a-3b1a-4b0a-8f0a-0b7b8b3a1a1a", type: "string" })
  id: string;

  @ApiResponseProperty({ example: "John Doe", type: "string" })
  fullName: string;

  @ApiResponseProperty({ example: "john.doe@example.com", type: "string" })
  email: string;

  @ApiResponseProperty({ example: "1234567890", type: "string" })
  phone: string;

  @ApiResponseProperty({ example: "2023-06-06T12:34:56.789Z", type: "string", format: "date-time" })
  createdAt?: Date;

  @ApiResponseProperty({
    example: [
      {
        id: "5f8b8b3a-3b1a-4b0a-8f0a-0b7b8b3a1a1a",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "9876543210",
        registrationDate: "2023-06-06T10:00:00.000Z"
      }
    ],
    type: "array",
  })
  contacts?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    registrationDate: Date;
  }[];
}
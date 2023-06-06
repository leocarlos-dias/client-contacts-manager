import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class InputAuthenticateDTO {
  @ApiProperty({ description: "Client's email", example: "client@example.com", required: true })
  email: string;

  @ApiProperty({ description: "Client's phone", example: "11999999999", required: true })
  phone: string;
}

export class OutputAuthenticateDTO {
  @ApiResponseProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", type: "string" })
  access_token: string;
}
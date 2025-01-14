import { ApiProperty } from "@nestjs/swagger";

export class LoginInput {
  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user",
  })
  login: string;

  @ApiProperty({
    example: "password123",
    description: "The password of the user",
  })
  pass: string;
}

export class AuthResult {
  @ApiProperty({
    example: "jwt-token-string",
    description: "The JWT access token that you must use for secured routes",
  })
  accessToken: string;

  @ApiProperty({
    example: "12345",
    description: "The unique ID of the user",
  })
  userId: string;

  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the logged-in user",
  })
  email: string;
}

export class UserInfo {
  @ApiProperty({
    example: "12345",
    description: "The unique ID of the user",
  })
  userId: string;

  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user",
  })
  email: string;

  //   @ApiProperty({
  //     example: 1623456000,
  //     description: 'The moment of issuance (Unix timestamp)',
  //   })
  //   iat: number;

  //   @ApiProperty({
  //     example: 1623459600,
  //     description: 'The moment when the token expires (Unix timestamp)',
  //   })
  exp: number;
}

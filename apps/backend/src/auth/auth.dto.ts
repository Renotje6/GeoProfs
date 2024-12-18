import { ApiProperty } from "@nestjs/swagger";

export class LoginInput {
  @ApiProperty({
    example: "user@example.com",
    description: "Het e-mailadres van de gebruiker",
  })
  login: string;

  @ApiProperty({
    example: "password123",
    description: "Het wachtwoord van de gebruiker",
  })
  pass: string;
}

export class AuthResult {
  @ApiProperty({
    example: "jwt-token-string",
    description:
      "Het JWT access token dat je moet gebruiken voor beveiligde routes",
  })
  accessToken: string;

  @ApiProperty({
    example: "12345",
    description: "Het unieke ID van de gebruiker",
  })
  userId: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Het e-mailadres van de ingelogde gebruiker",
  })
  email: string;
}

export class UserInfo {
  @ApiProperty({
    example: "12345",
    description: "Het unieke ID van de gebruiker",
  })
  userId: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Het e-mailadres van de gebruiker",
  })
  email: string;

  //   @ApiProperty({
  //     example: 1623456000,
  //     description: 'Het moment van uitgifte (Unix timestamp)',
  //   })
  //   iat: number;

  //   @ApiProperty({
  //     example: 1623459600,
  //     description: 'Het moment waarop de token verloopt (Unix timestamp)',
  //   })
  exp: number;
}

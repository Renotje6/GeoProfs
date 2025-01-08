import { ApiProperty } from "@nestjs/swagger";

export class UserCreateInput {
  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user",
  })
  email: string;

  @ApiProperty({
    example: "securepassword123",
    description: "The password for the user",
  })
  password: string;

  @ApiProperty({
    example: "https://example.com/avatar.jpg",
    description: "URL to the user's avatar image",
  })
  avatar: string;

  @ApiProperty({
    example: "John Doe",
    description: "The full name of the user",
  })
  name: string;
}

export class UserResult {
  @ApiProperty({
    example: "12345",
    description: "Unique identifier of the user",
  })
  id: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Email address of the user",
  })
  email: string;

  @ApiProperty({
    example: "https://example.com/avatar.jpg",
    description: "Avatar image URL of the user",
  })
  avatar: string;

  @ApiProperty({
    example: "John Doe",
    description: "The full name of the user",
  })
  name: string;

  @ApiProperty({
    example: "2024-01-01T12:00:00.000Z",
    description: "Timestamp of when the user was created",
  })
  createdAt: string;
}

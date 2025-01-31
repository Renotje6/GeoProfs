import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

// Mock implementation of UsersService
const mockUsersService = {
    findByEmail: jest.fn(), // Function to find a user by email
    findByEmailIncludingPassword: jest.fn(), // Function to find a user including their hashed password
};

// Mock implementation of JwtService
const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue("mock-jwt-token"), // Mock JWT token generation
};

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(async () => {
        // Create a testing module with mocked dependencies
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: mockUsersService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(authService).toBeDefined();
    });

    describe("validateUser", () => {
        it("should return user data if the email and password are correct", async () => {
            const mockUser = {
                email: "user@example.com",
                password: await bcrypt.hash("password123", 10), // Hash the password
            };

            // Mock the function to return the user with hashed password
            mockUsersService.findByEmailIncludingPassword.mockResolvedValue(mockUser);

            // Validate the user
            const result = await authService.validateUser({
                email: "user@example.com",
                password: "password123",
            });

            // Expect the returned user data to match
            expect(result).toEqual({
                email: "user@example.com",
                password: mockUser.password,
            });
        });

        it("should return null if the password is incorrect", async () => {
            const mockUser = {
                email: "user@example.com",
                password: await bcrypt.hash("password123", 10), // Hash the correct password
            };

            // Mock the function to return the user
            mockUsersService.findByEmailIncludingPassword.mockResolvedValue(mockUser);

            // Attempt to validate with the wrong password
            const result = await authService.validateUser({
                email: "user@example.com",
                password: "wrongpassword",
            });

            // Expect result to be null
            expect(result).toBeNull();
        });

        it("should return null if the user does not exist", async () => {
            // Mock the function to return null (user not found)
            mockUsersService.findByEmailIncludingPassword.mockResolvedValue(null);

            // Attempt to validate a non-existing user
            const result = await authService.validateUser({
                email: "nonexistent@example.com",
                password: "password123",
            });

            // Expect result to be null
            expect(result).toBeNull();
        });
    });

    describe("signIn", () => {
        it("should return an access token when valid credentials are provided", async () => {
            const mockUser = {
                id: "1", // User ID
                email: "user@example.com",
                password: await bcrypt.hash("password123", 10), // Hashed password
            };

            // Mock the function to return the user
            mockUsersService.findByEmailIncludingPassword.mockResolvedValue(mockUser);

            // Sign in with correct credentials
            const result = await authService.signIn({
                email: "user@example.com",
                password: "password123",
            });

            // Expect an access token and user details
            expect(result).toHaveProperty("accessToken");
            expect(result.accessToken).toBe("mock-jwt-token");
            expect(result.userId).toBe(mockUser.id);
            expect(result.email).toBe(mockUser.email);
        });

        it("should throw UnauthorizedException if the password is incorrect", async () => {
            const mockUser = {
                id: "1",
                email: "user@example.com",
                password: await bcrypt.hash("password123", 10), // Correct password is hashed
            };

            // Mock the function to return the user
            mockUsersService.findByEmailIncludingPassword.mockResolvedValue(mockUser);

            // Attempt to sign in with an incorrect password
            await expect(
                authService.signIn({
                    email: "user@example.com",
                    password: "wrongpassword",
                }),
            ).rejects.toThrowError(new UnauthorizedException("Invalid password"));
        });

        it("should throw UnauthorizedException if the user does not exist", async () => {
            // Mock the function to return null (user not found)
            mockUsersService.findByEmailIncludingPassword.mockResolvedValue(null);

            // Attempt to sign in with a non-existing user
            await expect(
                authService.signIn({
                    email: "nonexistent@example.com",
                    password: "password123",
                }),
            ).rejects.toThrowError(new UnauthorizedException("User not found"));
        });
    });
});

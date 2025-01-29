import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

// Mock de UsersService, die we gaan gebruiken in onze tests
const mockUsersService = {
	findByEmail: jest.fn(),
	findByEmailIncludingPassword: jest.fn(),
};

const mockJwtService = {
	signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
};

describe('AuthService', () => {
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, { provide: UsersService, useValue: mockUsersService }, { provide: JwtService, useValue: mockJwtService }],
		}).compile();

		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('validateUser', () => {
		it('should return user data if the email and password are correct', async () => {
			const mockUser = { email: 'user@example.com', password: await bcrypt.hash('password123', 10) };

			mockUsersService.findByEmail.mockResolvedValue(mockUser);

			const result = await authService.validateUser({ email: 'user@example.com', password: 'password123' });

			expect(result).toEqual({
				email: 'user@example.com',
				password: mockUser.password,
			});
		});

		it('should return null if the password is incorrect', async () => {
			const mockUser = { email: 'user@example.com', password: await bcrypt.hash('password123', 10) };

			mockUsersService.findByEmail.mockResolvedValue(mockUser);

			const result = await authService.validateUser({ email: 'user@example.com', password: 'wrongpassword' });

			expect(result).toBeNull();
		});

		it('should return null if the user does not exist', async () => {
			mockUsersService.findByEmail.mockResolvedValue(null);

			const result = await authService.validateUser({ email: 'nonexistent@example.com', password: 'password123' });

			expect(result).toBeNull();
		});
	});

	describe('signIn', () => {
		it('should return an access token when valid credentials are provided', async () => {
			const mockUser = { email: 'user@example.com', password: await bcrypt.hash('password123', 10), id: 1, role: 'user' };
			mockUsersService.findByEmail.mockResolvedValue(mockUser);

			const result = await authService.signIn({ email: 'user@example.com', password: 'password123' });

			expect(result).toHaveProperty('accessToken');
			expect(result.accessToken).toBe('mock-jwt-token');
			expect(result.userId).toBe(mockUser.id);
			expect(result.email).toBe(mockUser.email);
		});

		it('should throw UnauthorizedException if the password is incorrect', async () => {
			const mockUser = { email: 'user@example.com', password: await bcrypt.hash('password123', 10), id: 1, role: 'user' };
			mockUsersService.findByEmail.mockResolvedValue(mockUser);

			await expect(authService.signIn({ email: 'user@example.com', password: 'wrongpassword' })).rejects.toThrowError(new UnauthorizedException('Invalid password'));
		});

		it('should throw UnauthorizedException if the user does not exist', async () => {
			mockUsersService.findByEmail.mockResolvedValue(null);

			await expect(authService.signIn({ email: 'nonexistent@example.com', password: 'password123' })).rejects.toThrowError(new UnauthorizedException('User not found'));
		});
	});
});

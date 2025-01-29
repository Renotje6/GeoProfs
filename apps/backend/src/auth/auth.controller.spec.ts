import { Test, TestingModule } from '@nestjs/testing';
import { AuthResult, LoginInput } from './auth.dto';
import { AuthService } from './auth.service';
import { PassportAuthController } from './passport.auth.controller';

// Mock for AuthService to simulate its behavior in tests
const mockAuthService = {
	signIn: jest.fn(),
};

describe('PassportAuthController', () => {
	let controller: PassportAuthController;
	let authService: AuthService;

	// Setup before each test - creating a testing module and injecting dependencies
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PassportAuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService, // Providing mock service
				},
			],
		}).compile();

		// Initializing the controller and service
		controller = module.get<PassportAuthController>(PassportAuthController);
		authService = module.get<AuthService>(AuthService);
	});

	// Tests for the login functionality
	describe('login', () => {
		it('should successfully log in and return JWT token and user info', async () => {
			// Arrange: Creating a mock login input and a mock AuthResult response
			const loginInput: LoginInput = {
				login: 'user@example.com',
				pass: 'password',
			};
			const mockAuthResult: AuthResult = {
				accessToken: 'jwt_token',
				userId: '12345',
				email: 'user@example.com',
			};
			mockAuthService.signIn.mockResolvedValue(mockAuthResult); // Mocking resolved value for signIn function

			// Act: Calling the login method on the controller
			const result = await controller.login(loginInput);

			// Assert: Checking that the result matches the expected AuthResult
			expect(result).toEqual(mockAuthResult);
			expect(mockAuthService.signIn).toHaveBeenCalledWith({
				email: loginInput.login,
				password: loginInput.pass,
			});
		});

		it('should throw unauthorized if invalid credentials are provided', async () => {
			// Arrange: Creating mock invalid credentials and making signIn throw an "Unauthorized" error
			const loginInput: LoginInput = {
				login: 'user@example.com',
				pass: 'wrongpassword',
			};
			mockAuthService.signIn.mockRejectedValue(new Error('Unauthorized')); // Mocking rejected promise for invalid credentials

			// Act & Assert: Ensure that the function throws an error if invalid credentials are provided
			await expect(controller.login(loginInput)).rejects.toThrowError('Unauthorized');
		});
	});
});

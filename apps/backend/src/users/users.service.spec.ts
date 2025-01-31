import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
	let service: UsersService;
	let usersRepository: jest.Mocked<Partial<Repository<User>>>;

	beforeEach(async () => {
		// Mock the repository methods that are used in UsersService
		usersRepository = {
			find: jest.fn(),
			findOne: jest.fn(),
		};

		// Create the testing module and provide the UsersService and mocked repository
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useValue: usersRepository,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	// Test to check if the UsersService is defined
	it("should be defined", () => {
		expect(service).toBeDefined(); // The service should be defined and initialized
	});

	describe("findAll", () => {
		// Test for the 'findAll' method in UsersService
		it("should return all users", async () => {
			// Create mock data for users
			const mockUsers = [
				{ id: "1", email: "user1@example.com" } as User,
				{ id: "2", email: "user2@example.com" } as User,
			];
			// Mock the `find` method to return the mock data
			usersRepository.find.mockResolvedValue(mockUsers);

			const result = await service.findAll();
			expect(result).toEqual(mockUsers);
			expect(usersRepository.find).toHaveBeenCalled();
		});
	});

	describe("findOne", () => {
		// Test for the 'findOne' method in UsersService
		it("should return a user by id", async () => {
			const mockUser = { id: "1", email: "user1@example.com" } as User;
			usersRepository.findOne.mockResolvedValue(mockUser);

			const result = await service.findOne("1");
			expect(result).toEqual(mockUser);
			expect(usersRepository.findOne).toHaveBeenCalledWith({
				where: { id: "1" },
			});
		});

		// Test if `findOne` returns null when no user is found
		it("should return null if no user is found", async () => {
			usersRepository.findOne.mockResolvedValue(null);

			// Call the `findOne` method with a non-existent user ID
			const result = await service.findOne("999");
			expect(result).toBeNull();
			expect(usersRepository.findOne).toHaveBeenCalledWith({
				where: { id: "999" },
			});
		});
	});

	describe("findByEmail", () => {
		// Test for the 'findByEmail' method in UsersService
		it("should return a user by email", async () => {
			const mockUser = { id: "1", email: "user1@example.com" } as User;
			usersRepository.findOne.mockResolvedValue(mockUser);

			// Call the `findByEmail` method with a valid email
			const result = await service.findByEmail("user1@example.com");
			expect(result).toEqual(mockUser);
			expect(usersRepository.findOne).toHaveBeenCalledWith({
				where: { email: "user1@example.com" },
			});
		});
	});
});

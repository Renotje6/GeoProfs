// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Role } from 'src/auth/enums/role.enum';
// import { Employee } from 'src/entities/employee.entity';
// import { Manager } from 'src/entities/manager.entity';
// import { User } from 'src/entities/user.entity';
// import { createQueryBuilder } from 'typeorm';
// import { EmployeesService } from './employees.service';

// describe('EmployeesService', () => {
// 	let service: EmployeesService;

// 	const mockEmployees = [
// 		{
// 			id: '5678-5678-5678',
// 			email: 'john.doe@mail.com',
// 			name: 'John Doe',
// 			departmentId: '1234-1234-1234',
// 			balance: 0,
// 			department: null,
// 			user: {}, // Add this property if it's required by Employee interface
// 			sickReports: [], // Add this property if it's required by Employee interface
// 			createdAt: new Date(), // Add this property if it's required by Employee interface
// 			updatedAt: new Date(), // Add this property if it's required by Employee interface
// 		},
// 		{
// 			id: '5678-5678-5679',
// 			email: 'jane.doe@mail.com',
// 			name: 'Jane Doe',
// 			departmentId: '1234-1234-1234',
// 			balance: 0,
// 			department: null,
// 			user: {}, // Add this property if it's required by Employee interface
// 			sickReports: [], // Add this property if it's required by Employee interface
// 			createdAt: new Date(), // Add this property if it's required by Employee interface
// 			updatedAt: new Date(), // Add this property if it's required by Employee interface
// 		},
// 	];

// 	beforeEach(async () => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			providers: [
// 				EmployeesService,
// 				{
// 					provide: getRepositoryToken(Employee),
// 					useFactory: mockRepositoryFactory,
// 				},
// 				{
// 					provide: getRepositoryToken(Manager),
// 					useFactory: mockRepositoryFactory,
// 				},
// 				{
// 					provide: getRepositoryToken(User),
// 					useFactory: mockRepositoryFactory,
// 				},
// 			],
// 		}).compile();

// 		service = module.get<EmployeesService>(EmployeesService);
// 	});

// 	it('should be defined', () => {
// 		expect(service).toBeDefined();
// 	});

// 	it('find all should call createQueryBuilder', async () => {
// 		service.findAll({ id: '1234-1234-1234', role: Role.manager } as User);
// 		expect(createQueryBuilder).toHaveBeenCalled();
// 	});
// });

// // describe("EmployeesService", () => {
// //   let service: EmployeesService;

// //   const mockUsersService = {
// //     findByEmail: jest.fn(), // Mock for the UsersService method
// //   };

// //   const mockJwtService = {
// //     sign: jest.fn(), // Mock for the JwtService method
// //   };

// //   const mockEmployeeRepository = {
// //     find: jest.fn(),
// //     findOne: jest.fn(),
// //     createQueryBuilder: jest.fn(() => ({
// //       leftJoinAndSelect: jest.fn().mockReturnThis(),
// //       where: jest.fn().mockReturnThis(),
// //       getOne: jest.fn().mockResolvedValue(null),
// //     })),
// //     save: jest.fn(),
// //     create: jest.fn(),
// //   };

// //   const mockDepartmentRepository = {
// //     findOne: jest.fn(),
// //   };

// //   const mockUserRepository = {
// //     save: jest.fn(),
// //     create: jest.fn(),
// //   };

// //   beforeEach(async () => {
// //     const module: TestingModule = await Test.createTestingModule({
// //       providers: [
// //         AuthService, // Ensure AuthService is included
// //         { provide: UsersService, useValue: mockUsersService }, // Mock for UsersService
// //         { provide: JwtService, useValue: mockJwtService }, // Mock for JwtService
// //         EmployeesService,
// //         {
// //           provide: getRepositoryToken(Employee),
// //           useValue: mockEmployeeRepository,
// //         },
// //         {
// //           provide: getRepositoryToken(Department),
// //           useValue: mockDepartmentRepository,
// //         },
// //         {
// //           provide: getRepositoryToken(User),
// //           useValue: mockUserRepository,
// //         },
// //       ],
// //     }).compile();

// //     service = module.get<EmployeesService>(EmployeesService);
// //   });

// //   it("should be defined", () => {
// //     expect(service).toBeDefined();
// //   });

// //   describe("findByEmail", () => {
// //     it("should return null if no employee is found", async () => {
// //       // Mock the query builder to simulate no result
// //       mockEmployeeRepository.createQueryBuilder = jest.fn(() => ({
// //         leftJoinAndSelect: jest.fn().mockReturnThis(),
// //         where: jest.fn().mockReturnThis(),
// //         getOne: jest.fn().mockResolvedValue(null), // No result
// //       }));

// //       const result = await service.findByEmail("john@example.com");

// //       expect(result).toBeNull(); // Expect null because no employee was found
// //     });
// //   });

// //   describe("insert", () => {
// //     it("should insert a new employee", async () => {
// //       const mockEmployeeInput = {
// //         email: "john@example.com",
// //         password: "password123",
// //         avatar: "avatar.png",
// //         name: "John Doe",
// //         departmentId: "dep1",
// //       };

// //       const mockDepartment = { id: "dep1", name: "HR" };
// //       const mockUser = {
// //         id: "user1",
// //         email: "john@example.com",
// //         role: "employee",
// //       };
// //       const mockEmployee = {
// //         id: "user1",
// //         balance: 0,
// //         department: mockDepartment,
// //       };

// //       // Mock the necessary methods
// //       mockEmployeeRepository.create.mockReturnValue(mockEmployee);
// //       mockEmployeeRepository.save.mockResolvedValue(mockEmployee);
// //       mockDepartmentRepository.findOne.mockResolvedValue(mockDepartment);
// //       mockUserRepository.create.mockReturnValue(mockUser);
// //       mockUserRepository.save.mockResolvedValue(mockUser);

// //       const result = await service.insert(mockEmployeeInput);

// //       expect(result).toEqual(mockEmployee);
// //     });

// //     it("should throw an error if the employee already exists", async () => {
// //       // Mock the findByEmail method on the service instance
// //       service.findByEmail = jest.fn().mockResolvedValueOnce({
// //         id: "1",
// //         email: "john@example.com",
// //         // other mock properties of the employee
// //       });

// //       // Call insert and expect it to throw an error
// //       await expect(
// //         service.insert({
// //           email: "john@example.com",
// //           password: "password123",
// //           avatar: "avatar.png",
// //           name: "John Doe",
// //           departmentId: "dep1",
// //         })
// //       ).rejects.toThrow("Employee already exists");
// //     });

// //     it("should throw an error if the department is not found", async () => {
// //       mockDepartmentRepository.findOne.mockResolvedValueOnce(null);

// //       await expect(
// //         service.insert({
// //           email: "john@example.com",
// //           password: "password123",
// //           avatar: "avatar.png",
// //           name: "John Doe",
// //           departmentId: "dep1",
// //         })
// //       ).rejects.toThrow("Department not found");
// //     });
// //   });
// // });

// export const mockRepositoryFactory = () => {
// 	const mockDeleteSingleton = jest.fn().mockReturnThis();
// 	const mockExecuteSingleton = jest.fn().mockReturnThis();
// 	const mockFromSingleton = jest.fn().mockReturnThis();
// 	const mockGetManySingleton = jest.fn().mockReturnThis();
// 	const mockGetOneSingleton = jest.fn().mockReturnThis();
// 	const mockInnerJoinSingleton = jest.fn().mockReturnThis();
// 	const mockInnerJoinAndSelectSingleton = jest.fn().mockReturnThis();
// 	const mockLeftJoinAndSelectSingleton = jest.fn().mockReturnThis();
// 	const mockOrderBySingleton = jest.fn().mockReturnThis();
// 	const mockWhereSingleton = jest.fn().mockReturnThis();

// 	return {
// 		create: jest.fn(),
// 		save: jest.fn(),
// 		delete: jest.fn(),
// 		findOne: jest.fn(),
// 		findOneBy: jest.fn(),
// 		find: jest.fn(),
// 		createQueryBuilder: () => ({
// 			delete: mockDeleteSingleton,
// 			execute: mockExecuteSingleton,
// 			from: mockFromSingleton,
// 			getMany: mockGetManySingleton,
// 			getOne: mockGetOneSingleton,
// 			innerJoin: mockInnerJoinSingleton,
// 			innerJoinAndSelect: mockInnerJoinAndSelectSingleton,
// 			leftJoinAndSelect: mockLeftJoinAndSelectSingleton,
// 			orderBy: mockOrderBySingleton,
// 			where: mockWhereSingleton,
// 		}),
// 	};
// };

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { Manager } from '../entities/manager.entity';
import { User } from '../entities/user.entity';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
	let service: EmployeesService;
	let mockEmployeeQB;
	let mockManagerQB;

	const mockEmployeesRepository = {
		createQueryBuilder: jest.fn(() => mockEmployeeQB),
	};

	const mockManagerRepository = {
		createQueryBuilder: jest.fn(() => mockManagerQB),
	};

	beforeEach(async () => {
		// Reset query builder mocks for each test
		mockEmployeeQB = {
			leftJoinAndSelect: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			getOne: jest.fn(),
			getMany: jest.fn(),
		};

		mockManagerQB = {
			leftJoinAndSelect: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			getOne: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EmployeesService,
				{
					provide: getRepositoryToken(Employee),
					useValue: mockEmployeesRepository,
				},
				{
					provide: getRepositoryToken(Manager),
					useValue: mockManagerRepository,
				},
			],
		}).compile();

		service = module.get<EmployeesService>(EmployeesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('findAll', () => {
		it('should return employees from manager department', async () => {
			const mockUser = { id: 'user-123', role: 'manager' } as User;
			const mockManager = {
				department: { id: 'dept-123' },
			};
			const mockEmployees = [{ id: 'emp-1' }, { id: 'emp-2' }];

			mockManagerQB.getOne.mockResolvedValue(mockManager);
			mockEmployeeQB.getMany.mockResolvedValue(mockEmployees);

			const result = await service.findAll(mockUser);

			expect(mockManagerRepository.createQueryBuilder).toHaveBeenCalledWith('manager');
			expect(mockManagerQB.leftJoinAndSelect).toHaveBeenCalledWith('manager.department', 'department');
			expect(mockManagerQB.where).toHaveBeenCalledWith('manager.userId = :managerId', { managerId: 'user-123' });

			expect(mockEmployeesRepository.createQueryBuilder).toHaveBeenCalledWith('employee');
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith('employee.user', 'user');
			expect(mockEmployeeQB.where).toHaveBeenCalledWith('employee.departmentId = :departmentId', {
				departmentId: 'dept-123',
			});

			expect(result).toEqual(mockEmployees);
		});

		it('should throw error if manager not found', async () => {
			const mockUser = { id: 'user-123', role: 'manager' } as User;
			mockManagerQB.getOne.mockResolvedValue(null);

			await expect(service.findAll(mockUser)).rejects.toThrow('Manager not found');
		});
	});

	describe('findOne', () => {
		it('should return employee by id with user relation', async () => {
			const mockEmployee = { id: 'emp-123', name: 'John Doe' };
			mockEmployeeQB.getOne.mockResolvedValue(mockEmployee);

			const result = await service.findOne('emp-123');

			expect(mockEmployeesRepository.createQueryBuilder).toHaveBeenCalledWith('employee');
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith('employee.user', 'user');
			expect(mockEmployeeQB.where).toHaveBeenCalledWith('employee.userId = :id', { id: 'emp-123' });
			expect(result).toEqual(mockEmployee);
		});

		it('should return null if employee not found', async () => {
			mockEmployeeQB.getOne.mockResolvedValue(null);

			const result = await service.findOne('invalid-id');
			expect(result).toBeNull();
		});
	});

	describe('findByEmail', () => {
		it('should return employee by email with relations', async () => {
			const mockEmployee = { id: 'emp-123', user: { email: 'test@example.com' } };
			mockEmployeeQB.getOne.mockResolvedValue(mockEmployee);

			const result = await service.findByEmail('test@example.com');

			expect(mockEmployeesRepository.createQueryBuilder).toHaveBeenCalledWith('employee');
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith('employee.id', 'user');
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith('employee.department', 'department');
			expect(mockEmployeeQB.where).toHaveBeenCalledWith('user.email = :email', { email: 'test@example.com' });
			expect(result).toEqual(mockEmployee);
		});

		it('should return null when no employee found', async () => {
			mockEmployeeQB.getOne.mockResolvedValue(null);

			const result = await service.findByEmail('unknown@example.com');
			expect(result).toBeNull();
		});

		// If you want to test the actual query structure
		it('should use correct join syntax', async () => {
			await service.findByEmail('test@example.com');
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'employee.id', 'user');
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenNthCalledWith(2, 'employee.department', 'department');
		});
	});
});

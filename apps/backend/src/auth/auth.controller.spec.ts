import { Test, TestingModule } from '@nestjs/testing';
import { PassportAuthController } from './passport.auth.controller';

describe('AuthController', () => {
	let controller: PassportAuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PassportAuthController],
		}).compile();

		controller = module.get<PassportAuthController>(PassportAuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

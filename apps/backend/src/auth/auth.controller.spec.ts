import { Test, TestingModule } from "@nestjs/testing";
import { PassportAuthController } from "./passport.auth.controller";
import { AuthService } from "./auth.service";

const mockAuthService = {};

describe("PassportAuthController", () => {
  let controller: PassportAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassportAuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<PassportAuthController>(PassportAuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

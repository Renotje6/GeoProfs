import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Request,
	Res,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { PassportJwtAuthGuard } from "src/auth/guards/jwt-auth/passport-jwt.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { User } from "../entities/user.entity";
import { CreateSickReportDto } from "./dto/responses/createSickReport.dto";
import { GetAllSickReportsDepartmentDto } from "./dto/responses/getAllSickReportsDepartment.dto";
import { GetOwnSickReportsDto } from "./dto/responses/getOwnSickReports.dto";
import { GetSickReportDto } from "./dto/responses/getSickReport.dto";
import { SickReportsService } from "./sick-reports.service";

// @Roles(Role.employee)
@UseGuards(RolesGuard)
@UseGuards(PassportJwtAuthGuard)
@Controller("sick-reports")
export class SickReportsController {
	constructor(private readonly sickReportsService: SickReportsService) {}

	@Roles(Role.employee)
	@Post()
	@ApiOperation({ summary: "Create a new sick report" })
	@ApiResponse({
		status: 201,
		description: "Sick report created",
		type: CreateSickReportDto,
	})
	@ApiResponse({
		status: 400,
		description: "User already has an active sick report",
	})
	async create(@Request() request, @Res() res: Response) {
		const user: User = request.user;

		// Check if the user has an active sick report
		if (await this.sickReportsService.userHasActiveSickReport(user)) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ message: "User already has an active sick report" });
		}

		const sickReport = await this.sickReportsService.create(request.user);

		return res
			.status(HttpStatus.CREATED)
			.json({ message: "Sick report created", data: sickReport });
	}

	@Patch(":id/end")
	@Roles(Role.employee)
	@ApiOperation({ summary: "End the sick report" })
	@ApiResponse({ status: 200, description: "Sick report ended" })
	@ApiResponse({
		status: 400,
		description: "User does not have an active sick report",
	})
	@ApiResponse({
		status: 403,
		description: "User is not the owner of the sick report",
	})
	async endSickReport(
		@Request() request,
		@Res() res: Response,
		@Param("id") id: string,
	) {
		const user: User = request.user;

		// Check if the user has an active sick report
		if (!(await this.sickReportsService.userHasActiveSickReport(user))) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ message: "User does not have an active sick report" });
		}

		const sickReport = await this.sickReportsService.findOne(id);

		if (!sickReport) {
			return res
				.status(HttpStatus.NOT_FOUND)
				.json({ message: "Sick report not found" });
		}

		if (sickReport.employee.user.id !== user.id) {
			return res
				.status(HttpStatus.FORBIDDEN)
				.json({ message: "User is not the owner of the sick report" });
		}

		await this.sickReportsService.update(id, { endDate: new Date() });

		return res.status(HttpStatus.OK).json({ message: "Sick report ended" });
	}

	@Roles(Role.manager, Role.employee)
	@Get()
	@ApiOperation({ summary: "Get all sick reports" })
	@ApiResponse({
		status: 200,
		description:
			"Returns all sick reports of employees in your department when logged in as manager,\nor returns all sick reports of the logged-in employee when logged in as employee",
		schema: {
			anyOf: [
				{ $ref: getSchemaPath(GetAllSickReportsDepartmentDto) },
				{ $ref: getSchemaPath(GetOwnSickReportsDto) },
			],
		},
	})
	findAll(@Request() request) {
		const role = request.user.role;

		if (role === Role.manager) {
			return this.sickReportsService.findAllManager(request.user);
		} else {
			return this.sickReportsService.findMine(request.user);
		}
	}

	@Roles(Role.manager, Role.employee)
	@Get(":id")
	@ApiOperation({ summary: "Get a sick report by ID" })
	@ApiResponse({
		status: 200,
		description: "Returns the sick report",
		type: GetSickReportDto,
	})
	findOne(@Param("id") id: string) {
		return this.sickReportsService.findOne(id);
	}
}

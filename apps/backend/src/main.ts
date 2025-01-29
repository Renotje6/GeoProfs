import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GetAllLeaveRequestsManagerDto } from './leave-requests/dto/responses/getAllLeaveRequestsManager.dto';
import { GetOwnLeaveRequestsDto } from './leave-requests/dto/responses/getOwnLeaveRequests.dto';
import { GetAllSickReportsDepartmentDto } from './sick-reports/dto/responses/getAllSickReportsDepartment.dto';
import { GetOwnSickReportsDto } from './sick-reports/dto/responses/getOwnSickReports.dto';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({transform: true}));
	const config = new DocumentBuilder()
		.setTitle('Geoprofs API')
		.setDescription('The API for the Geoprofs portal, allowing employees to easily manage their leave and illness. Managers and administrators can use this API to approve leave requests and monitor absenteeism.')
		.setVersion('1.0')
		.build();
	const documentFactory = () =>
		SwaggerModule.createDocument(app, config, {
			extraModels: [GetAllSickReportsDepartmentDto, GetOwnSickReportsDto, GetOwnLeaveRequestsDto, GetAllLeaveRequestsManagerDto],
		});
	SwaggerModule.setup('api', app, documentFactory);

	await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

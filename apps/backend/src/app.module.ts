import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import DataSourceModule from "./datasource/datasource.module";
import { UsersModule } from "./users/users.module";
import { EmployeesModule } from "./employees/employees.module";
import { SickReportsModule } from "./sick-reports/sick-reports.module";
import { LeaveRequestsModule } from "./leave-requests/leave-requests.module";

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DataSourceModule,
		EmployeesModule,
		SickReportsModule,
		LeaveRequestsModule,
	],
})
export class AppModule {}

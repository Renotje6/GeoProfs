import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import DataSourceModule from "./datasource/datasource.module";

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
	}),
	DataSourceModule,
],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { ConfigService } from "@nestjs/config";
import "dotenv/config";
import { DataSource } from "typeorm";

const configService = new ConfigService();

const AppDataSource = new DataSource({
	type: "mysql",
	host: configService.get("DB_HOST"),
	port: configService.get("DB_PORT"),
	username: configService.get("DB_USERNAME"),
	password: configService.get("DB_PASSWORD"),
	database: configService.get("DB_DATABASE"),
	synchronize: false,
	entities: [__dirname + "/../entities/**/*.entity{.ts,.js}"],
	migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
	migrationsRun: false,
	logging: true,
});

export default AppDataSource;

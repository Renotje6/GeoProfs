import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

@Global()
@Module({
	providers: [
		{
			provide: DataSource,
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				try {
					const dataSource = new DataSource({
						type: "mysql",
						host: "localhost",
						port: 3306,
						username: configService.get<string>("DB_USERNAME"),
						password: configService.get<string>("DB_PASSWORD"),
						database: configService.get<string>("DB_NAME"),
						synchronize: true,
						entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
					});
					await dataSource.initialize();
					console.log("Database connection established");
					return dataSource;
				} catch (err) {
					console.log("Database connection failed");
					throw err;
				}
			},
		},
	],
	exports: [DataSource],
})
export default class TypeOrmModule {}

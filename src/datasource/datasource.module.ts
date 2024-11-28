import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";

@Global()
@Module({
	providers: [
		{
			provide: DataSource,
			inject: [],
			useFactory: async () => {
				try {
					const dataSource = new DataSource({
						type: "mysql",
						host: "localhost",
						port: 3306,
						username: process.env.DB_USERNAME,
						password: process.env.DB_PASSWORD,
						database: process.env.DB_NAME,
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

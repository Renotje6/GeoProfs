// seed.ts
import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

console.log("Seeding...");

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const options: DataSourceOptions & SeederOptions = {
	type: "mysql",
	host: DB_HOST || "localhost",
	port: Number(DB_PORT) || 3306,
	username: DB_USERNAME || "test",
	password: DB_PASSWORD || "test",
	database: DB_DATABASE || "test",
	entities: ["src/entities/**/*.ts"],
	// additional config options brought by typeorm-extension
	factories: ["src/datasource/factories/**/*.ts"],
	seeds: ["src/datasource/seeders/*.seeder.ts"],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
	await dataSource.synchronize(true);
	await runSeeders(dataSource);
	console.log("Seeding completed.");
	process.exit();
});

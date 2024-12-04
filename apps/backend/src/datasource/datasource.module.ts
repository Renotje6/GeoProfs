import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Global()
@Module({
	providers: [
		{
			provide: DataSource,
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				try {
					const dataSource = new DataSource({
						type: 'mysql',
						host: configService.get<string>('DB_HOST'),
						port: configService.get<number>('DB_PORT'),
						username: configService.get<string>('DB_USERNAME'),
						password: configService.get<string>('DB_PASSWORD'),
						database: configService.get<string>('DB_DATABASE'),
						synchronize: true,
						entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
					});
					await dataSource.initialize();
					return dataSource;
				} catch (err) {
					console.log('Database connection failed');
					throw err;
				}
			},
		},
	],
	exports: [DataSource],
})
export default class TypeOrmModule {}

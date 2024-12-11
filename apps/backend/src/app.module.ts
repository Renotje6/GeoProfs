import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import DataSourceModule from './datasource/datasource.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DataSourceModule,
	],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from '../config/configuration'
import { MessagesModule } from './modules/messages/message.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('POSTGRES_HOST'),
					port: configService.get('POSTGRES_HOST_PORT'),
					username: configService.get('POSTGRES_USER'),
					password: configService.get('POSTGRES_PASSWORD'),
					entities: [__dirname + '/../**/*.entity{.ts,.js}'],
					database: configService.get('POSTGRES_DB'),
					synchronize: true,
					logging: true,
				}
			},
			inject: [ConfigService],
		}),
		MessagesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

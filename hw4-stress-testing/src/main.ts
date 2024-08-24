import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// import events from 'events'
// events.EventEmitter.defaultMaxListeners = 2000

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// use fastify to compare
	const configService = app.get<ConfigService>(ConfigService)
	app.useGlobalPipes(new ValidationPipe())
	const serv = app.getHttpServer()
	serv.maxConnections = 5000

	await app.listen(configService.get('PORT'))
}
bootstrap()

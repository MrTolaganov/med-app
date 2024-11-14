import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigModule } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' })
  await app.listen(process.env.PORT ?? 5000)
}

bootstrap()

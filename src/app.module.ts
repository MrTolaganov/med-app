import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChatModule } from './chat/chat.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import {} from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tulaganovok04:zNzSNy9LaxmSu0l1@cluster0.tzurc.mongodb.net/'
    ),
    ChatModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//

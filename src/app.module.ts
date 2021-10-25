
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import configuration from './config';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  }),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
}
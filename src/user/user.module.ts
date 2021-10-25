import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  })],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

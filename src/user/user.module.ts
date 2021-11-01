import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './services/user.service';
import { UserBaseController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [
    UserService
  ],
  exports: [
    UserService
  ],
  controllers: [UserBaseController]
})
export class UserModule {}

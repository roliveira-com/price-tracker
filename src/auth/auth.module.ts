import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { LocalSerializer } from './guards/local.serializer';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [ UserModule, PassportModule ],
  providers: [AuthService, LocalSerializer, LocalStrategy],
  exports: [AuthService ],
  controllers: [AuthController, LoginController]
})
export class AuthModule {}

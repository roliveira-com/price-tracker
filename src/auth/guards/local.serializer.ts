import { UserService } from '../../user/services/user.service';
import { User } from '../../user/schema/user.schema';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getById(userId)
    done(null, user);
  }
}
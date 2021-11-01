import { Injectable } from '@nestjs/common';
import { PageFeedbackException } from '../../common/exception';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }

  public async getAuthenticatedUser(email: string, password?: string) {
    try {
      const user = await this.userService.getByEmail(email);
      return user;
    } catch (error) {
      throw new PageFeedbackException('Email inválido ou usuário não cadastrado', 403);
    }
  }
}
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as Multer from 'multer';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthSessionGuard extends AuthGuard('local') {

  constructor(
    private readonly authService: AuthService
  ){
    super()
  }

  async canActivate(context: ExecutionContext) {
    //const request = await this._resolveFormData(context.switchToHttp().getRequest())
    const request = context.switchToHttp().getRequest()
    const user = await this.authService.getAuthenticatedUser(request.body.email, request.body.password);
    if(user){
      super.logIn({ user, ...context.switchToHttp().getRequest() })
      return true
    }
    return false
  }

  private _resolveFormData(request): Promise<any> {
    return new Promise((res, rej) => {
      Multer().any()(request, null, function (err) {
        if (err) rej(err);
        res(request);
      });
    })
  }
}

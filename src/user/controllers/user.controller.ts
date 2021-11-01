import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { PageFeedbackExceptionFilter } from '../../common/exception';
import { UserCreateDto } from '../schema/user.dto';
import { UserService } from '../services/user.service';

@Controller('')
export class UserBaseController {

  constructor(
    private readonly userService: UserService
  ){}

  @UseFilters(PageFeedbackExceptionFilter)
  @Post('register')
  async createUser(@Body() userCreate: UserCreateDto ) {
    const user = await this.userService.create(userCreate)
    return { ...userCreate }
  }

}

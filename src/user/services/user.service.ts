import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { identity } from 'rxjs';
import { PageFeedbackException } from '../../common/exception';
import { UserCreateDto } from '../schema/user.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  public authUser: User;

  async create(createUser: UserCreateDto): Promise<User> {

    const user = await this.userModel.findOne({ email: createUser.email })

    if(user){
      throw new PageFeedbackException('Email já cadastrado, use a tel de login para entrar', 400);
    }
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('Could not get the user email', 400);
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async find(filter: FilterQuery<UserDocument>): Promise<User> {
    const logged = await this.userModel.findOne(filter).exec();

    if (logged) {
      this.authUser = logged;
    }

    return logged;
  }
}

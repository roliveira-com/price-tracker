import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../../price-crawler/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

  public authUser: User;

  async create(createUser: User): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async find(filter: FilterQuery<UserDocument>): Promise<User> {
    const logged = await this.userModel.findOne(filter).exec();

    if(logged){
      this.authUser = logged;
    }

    return logged;
  }
}

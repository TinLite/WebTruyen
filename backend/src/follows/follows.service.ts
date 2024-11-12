import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}
  async followStory(userId, storyId) {
    console.log(userId, storyId);
    await this.usersModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          followstory: storyId,
        },
      },
      { new: true },
    );
  }
  async findOneUser(userId: string) {
    return await this.usersModel.findById(userId).exec();
  }
}

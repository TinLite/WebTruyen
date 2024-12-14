import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './schemas/rate.schema';

@Injectable()
export class RateService {
  constructor(
    @InjectModel(Rate.name) private readonly rateModel: Model<Rate>,
  ) { }
  create(createRateDto: CreateRateDto) {
    return 'This action adds a new rate';
  }
  async createRate(userId, storyId, createRateDto: CreateRateDto) {
    const data = await this.rateModel.create({
      ...createRateDto,
      StoryId: storyId,
      UserId: userId,
    });
    return { _id: data._id };
  }

  async upsert(userId, storyId, createRateDto: CreateRateDto) {
    return this.rateModel.findOneAndUpdate({
      StoryId: storyId,
      UserId: userId,
    }, createRateDto, {
      upsert: true,
    })
  }

  async findAllByStoryId(storyId: string) {
    return this.rateModel.find({
      StoryId: storyId
    })
  }

  async findUserRateStory(userId: string, storyId: string) {
    return this.rateModel.findOne({
      StoryId: storyId,
      UserId: userId
    })
  }
}
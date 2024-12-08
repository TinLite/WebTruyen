import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate } from './schemas/rate.schema';
import { User } from '../auth/user.decorator';

@Injectable()
export class RateService {
  constructor(
    @InjectModel(Rate.name) private readonly rateModel: Model<Rate>,
  ) {}
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
  findAll() {
    return `This action returns all rate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return `This action updates a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}

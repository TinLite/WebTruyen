import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schemas/history.schema';
import { Model } from 'mongoose';
import { Story } from '../story/schemas/story.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private readonly historyModel: Model<History>,
  ) {}
  async createHistory(
    userId,
    storyId,
    chapterId,
    createHistoryDto: CreateHistoryDto,
  ) {
    const data = await this.historyModel.create({
      ...createHistoryDto,
      userId: userId,
      storyId: storyId,
      chapterId: chapterId,
    });
    return {
      _id: data._id,
    };
  }
  async findAllHistory(userId) {
    const data = await this.historyModel.find({ userId: userId });
    return data;
  }
  async findOneHistory(userId, storyId, chapterId): Promise<History> {
    const data = await this.historyModel.findOne({
      userId: userId,
      storyId: storyId,
      chapterId: chapterId,
    });
    return data;
  }
  findAll() {
    return `This action returns all history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}

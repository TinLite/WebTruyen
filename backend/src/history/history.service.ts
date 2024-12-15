import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './schemas/history.schema';

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
    const existingHistory = await this.historyModel.findOneAndUpdate(
      { userId: userId, storyId: storyId },
      { ...createHistoryDto, chapterId: chapterId },
      { new: true, upsert: true }
    );
    return {
      _id: existingHistory._id,
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

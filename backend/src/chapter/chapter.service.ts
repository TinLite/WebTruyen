import { Injectable, Patch } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Model } from 'mongoose';
import { Story } from '../story/schemas/story.schema';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private readonly chapterModel: Model<Chapter>,
  ) {}
  async createChapter(userId, CreateChapterDto: CreateChapterDto) {
    const data = await this.chapterModel.create({
      ...CreateChapterDto,
      UserId: userId,
    });
    // console.log(data);
 
    return data._id;
  }
  async findOne(chapterId) {
    const data = await this.chapterModel.findOne({
      _id: chapterId,
    });
    return data;
  }
  async updateChapter(chapterId, UpdateChapterDto: UpdateChapterDto) {
    const data = await this.chapterModel.findByIdAndUpdate(
      chapterId,
      UpdateChapterDto,
    );
    return data._id;
  }
  async deleteChapter(chapterId) {
    return await this.chapterModel.findByIdAndDelete(chapterId);
  }
  async deleteAllChapterByStoryId(storyId) {
    return await this.chapterModel.findByIdAndDelete(storyId);
  }
  async findAllChapterByStoryId(storyId:string) {
    const data = await this.chapterModel
      .find({ StoryId: storyId })
      .populate({
        path: 'StoryId',
        select: 'status',
      })
      .exec();
      const result = data.filter(chapter => chapter.StoryId && chapter.StoryId.status === true);
    return result;
  }
}

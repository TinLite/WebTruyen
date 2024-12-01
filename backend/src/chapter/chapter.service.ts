import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Model } from 'mongoose';

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
}

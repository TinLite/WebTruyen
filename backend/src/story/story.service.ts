import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './schemas/story.schema';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name) private readonly storyModel: Model<Story>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    authorId,
    createStoryDto: CreateStoryDto,
    files?: Express.Multer.File[],
  ) {
    if (files && files.length == 1) {
      const folder = process.env.CLOUDINARY_FOLDER;
      const uploadImages = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file, folder)),
      );
      createStoryDto.coverImage = uploadImages[0];
    }
    const data = await this.storyModel.create({
      ...createStoryDto,
      authorId: authorId,
    });
    console.log(data);
    return {
      _id: data._id,
      img: data.coverImage || [],
    };
  }
  async updateStory(
    storyId: string,
    UpdateStoryDto: UpdateStoryDto,
    files?: Express.Multer.File[],
  ) {
    if (files && files.length == 1) {
      const folder = process.env.CLOUDINARY_FOLDER;
      const uploadImages = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file, folder)),
      );
      UpdateStoryDto.coverImage = uploadImages[0];
    }
    const data = await this.storyModel.updateOne(
      { _id: storyId },
      UpdateStoryDto,
    );
    return {
      messsage: 'Story updated',
    };
  }
  async findOne(id: string) {
    return this.storyModel.findOne({ _id: id }).exec();
  }
  async deleteStory(storyId) {
    return await this.storyModel
      .updateOne({ _id: storyId }, { status: false })
      .exec();
  }
  async findAll() {
    return await this.storyModel
      .find({ status: true })
      .populate('authorId', 'displayname')
      .exec();
  }
  async countStory() {
    const data = await this.storyModel.find({ status: true }).exec();
    return data.length;
  }
  async lockStory(storyId: string) {
    return await this.storyModel.updateOne({ _id: storyId }, { status: false });
  }
  async getStoriesWithNewestChapter() {
    const stories = await this.storyModel.find({ status: true }).sort({updatedAt: -1}).populate('authorId','displayname').exec();
    return stories;
  }
  async getStoriesNew(){
    const stories = await this.storyModel.find({ status: true }).sort({createdAt: -1}).populate('authorId','displayname').exec();
    return stories;
  }
  async updateTimeStamp(storyId: string) {
    return await this.storyModel.updateOne(
      { _id: storyId },
      { updatedAt: new Date() },
    );
  }
  async getStoriesWithMostRating() {
    const stories = await this.storyModel.find({ status: true }).sort({rating: -1}).populate('authorId','displayname').exec();
    return stories;
  }
  
}

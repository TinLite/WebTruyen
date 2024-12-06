import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Story } from './schemas/story.schema';
import mongoose, { Model, mongo } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from '../users/users.service';

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
    if (files && files.length > 0) {
      const folder = process.env.CLOUDINARY_FOLDER;
      const uploadImages = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file, folder)),
      );
      createStoryDto.coverImage = uploadImages;
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
    if (files && files.length > 0) {
      const folder = process.env.CLOUDINARY_FOLDER;
      const uploadImages = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file, folder)),
      );
      UpdateStoryDto.coverImage = uploadImages;
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
    return await this.storyModel.findOne({ _id: id }).exec();
  }
  async deleteStory(storyId) {
    return await this.storyModel.findByIdAndDelete({_id:storyId}).exec();
  }
}

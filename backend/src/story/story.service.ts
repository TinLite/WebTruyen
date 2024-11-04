import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Story } from './schemas/story.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name) private readonly storyModel: Model<Story>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createStoryDto: CreateStoryDto, files?: Express.Multer.File[]) {
    if (files && files.length > 0) {
      const uploadImages = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file)),
      );
      createStoryDto.CoverImage = uploadImages;
    }
    const data = await this.storyModel.create(createStoryDto);
    return {
      _id: data._id,
      img: data.CoverImage || [],
    };
  }

  findAll() {
    return `This action returns all story`;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}

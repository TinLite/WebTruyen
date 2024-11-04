import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  Type,
  UploadedFiles,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { User } from 'src/auth/user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'files',
        maxCount: 15,
      },
    ]),
  )
  create(
    @Body() createStoryDto: CreateStoryDto,
    @User() userSession,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ) {
    if (!userSession) {
      throw new Error('User not authenticated');
    }
    createStoryDto.AuthorId = userSession.id;
    return this.storyService.create(createStoryDto);
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}

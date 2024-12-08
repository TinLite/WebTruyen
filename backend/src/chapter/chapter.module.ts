import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ChapterSchema } from './schemas/chapter.schema';
import { StoryModule } from 'src/story/story.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
    StoryModule
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports:[ChapterService]
})
export class ChapterModule {}

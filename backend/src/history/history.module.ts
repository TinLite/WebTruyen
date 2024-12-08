import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import Mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './schemas/history.schema';
import { StoryModule } from 'src/story/story.module';
import { ChapterModule } from 'src/chapter/chapter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'History',
        schema: HistorySchema,
      },
    ]),
    StoryModule,
    ChapterModule,
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}

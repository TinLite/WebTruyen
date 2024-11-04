import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { RateModule } from './rate/rate.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { StoryModule } from './story/story.module';
import { HistoryModule } from './history/history.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nettruyen'),
    UsersModule,
    CommentsModule,
    RateModule,
    UtilsModule,
    AuthModule,
    CloudinaryModule,
    StoryModule,
    HistoryModule,
    ChapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

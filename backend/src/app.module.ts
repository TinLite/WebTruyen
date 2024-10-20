import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nettruyen'),
    UsersModule,
    PostsModule,
    CommentsModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

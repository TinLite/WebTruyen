import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}

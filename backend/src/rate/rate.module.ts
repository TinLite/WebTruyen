import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Rate, RateSchema } from './schemas/rate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Rate',
        schema: RateSchema,
      },
    ]),
  ],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}

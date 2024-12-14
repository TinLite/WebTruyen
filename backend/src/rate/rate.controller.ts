import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from 'src/auth/user.decorator';
import { CreateRateDto } from './dto/create-rate.dto';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) { }

  @Post('/create/story/:storyId')
  async createRate(
    @Body() createRateDto: CreateRateDto,
    @Param('storyId') storyId,
    @User() userSession,
  ) {
    if (!userSession) {
      throw new UnauthorizedException('User not Unauthorized');
    }
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new BadRequestException('Invalid story ID');
    }
    if (createRateDto.Score < 0 || createRateDto.Score > 10) {
      throw new BadRequestException("Score can't be a negative number or higher than 10");
    }
    const userId = userSession.id;
    await this.rateService.upsert(userId, storyId, createRateDto);
    return this.getSummary(storyId, userSession, createRateDto);
  }

  @Get("/summary/story/:storyId")
  async getSummary(@Param("storyId") storyId: string, @User() user, userRate?) {
    const allRatings = await this.rateService.findAllByStoryId(storyId);
    let sumScore = 0.0;
    allRatings.forEach((v) => sumScore += v.Score)
    const averateScore = sumScore / allRatings.length
    if (user && !userRate) {
      userRate = await this.rateService.findUserRateStory(user.id, storyId);
    }
    return {
      count: allRatings.length,
      average: averateScore,
      userRate: userRate ? parseFloat(userRate.Score) : null
    }
  }
}

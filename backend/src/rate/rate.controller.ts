import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { User } from 'src/auth/user.decorator';
import mongoose from 'mongoose';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

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
    const userId = userSession.id;
    return await this.rateService.createRate(userId, storyId, createRateDto);
  }
  
}

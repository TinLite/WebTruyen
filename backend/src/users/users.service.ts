import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UtilsService } from '../utils/utils.service';
import e from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersModule } from './users.module';
import * as bcrypt from 'bcrypt';
import { UpdateChapterDto } from '../chapter/dto/update-chapter.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //Create User
  async create(createUserDto: CreateUserDto) {
    const { username, password, displayname, email } = createUserDto;
    const isExist = await this.usersModel.exists({ email: email });
    if (isExist) {
      throw new BadRequestException('Email already exists');
    }
    //hashpass
    const utilsService = new UtilsService();
    const hashedPass = await utilsService.hashPassword(password);
    const newUser = await this.usersModel.create({
      username,
      password: hashedPass,
      displayname,
      email,
    });
    return {
      _id: newUser._id,
    };
  }

  //findOne User
  async findOne(id: string) {
    // return await this.usersModel.findById(id).select('+email').exec();
    return await this.usersModel.findOne({ _id: id, status: true }).exec();
  }

  async findOneByIdWithPassword(userId) {
    return await this.usersModel
      .findOne({ _id: userId })
      .select('+password')
      .exec();
  }
  async upadatePass(userId, newPass: string) {
    return await this.usersModel
      .updateOne({ _id: userId }, { password: newPass })
      .exec();
  }
  async findByEmailWithPassword(email: string) {
    return await this.usersModel.findOne({ email }).select('+password').exec();
  }
  //find User by email
  async findByEmail(email: string): Promise<Users> {
    return await this.usersModel.findOne({ email: email }).exec();
  }
  //Update User
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    files?: { avatar?: Express.Multer.File; wall?: Express.Multer.File },
  ) {
    if (files) {
      if (files.avatar) {
        const folder = process.env.CLOUDINARY_FOLDER;
        const avtImg = await this.cloudinaryService.uploadFile(
          files.avatar,
          folder,
        );
        updateUserDto.avatar = avtImg;
      }
      if (files.wall) {
        const folder = process.env.CLOUDINARY_FOLDER;
        const wallImg = await this.cloudinaryService.uploadFile(
          files.wall,
          folder,
        );
        updateUserDto.wall = wallImg;
      }
    }
    const updateUser = await this.usersModel
      .updateOne({ _id: id }, updateUserDto)
      .exec();
    return updateUser;
  }
  //delete User
  async delete(id: string) {
    await this.usersModel.findByIdAndDelete({ _id: id }).exec();
  }
  async getAllUser() {
    return await this.usersModel
      .find({ role: { $ne: 'admin' } })
      .select('+email')
      .exec();
  }
  async lockUser(id: string) {
    return await this.usersModel.updateOne({ _id: id }, { status: 0 }).exec();
  }
  async unlockUser(id: string) {
    return await this.usersModel.updateOne({ _id: id }, { status: 1 }).exec();
  }
  async deleteUser(id: string) {
    return await this.usersModel.deleteOne({ _id: id }).exec();
  }
  async countUser() {
    const data = await this.usersModel.find({ status: true }).exec();
    return data.length;
  }
  async updateUser(id, updateUserDto: UpdateUserDto) {
    return await this.usersModel.updateOne({ _id: id }, updateUserDto).exec();
  }
}

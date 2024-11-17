import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 15))
  async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadResults = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file)),
    );
    return uploadResults;
  }
  //upload multiple files
  // @Post('images')
  // @UseInterceptors(FilesInterceptor('files', 5))
  // async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
  //   const uploadResults = await Promise.all(
  //     files.map(file => this.cloudinaryService.uploadFile(file))
  //   );
  // return this.cloudinaryService.uploadMultiFiles(files);
  // }
}

import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service'
;
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
  
  //upload multiple files
  // @Post('images')
  // @UseInterceptors(FilesInterceptor('file[]', 5))
  // uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
  //   //... handle multiple files
  // }
}

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File,folder:string): Promise<string> { 
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({folder:folder},
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
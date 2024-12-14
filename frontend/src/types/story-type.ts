import { User } from "./user-type";

export class Story {
  _id: string;
  title: string;
  description: string;
  genre: string;
  authorId: User;
  coverImage?: string;
  createAt: Date;
  updateAt: Date;
  status: boolean;
  constructor(
    _id: string,
    title: string,
    description: string,
    genre: string,
    authorId: User,
    coverImage: string,
    createAt: Date,
    updateAt: Date,
    status: boolean
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.genre = genre;
    this.authorId = authorId;
    this.coverImage = coverImage;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.status = status;
  }
}

export class User {
  _id: string;
  username: string;
  displayname: string;
  email: string;
  avatar?: string;
  followstory: string[];
  create_at: Date;
  role: string[];
  rate: [];
  status: boolean;
  wall?: string;
  constructor(
    _id: string,
    username: string,
    displayname: string,
    email: string,
    avatar: string,
    followstory: string[],
    create_at: Date,
    role: string[],
    rate: [],
    status: boolean,
    wall: string
  ) {
    this._id = _id;
    this.username = username;
    this.displayname = displayname;
    this.email = email;
    this.avatar = avatar;
    this.followstory = followstory;
    this.create_at = create_at;
    this.role = role;
    this.rate = rate;
    this.status = status;
    this.wall = wall;
  }
}

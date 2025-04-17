import { model, Schema, models } from "mongoose";
import { IPlaylist, PlaylistsSchema } from "./playlist";

export type TUserData = {
  userId: string
  playlists: IPlaylist[]
  dateCreated?: Date
  dateModified?: Date
}

export interface IUserData extends TUserData { }

export const UserDataSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  playlists: [PlaylistsSchema],
  dateCreated: {
    type: Date,
  },
  dateModified: {
    type: Date,
  },
});

export default models.UserData || model("UserData", UserDataSchema)

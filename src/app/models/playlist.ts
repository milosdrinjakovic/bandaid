import { Schema } from "mongoose";

export type TPlaylist = {
  name: string
  textIds: string[]
}

export interface IPlaylist extends TPlaylist { }

export const PlaylistsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  textIds: [
    {
      type: String,
      required: true
    }
  ]
})

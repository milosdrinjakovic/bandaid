import { model, models, Schema } from "mongoose";

export type TText = {
  _id?: string
  userId: string
  title: string
  content: string
  scrollSpeed?: number
  dateCreated?: Date
  dateModified?: Date
  order: number
}

export interface IText extends TText { }

export const TextsSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  scrollSpeed: {
    type: Number,
    required: false
  },
  dateCreated: {
    type: Date,
  },
  dateModified: {
    type: Date,
  },
  order: {
    type: Number
  }
});

export default models.Texts || model("Texts", TextsSchema)

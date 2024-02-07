// import * as mongoose from 'mongoose';
// export interface News extends mongoose.Document{
//   source: {
//     id: string; // Change the type to string
//     name: string;
//   };
//   author: string;
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   publishedAt: string;
//   content: string;
// }

// export const NewsSchema = new mongoose.Schema({
//   source: {
//     id: { type: String, required: false },
//     name: { type: String, required: true },
//   },
//   author: { type: String, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: false },
//   url: { type: String, required: true },
//   urlToImage: { type: String, required: false },
//   publishedAt: { type: String, required: true },
//   content: { type: String, required: true },
// },);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection:'news'})
export class News extends Document {
  @Prop({
    type: { id: String, name: String },
    required: false,
  })
  source: {
    id: string;
    name: string;
  };

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: false })
  urlToImage: string;

  @Prop({ required: true })
  publishedAt: string;

  @Prop({ required: true })
  content: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

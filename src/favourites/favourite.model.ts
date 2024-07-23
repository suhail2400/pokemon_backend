import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'favourites' })
export class Favourite {
    @Prop({ required: true, ref: 'User' })
    user: ObjectId;

    @Prop({ required: true })
    email: String;

    @Prop({ type: String, unique: true })
    pokemon: string;
}

export type FavouriteDocument = Favourite & Document;
export const FavouritesSchema = SchemaFactory.createForClass(Favourite);
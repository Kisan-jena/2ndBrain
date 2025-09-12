import { Schema, model, models, Document, Model } from 'mongoose';

// Define interface for Tag document
export interface ITag extends Document {
  title: string;
}

// Define schema
const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

// Create and export the model with proper typing
export const TagModel: Model<ITag> = models.Tag || model<ITag>('Tag', tagSchema);

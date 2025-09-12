import { Schema, model, models, Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

// Define schema
const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Strongly type the model
export const UserModel: Model<IUserDocument> = models.User || model<IUserDocument>("User", userSchema);

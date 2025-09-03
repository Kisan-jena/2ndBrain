import mongoose, { Schema, Document, Model, models,model } from 'mongoose';

export interface RefreshTokenDoc extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Strongly typed model
export const RefreshTokenModel: Model<RefreshTokenDoc> = models.RefreshToken || model<RefreshTokenDoc>('RefreshToken', refreshTokenSchema);

import mongoose, { Document, Model } from 'mongoose';

// Define the content types as a constant
const contentType = [
  'image',
  'video',
  'article',
  'audio',
  'document', // PDFs, Word docs, etc.
  'note', // Personal notes/thoughts
  'bookmark', // Simple bookmarks
  'tweet', // Twitter posts
  'youtube', // YouTube videos
  'podcast', // Podcast episodes
  'code', // Code snippets
  'quote', // Inspirational quotes
  'recipe', // Cooking recipes
  'book', // Books/eBooks
  'course', // Online courses
  'link', // Generic links
  'presentation', // Slides, PPTs
  'tool', // Software tools/apps
  'research', // Research papers
  'news', // News articles
  'other', // Miscellaneous content
] as const;

// Define the content type using the array
export type ContentType = (typeof contentType)[number];

// Define interface for Content document
export interface IContent extends Document {
  link: string;
  type: ContentType;
  title: string;
  tags: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
  description?: string;
  isPriority: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const contentSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    type: { type: String, enum: contentType, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: { type: String }, // Optional notes
    isPriority: { type: Boolean, default: false }, // High priority items
  },
  {
    timestamps: true, // Auto createdAt & updatedAt for organization
  }
);

// Create and export the model with proper typing
export const ContentModel: Model<IContent> = mongoose.models.content
  ? mongoose.model<IContent>('content')
  : mongoose.model<IContent>('content', contentSchema);

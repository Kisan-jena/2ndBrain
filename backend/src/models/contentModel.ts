import mongoose from "mongoose";

const contentType= [
    'image',
    'video', 
    'article', 
    'audio',
    'document',     // PDFs, Word docs, etc.  
    'note',         // Personal notes/thoughts      
    'bookmark',     // Simple bookmarks    
    'tweet',        // Twitter posts
    'youtube',      // YouTube videos
    'podcast',      // Podcast episodes 
    'code',         // Code snippets   
    'quote',        // Inspirational quotes
    'recipe',       // Cooking recipes      
    'book',         // Books/eBooks    
    'course',       // Online courses  
    'link',         // Generic links
    'presentation', // Slides, PPTs
    'tool',         // Software tools/apps    
    'research',     // Research papers         
    'news',          // News articles   
    'other'         // Miscellaneous content
]

const contentSchema=new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum:contentType, required: true },
    title: { type: String, required: true },
    tags: [{ type:mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    userId: { type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    
    description: { type: String }, // Optional notes
    isPriority: { type: Boolean, default: false }, // High priority items
}, {
    timestamps: true // Auto createdAt & updatedAt for organization
});

export const ContentModel=mongoose.models.content || mongoose.model("content",contentSchema);
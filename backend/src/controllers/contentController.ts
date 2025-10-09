import { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import type { ContentType } from '../models/contentModel';
import { ContentModel } from '../models/contentModel';
import { UserModel } from '../models/userModel';
import { TagModel } from '../models/tagModel';
import { HttpStatusCode, ResponseMessage } from '../types/enums';

// Create a proper UserRequest interface that extends Request
interface UserRequest extends Request {
  userId?: string ; // Match the auth middleware's definition
  body: {
    link?: string;
    type?: string;
    title?: string;
    tags?: string[];
    description?: string;
    isPriority?: boolean;
  };
}

// Content creation controller
const addContent = async (req: UserRequest, res: Response) => {
  try {
    const { link, type, title, tags, description, isPriority } = req.body;
    const userId = req.userId;
    console.log('USERID', userId);

    if (!userId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: ResponseMessage.UNAUTHORIZED,
      });
    }

    // Validate required fields
    if (!link || !type || !title) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: ResponseMessage.BAD_REQUEST,
        error: 'Link, type, and title are required fields',
      });
    }

    // find user in db
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    // Handle tags: find existing or create new ones
    let tagIds: mongoose.Types.ObjectId[] = [];

    if (tags && tags.length > 0) {
      for (const tagTitle of tags) {
        // Check if tag already exists (case-insensitive)
        let existingTag = await TagModel.findOne({
          title: { $regex: new RegExp(`^${tagTitle}$`, 'i') },
        });
        
        if (existingTag) {
        // Tag exists, use its ID
          tagIds.push(existingTag._id as mongoose.Types.ObjectId);
          console.log(`Found existing tag: ${tagTitle} with ID: ${existingTag._id}`);
        } else {
          // Tag doesn't exist, create new one
          const newTag = new TagModel({ title: tagTitle });
          const savedTag = await newTag.save();
          tagIds.push(savedTag._id as mongoose.Types.ObjectId);
          console.log(`Created new tag: ${tagTitle} with ID: ${savedTag._id}`);
        }
      }
    }

    // create content with proper typing
    const content = new ContentModel({
      link,
      type,
      title,
      tags: tagIds,
      description,
      isPriority,
      userId: new mongoose.Types.ObjectId(userId),
    });

    const savedContent = await content.save();

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: ResponseMessage.CONTENT_CREATED,
      data: savedContent,
    });

  } catch (error) {
    console.error('Content creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

// Get content for the authenticated user
const getContent = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.userId;
    console.log('USERID', userId);

    if (!userId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: ResponseMessage.UNAUTHORIZED,
      });
    }

    // find user in db
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    // fetch content for the user
    const content = await ContentModel.find({ userId: user._id }).populate("userId",'name email');

    return res.status(HttpStatusCode.OK).json({
      success: true,
      message: ResponseMessage.SUCCESS,
      data: content,
    });

  } catch (error) {
    console.error('Content retrieval error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

// Update existing content
const updateContent = async (req: UserRequest, res: Response) => {
  try {
    
  } catch (error) {
    console.error('Content update error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

// Delete content
const deleteContent = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.userId;
    const contentId = req.params.id; // DELETE http://localhost:3000/api/v1/content/64a1b2c3d4e5f6789012345
    console.log('USERID', userId);

    if (!userId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: ResponseMessage.UNAUTHORIZED,
      });
    }

    // find user in db
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    const deletedContent = await ContentModel.findOneAndDelete({
      userId: user._id,
      _id: contentId,
    });

    if (!deletedContent) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: ResponseMessage.CONTENT_NOT_FOUND,
      });
    }

    return res.status(HttpStatusCode.OK).json({
      success: true,
      message: ResponseMessage.CONTENT_DELETED,
      data: deletedContent,
    });
  } catch (error) {
    console.error('Content deletion error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

export { addContent, deleteContent, getContent, updateContent };

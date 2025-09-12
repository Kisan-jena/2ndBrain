import { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import type { ContentType } from '../models/contentModel';
import { ContentModel } from '../models/contentModel';
import { UserModel } from '../models/userModel';
import { HttpStatusCode, ResponseMessage } from '../types/enums';

// Create a proper UserRequest interface that extends Request
interface UserRequest extends Request {
  userId?: string ; // Match the auth middleware's definition
  body: {
    link?: string;
    type?: string;
    title?: string;
    tags?: mongoose.Types.ObjectId[];
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

    // create content with proper typing
    const content = new ContentModel({
      link,
      type,
      title,
      tags: tags || [],
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
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
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
    const content = await ContentModel.find({ userId: user._id }).exec();

    return res.status(HttpStatusCode.OK).json({
      success: true,
      message: ResponseMessage.SUCCESS,
      data: content,
    });
  } catch (error) {
    console.error('Content retrieval error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
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
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
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
   
  } catch (error) {
    console.error('Content deletion error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

export { addContent, deleteContent, getContent, updateContent };

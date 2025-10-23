import { TagModel } from '../models/tagModel';
import { type Request, type Response } from 'express';
import { HttpStatusCode, ResponseMessage } from '../types/enums';

const getAllTags = async (req: Request, res: Response) => {
    try {
        return res.status(HttpStatusCode.OK).json({
          success: true,
          message: ResponseMessage.SUCCESS,
          data: await TagModel.find(),
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
}

export {  getAllTags };

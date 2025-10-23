import { type Request, type Response } from 'express';
import { ContentModel } from '../models/contentModel';
import { LinkModel } from '../models/linksModel';
import { UserModel } from '../models/userModel';
import { HttpStatusCode, ResponseMessage } from '../types/enums';
import { createLink } from '../utils/createLink';

interface AuthenticatedRequest extends Request {
  userId?: string;
  body: {
    share: boolean;
  };
}

const createShareableLink = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      // share == true
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: ResponseMessage.UNAUTHORIZED,
      });
    }
    
    const { share } = req.body;
    if (share) {
      const link = createLink(20);
      console.log('link: ', link);

      const LinkContent = new LinkModel({
        userId: req.userId,
        hash: link,
      });

      const saveLink = await LinkContent.save();

      return res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: ResponseMessage.CREATED,
        data: saveLink,
      });
    } else {
      // share == false
      const delete_link = await LinkModel.deleteOne({ userId: req.userId });
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: 'Share disabled',
        data: delete_link,
      });
    }
  } catch (error) {
    console.error('error: ', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

const getSharedBrain = async (req: Request, res: Response) => {
  try {
    const { shareLink } = req.params;
    // const shareLink = req.params.shareLink;
    // console.log(shareLink);
    // console.log(req.params.sharelink);

    if (!shareLink) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Share link is required',
      });
    }

    // 1. Find the link document by hash
    const linkDoc = await(
      LinkModel as unknown as {
        findOne: (filter: {
          hash: string;
        }) => Promise<{ _id: string; hash: string; userId: string } | null>;
      }
    ).findOne({ hash: shareLink });

    if (!linkDoc) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: 'Invalid or expired share link',
      });
    }

    // 2. Get the user information
    const user = await UserModel.findById(linkDoc.userId).select('name email');

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    // 3. Get all content for this user
    const userContent = await ContentModel.find({ userId: linkDoc.userId })
      .populate('tags', 'title')
      .sort({ createdAt: -1 }); // Latest content first

    // 4. Return the shared brain data
    return res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Shared brain retrieved successfully',
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
        content: userContent,
        totalContent: userContent.length,
        sharedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error in getSharedBrain:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessage.INTERNAL_ERROR,
      error: errorMessage,
    });
  }
};

export { createShareableLink, getSharedBrain };

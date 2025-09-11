import { UserModel } from '../models/userModel'; // Adjust the path according to your project structure

const addContent = async (req: any, res: any) => {
  const userId = req.userId; // ✅ Get userId from middleware, not req.body
  console.log('USERID', userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
    }
    
    // find user in db
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

  // Your content creation logic here...
  res.json({
    success: true,
    message: `add content for user ${userId}`,
    userId: userId,
  });
};

const getContent = async (req: any, res: any) => {
  const userId = req.userId; // ✅ Get userId from middleware
  console.log('get content for user:', userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  // Your get content logic here...
  res.json({
    success: true,
    message: 'getContent',
    userId: userId,
  });
};

const updateContent = async (req: any, res: any) => {
  console.log('update content');
  res.json({ message: 'update content cont' });
};

const deleteContent = async (req: any, res: any) => {
  console.log('delete content');
  res.json({ message: 'delete content cont' });
};

export { addContent, deleteContent, getContent, updateContent };

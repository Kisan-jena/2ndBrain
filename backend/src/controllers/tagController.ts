import { TagModel } from '../models/tagModel';

const createTag = async (req: any, res: any) => {
    console.log('create tag controller');
    res.json({ message: 'create tag' });
}

const getAllTags = async (req: any, res: any) => {
    console.log('get all tags controller');
    res.json({ message: 'get all tags' });
}

export { createTag, getAllTags };

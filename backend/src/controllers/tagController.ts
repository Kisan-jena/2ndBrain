import { TagModel } from '../models/tagModel';

const createTag = async (req: any, res: any) => {
    console.log('create tag controller');
    console.log('Request body:', req.body);
}

const getAllTags = async (req: any, res: any) => {
    console.log('get all tags controller');
}


export { createTag, getAllTags}
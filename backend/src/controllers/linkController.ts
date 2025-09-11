import { LinkModel } from '../models/linksModel';
import crypto from 'crypto';

const createShareableLink = async (req: any, res: any) => {
    console.log('create shareable link controller');
    res.json({ message: 'create link' });
}

const getSharedBrain = async (req: any, res: any) => {
    console.log('get shared brain controller');
    res.json({ message: 'get shared brain' });
   
}

export { createShareableLink, getSharedBrain }
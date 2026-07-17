import { Request, Response } from 'express';
import { downloadMedia } from '../services/download.service';

export const downloadController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { mediaId } = req.body;

    const result = await downloadMedia(userId, mediaId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

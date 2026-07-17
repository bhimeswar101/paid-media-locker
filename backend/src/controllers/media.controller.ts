import { Request, Response } from "express";
import {
  uploadMedia,
  listMedia,
  getSingleMedia,
} from "../services/media.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, image, preview, price } = req.body;

    // 👇 ADD THESE LINES
    console.log("BODY RECEIVED:");
    console.log({
      title,
      image,
      preview,
      price,
    });

    const media = await uploadMedia(
      title,
      image,
      preview,
      price,
      (req as any).user.userId
    );

    res.status(201).json(media);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const media = await listMedia();

    res.json(media);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const media = await getSingleMedia(req.params.id as string);

    res.json(media);
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
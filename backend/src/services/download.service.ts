import { createDownload, findDownloadByUserAndMedia } from '../repositories/download.repository';
import { getMediaById } from './media.service';

export const downloadMedia = async (userId: string, mediaId: string) => {
  const media = await getMediaById(mediaId);
  const existing = await findDownloadByUserAndMedia(userId, mediaId);

  if (existing) {
    return { media, alreadyDownloaded: true };
  }

  const purchase = await createDownload({ userId, mediaId });
  return { media, purchase, alreadyDownloaded: false };
};

import prisma from "../utils/prisma";
export const createDownload = (data: { userId: string; mediaId: string }) => {
  return prisma.purchase.create({
    data: {
      userId: data.userId,
      mediaId: data.mediaId,
    },
  });
};

export const findDownloadByUserAndMedia = (userId: string, mediaId: string) => {
  return prisma.purchase.findUnique({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });
};

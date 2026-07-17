    import {
    findMedia,
    findUser,
    alreadyPurchased,
    deductCoins,
    createPurchase,
    createTransaction,
    findPurchasesByUser,
    } from "../repositories/purchase.repository";

    export const purchaseMedia = async (
    userId: string,
    mediaId: string
    ) => {
    // Check media exists
    const media = await findMedia(mediaId);

    if (!media) {
        throw new Error("Media not found");
    }

    // Check user exists
    const user = await findUser(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Check if already purchased
    const purchased = await alreadyPurchased(userId, mediaId);

    if (purchased) {
        throw new Error("Media already purchased");
    }

    // Check coins
    if (user.coins < media.price) {
        throw new Error("Insufficient coins");
    }

    // Deduct coins
    await deductCoins(userId, media.price);

    // Create purchase record
    const purchase = await createPurchase(userId, mediaId);

    // Create transaction
    await createTransaction(
        userId,
        media.price,
        `Purchased "${media.title}"`
    );

    return {
        success: true,
        message: "Purchase successful",
        purchase,
        remainingCoins: user.coins - media.price,
    };
    };

    export const getUserPurchases = async (userId: string) => {
    return findPurchasesByUser(userId);
    };
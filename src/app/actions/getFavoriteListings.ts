import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const favoriteIds = currentUser.favoriteIds;

        const favoriteListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...favoriteIds]
                }
            }
        })

        const safeFavoriteListings = favoriteListings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeFavoriteListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
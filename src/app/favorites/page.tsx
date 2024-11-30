import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const favoriteLisitngsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />
    }

    const favorites = await getFavoriteListings();

    if (favorites.length === 0) {
        return (
            <EmptyState 
                title="No favorite properties found" 
                subtitle="You haven't liked any property yet" 
            />
        )
    }

    return (
        <FavoritesClient 
            favorites={favorites}
            currentUser={currentUser}
        />
    )
}

export default favoriteLisitngsPage;
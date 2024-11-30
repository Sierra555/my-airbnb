import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

type IParams = {
    params: {listingId?: string}
}

const ListingPage = async ({ params }: IParams) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if(!listing) {
        return (
           <EmptyState />
        );
    }
    
    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
         />
    );
};

export default ListingPage;
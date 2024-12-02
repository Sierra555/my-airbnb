import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

type IParams = Promise<{
   listingId?: string
}>

const ListingPage = async ({ params }: { params: IParams }) => {
    const listingIdParam = await params;
    const listing = await getListingById(listingIdParam);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(listingIdParam);

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
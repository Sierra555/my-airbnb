'use client';

import { useRouter } from "next/navigation";
import { Container, Heading } from "../components";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

type ReservationsClientProps = {
    reservations?: SafeReservation[],
    currentUser?: SafeUser | null,
}

const ReservationsClient = ({ reservations, currentUser }: ReservationsClientProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeleteId(id);

        try {
            await axios.delete(`/api/reservations/${id}`)
            toast.success("Reservation was cancelled");
            router.refresh();
        } catch (error: any) {
            toast.error(`Something went worng: ${error}`)
        } finally {
            setDeleteId('');
        }
    }, [router]);

  return (
    <Container>
      <Heading 
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
      ">
        {reservations?.map((reservation) => (
            <ListingCard 
                key={reservation.id}
                data={reservation.listing} 
                reservation={reservation} 
                actionId={reservation.id}
                actionlabel="Cancel guest reservation"
                onAction={onCancel}
                disabled={deleteId === reservation.id}
                currentUser={currentUser}
            />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
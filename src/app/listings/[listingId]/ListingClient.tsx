'use client';

import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Container } from '@/app/components';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import { categories } from '@/app/constants';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser, SafeReservation } from '@/app/types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

type ListingClientProps = {
    reservations?: SafeReservation[],
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser?: SafeUser | null,
}

const ListingClient = ({ reservations = [], listing, currentUser } : ListingClientProps) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = []; 
            
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
             });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            setIsLoading(true);

            await axios.post('/api/reservations', {
                totalPrice: totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                userId: currentUser?.id,
                listingId: listing?.id
           });

           toast.success('Reserved');
           setDateRange(initialDateRange);
           router.refresh();
        } catch {
            toast.error('Not reserved');
        } finally {
            setIsLoading(false);
        }

    },[dateRange, totalPrice, listing?.id, currentUser, loginModal, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
       
       const totalDays = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
        );

        if (totalDays && listing?.price) {
            setTotalPrice(totalDays * listing.price);
        } else {
            setTotalPrice(listing.price);
        }
    } 
    },[dateRange, listing?.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className="flex flex-col gap-6">
                <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    "
                >
                    <ListingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        guestCount={listing.guestCount}
                        locationValue={listing.locationValue}
                    />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation 
                            price={listing.price}
                            totalPrice={totalPrice}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            onChangeDate={(value) => setDateRange(value)}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  );
};

export default ListingClient;

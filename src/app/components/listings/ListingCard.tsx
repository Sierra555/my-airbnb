'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "../Button";

type ListingCardProps = {
    data: SafeListing,
    reservation?: SafeReservation,
    onAction?: (id: string) => void,
    disabled?: boolean,
    actionlabel?: string,
    actionId?: string,
    currentUser?: SafeUser | null,
}
const ListingCard = ({ data, reservation, onAction, actionlabel, actionId = '', disabled, currentUser } : ListingCardProps) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location= getByValue(data.locationValue);

    const handleCancel = useCallback((
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
        onAction?.(actionId);

    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;

    }, [reservation, reservation?.startDate, reservation?.endDate]);

  return (
    <div 
        className="col-span-1 cursor-pointer group"
        onClick={() => router.push(`/listings/${data.id}`)}
        aria-label={`Go to your lisitng - ${data.title}`}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
            group-hover:scale-110
            transition
        ">
            <Image 
                fill
                alt='Listing'
                src={data.imageSrc}
                className="
                    object-cover
                    h-full
                    w-full
                "
                sizes="80vw"
                />
            <div className="absolute top-3 right-3">
                <HeartButton 
                    listingId={data.id}
                    listingTitle={data.title}
                    currentUser={currentUser}
                />
            </div>
        </div>
        <p className="font-semibold text-lg">
            {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500">
            {reservationDate || data.category}
        </p>
        <div className="flex items-center gap-1">
            <p className="font-semibold">
                $ {price}
            </p>
            {!reservation && (
                <p className="font-light">per night</p>
            )}
        </div>
        {onAction && actionlabel && (
            <Button
                disabled={disabled}
                small
                label={actionlabel}
                handleClick={handleCancel}
            />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
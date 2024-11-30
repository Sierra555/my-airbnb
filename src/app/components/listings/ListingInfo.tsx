'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Map from "../map/DynamicMap";

type ListingInfoProps = {
    user: SafeUser,
    category: {
        label: string,
        icon: IconType,
        description: string
    } | undefined,
    description: string,
    roomCount: number,
    bathroomCount: number,
    guestCount: number,
    locationValue: string,
}
const ListingInfo = ({ user, category, description, roomCount, bathroomCount, guestCount, locationValue }: ListingInfoProps) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold flex items-center gap-2">
                <p>Hosted by {user?.name}</p>
                <Avatar src={user?.image} />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <p>{guestCount} guests</p>
                <p>{roomCount} rooms</p>
                <p>{bathroomCount} bathrooms</p>
            </div>
            <hr />
                {category && (
                    <ListingCategory 
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )}
                <hr />
                <p className="text-lg font-light text-neutral-500">
                    {description}
                </p>
                <hr /> 
                <Map center={coordinates} />
        </div>
    </div>
  );
};

export default ListingInfo;
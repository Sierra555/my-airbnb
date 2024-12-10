'use client';

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type HeartButtonProps = {
    listingId: string,
    listingTitle?: string,
    currentUser?: SafeUser| null,
}
const HeartButton = ({ listingId, listingTitle, currentUser} : HeartButtonProps) => {
    const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser });

  return (
    <button
        onClick={toggleFavorite}
        className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
            p-5
        "
        aria-label={listingTitle ? `Add ${listingTitle} to favorites` : 'Add the property to favorites'}
    >
        <AiOutlineHeart
        size={28}
        className="
            fill-white
            absolute
            -top-[2px]
            -right-[2px]
            z-10
        "
        />
        <AiFillHeart
        size={24}
        className={`
            ${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} 
            absolute
            -top-[1px]
            -right-[1px]
       `} 
        />
    </button>
  );
};

export default HeartButton;
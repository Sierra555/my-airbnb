import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

type useFavoriteProps = {
    listingId: string,
    currentUser?: SafeUser | null,
}

const useFavorite = ({ listingId, currentUser }: useFavoriteProps) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId])
    
    const toggleFavorite = useCallback( async (
        e: React.MouseEvent<HTMLElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            toast.success('Success')
            router.refresh();
        } catch (error) {
            toast.error(`Something went wrong: ${error}`)
        }
    }, [currentUser, listingId, hasFavorited, loginModal, router])

    return { hasFavorited, toggleFavorite } 
};

export default useFavorite;
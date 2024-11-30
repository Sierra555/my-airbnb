import { RefObject, useEffect } from "react";

export default function useClickOutside( refs: RefObject<HTMLElement>[], callback: () => void) {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            const isOutside = refs?.every(ref => ref.current && !ref.current.contains(event.target as Node));

            if (isOutside) {
                callback();
            } else return;
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        }
    
    }, [refs, callback])
}
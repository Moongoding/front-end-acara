import { useRef } from "react";
import { set } from "react-hook-form";

const useDoubounce = () => {
    const doubounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const doubounce = (func: Function, delay: number) => {
        if (doubounceTimeout.current) clearTimeout(doubounceTimeout.current);
        doubounceTimeout.current = setTimeout(() => {
            func();
            doubounceTimeout.current = null;
        }, delay);
    };
    return doubounce;
};

export default useDoubounce;
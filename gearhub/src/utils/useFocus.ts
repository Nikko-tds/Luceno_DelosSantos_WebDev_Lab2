import { useRef, useEffect, use } from "react";

export const useFocus = () => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return ref;
};
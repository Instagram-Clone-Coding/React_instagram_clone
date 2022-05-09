import React, { useEffect } from "react";

const useOutsideClick = (ref: React.RefObject<any>, setter: Function) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // 상단바에서 Link 의 클릭을 우선시 하기 위해 처리
                setTimeout(() => {
                    setter(false);
                }, 0);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setter]);
};

export default useOutsideClick;

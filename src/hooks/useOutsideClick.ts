import React, { useEffect } from "react";

const useOutsideClick = (
    ref: React.RefObject<any>,
    setter: Function,
    trigger?: React.RefObject<any>,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (trigger?.current.contains(event.target as Node)) {
                // event 발생시킨 요소가 trigger에 속한다면, 외부에 클릭한 거로 여기지 않음
                // 즉, event는 외부클릭 | trigger 클릭으로 나눌 수 있음
                // 여기서는 event 외부클릭을 처리하고,
                // trigger클릭은 각 컴포넌트에서 onClick으로 처리하기위해, return;으로 종료함
                return;
            }
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

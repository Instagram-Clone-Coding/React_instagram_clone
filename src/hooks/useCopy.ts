import { homeActions } from "app/store/ducks/home/homeSlice";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { useAppDispatch } from "app/store/Hooks";

const useCopy = (copyValue: string) => {
    const dispatch = useAppDispatch();
    return () => {
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }
        const textarea = document.createElement("textarea");
        textarea.value = copyValue;
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        // 포지션을 주지 않으면 복사 시 스크롤이 하단으로 이동

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        dispatch(modalActions.resetModal());
        dispatch(homeActions.notificateIsCopied());
        setTimeout(
            () => dispatch(homeActions.closeIsCopiedNotification()),
            8500,
        );
    };
};

export default useCopy;

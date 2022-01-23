const useCopy = (copyValue: string) => {
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
        // notification root 작성 후 복사 여부 알려주기
        // dispatch(notificationActions.appear())
    };
};

export default useCopy;

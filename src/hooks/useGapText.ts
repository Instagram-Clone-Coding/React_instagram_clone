const useGapText = (createdAt: string): string => {
    const gap = Date.now() - Date.parse(createdAt);
    if (gap >= 604800000) {
        return `${Math.floor(gap / 604800000)}주 전`;
    } else if (gap >= 86400000) {
        return `${Math.floor(gap / 86400000)}일 전`;
    } else if (gap >= 3600000) {
        return `${Math.floor(gap / 3600000)}시간 전`;
    } else if (gap >= 60000) {
        return `${Math.floor(gap / 60000)}분 전`;
    } else {
        return "방금 전";
    }
};

export default useGapText;

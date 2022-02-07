const useGapText = (createdAt: string): string => {
    const gap = Date.now() - Date.parse(createdAt);
    if (gap >= 604800000) {
        return `${Math.floor(gap / 604800000)}주`;
    } else if (gap >= 86400000) {
        return `${Math.floor(gap / 86400000)}일`;
    } else if (gap >= 3600000) {
        return `${Math.floor(gap / 3600000)}시간`;
    } else if (gap >= 60000) {
        return `${Math.floor(gap / 60000)}분`;
    } else {
        return "방금";
    }
};

export default useGapText;

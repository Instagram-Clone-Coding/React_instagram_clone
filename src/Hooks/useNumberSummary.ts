const MILLION = 1000000;
const THOUSAND: number = 1000;

const useNumberSummary = (num: number): string => {
    if (num > MILLION * 100) {
        return `${Math.floor(num / MILLION)}백만`; // 123백만
    } else if (num > MILLION) {
        return `${Math.floor((num / MILLION) * 10) / 10}백만`; // 1.2백만, 12.4백만
    } else if (num > THOUSAND * 100) {
        return `${Math.floor(num / THOUSAND)}천`; // 123천
    } else if (num > THOUSAND * 10) {
        return `${Math.floor((num / THOUSAND) * 10) / 10}천`; // 12.4천
    } else {
        return `${num}`; // 그냥 수
    }
};
export default useNumberSummary;

import { AxiosResponse } from "axios";
import { authorizedCustomAxios } from "customAxios";

const fetchProfile = (query: string) => {
    let profile: Profile.HashTagProfileType | null = null;
    const suspender = authorizedCustomAxios(`/hashtags/${query}`).then(
        (res: AxiosResponse<{ data: Profile.HashTagProfileType }>) => {
            profile = res.data.data;
        },
    );
    return {
        read() {
            if (profile === null) {
                throw suspender;
            } else {
                return profile;
            }
        },
    };
};

const fetchArticle = (query: string) => {
    // hashtag 게시물 정보
};

const fetchData = (query: string) => {
    return {
        profile: fetchProfile(query),
        // post: await fetchArticle(query),
    };
};

export default fetchData;

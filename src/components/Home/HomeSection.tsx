import { getHomeArticles } from "app/store/ducks/home/homThunk";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { useEffect } from "react";
import Article from "./Article";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NDE1MzgzNTR9.B6dvSBPWdWDdwBS2Gj66gmkuKCOKirfWIL5ICR0RBzOOO3MARc3zhTXO8aDYIFM71D5jBESW796LISjfFxL9Qw",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNCIsImV4cCI6MTY0MjE0MjU1NH0.p78ZtsJSiR-Mtnii_Zl1GnfToG79TiGHZR_asyjUdZ2YKAhNTbKMm-q1Dl-KICIRTf6mgpKrtO_OH5F3hoySiA",
};
const page = 1;
const size = 5;

const HomeSection = () => {
    const { articles, isLoading } = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(
                getHomeArticles({ token: token.accessToken, page, size }),
            );
        };
        fetchData();
    }, [dispatch]);
    return (
        <section>
            {isLoading ||
                articles.map((article, index) => (
                    <Article
                        key={article.postId}
                        article={article}
                        isObserving={articles.length - 4 === index}
                    />
                ))}
        </section>
    );
};

export default HomeSection;

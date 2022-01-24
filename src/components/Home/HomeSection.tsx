import { getHomeArticles } from "app/store/ducks/home/homThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ExtraLoadingCircle from "components/Home/ExtraLoadingCircle";
import { useEffect } from "react";
import Article from "./Article";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MjQxODcxMH0.a54MJzWdP3Mjs1yXG33v7ti0SpHcN7IzqfwQ9nFdVSjmhriTcFA_tc5yHFWyLA_PRCH3A_TUk0WPRQ_0dEacjw",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjQyNzQxNDY4fQ.8mHe22G6uu6F_HB-5G8A7voUNLb5oRAuX84xlKWFUZeccsi_Y3DHMh1fC7w3uEG3UATvNc5U9PBPvF6hW1vpZw",
};

const HomeSection = () => {
    const { articles, isLoading, isExtraArticleLoading } = useAppSelector(
        (state) => state.home,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getHomeArticles({ token: token.accessToken }));
        };
        fetchData();
        console.log("effect is occur");
    }, [dispatch]);

    return (
        <section>
            {isLoading ||
                articles.map((article, index) => (
                    <Article
                        key={article.postId}
                        article={article}
                        isObserving={articles.length - 4 === index}
                        isLast={articles.length - 1 === index}
                    />
                ))}
            {isExtraArticleLoading && <ExtraLoadingCircle />}
        </section>
    );
};

export default HomeSection;

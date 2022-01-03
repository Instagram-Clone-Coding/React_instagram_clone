import { homeActions } from "app/store/ducks/home/homeSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { useEffect } from "react";
import Article from "./Article";

const HomeSection = () => {
    const articles = useAppSelector((state) => state.home.articles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(homeActions.getArticles());
    }, [dispatch]);

    return (
        <section>
            {articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </section>
    );
};

export default HomeSection;

import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppSelector } from "app/store/Hooks";
import Article from "components/Common/Article/Article";
import LargerArticle from "components/Common/Article/ArticleAlone/LargerArticle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledArticleAlone = styled.div`
    width: 100%;
`;

const ArticleAlone = () => {
    const article = useAppSelector((state) => state.paragraph.articleObj);
    const dispatch = useDispatch();
    const [isMobileWidth, setIsMobileWidth] = useState(
        window.innerWidth <= 735,
    );

    useEffect(() => {
        const resizeEventHandler = () =>
            setIsMobileWidth(window.innerWidth <= 735);
        window.addEventListener("resize", resizeEventHandler);

        return () => {
            window.removeEventListener("resize", resizeEventHandler);
        };
    }, []);

    const indexChangeHandler = (index: number) => {
        dispatch(paragraphActions.changeCurrentIndex(index));
    };

    return (
        <StyledArticleAlone>
            {isMobileWidth ? (
                <Article
                    article={article}
                    isObserving={false}
                    onChangeIndex={indexChangeHandler}
                />
            ) : (
                <LargerArticle
                    article={article}
                    onChangeIndex={indexChangeHandler}
                />
            )}
        </StyledArticleAlone>
    );
};

export default ArticleAlone;

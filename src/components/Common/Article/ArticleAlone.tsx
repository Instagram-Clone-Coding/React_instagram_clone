import { useAppSelector } from "app/store/Hooks";
import Article from "components/Common/Article/Article";
import LargerArticle from "components/Common/Article/LargerArticle";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledArticleAlone = styled.article`
    /* width: 736px; */
`;

const ArticleAlone = () => {
    const article = useAppSelector((state) => state.paragraph.articleObj);
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

    return (
        <StyledArticleAlone>
            {isMobileWidth ? (
                <Article article={article} isObserving={false} />
            ) : (
                <LargerArticle article={article} />
            )}
        </StyledArticleAlone>
    );
};

export default ArticleAlone;

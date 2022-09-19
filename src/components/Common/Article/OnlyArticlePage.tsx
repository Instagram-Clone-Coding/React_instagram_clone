import { useAppSelector } from "app/store/Hooks";
import LargerArticle from "components/Common/Article/LargerArticle";
import Article from "components/Home/Article";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledOnlyArticlePage = styled.article`
    /* width: 736px; */
`;

const OnlyArticlePage = () => {
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
        <StyledOnlyArticlePage>
            {isMobileWidth ? (
                <Article article={article} isObserving={false} />
            ) : (
                <LargerArticle article={article} />
            )}
        </StyledOnlyArticlePage>
    );
};

export default OnlyArticlePage;

import { useAppSelector } from "app/store/Hooks";
import Article from "components/Home/Article";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledOnlyArticlePage = styled.article``;

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

    console.log(article);
    return (
        <StyledOnlyArticlePage>
            {isMobileWidth ? (
                <Article article={article} isObserving={false} />
            ) : (
                <div>Hello</div>
            )}
        </StyledOnlyArticlePage>
    );
};

export default OnlyArticlePage;

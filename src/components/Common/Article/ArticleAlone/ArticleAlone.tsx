import { useAppSelector } from "app/store/Hooks";
import Article from "components/Common/Article/Article";
import LargerArticle from "components/Common/Article/ArticleAlone/LargerArticle";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledArticleAlone = styled.div`
    width: 100%;
`;

interface ArticleAloneProps {
    isModal?: boolean;
}

const ArticleAlone = ({ isModal = false }: ArticleAloneProps) => {
    const article = useAppSelector(({ paragraph }) => paragraph.articleObj);
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
                <Article
                    article={article}
                    isObserving={false}
                    isModal={isModal}
                />
            ) : (
                <LargerArticle article={article} isModal={isModal} />
            )}
        </StyledArticleAlone>
    );
};

export default ArticleAlone;

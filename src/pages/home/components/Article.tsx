import styled from "styled-components";
import Card from "UI/Card/Card";

const ArticleCard = styled(Card)``;

const Article = ({ article }: any) => {
    return (
        <ArticleCard>
            <header>{article.owner.username}</header>
        </ArticleCard>
    );
};

export default Article;

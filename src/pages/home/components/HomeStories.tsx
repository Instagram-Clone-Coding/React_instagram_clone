import styled from "styled-components";
import Card from "UI/Card/Card";

const StoriesCard = styled(Card)`
    padding: 16px 0;
    margin-bottom: 24px;
`;

const HomeStories = () => {
    return <StoriesCard>Stories</StoriesCard>;
};

export default HomeStories;

import { useAppSelector } from "app/store/Hooks";
import styled from "styled-components";

const StyledOnlyArticlePage = styled.article``;

const OnlyArticlePage = () => {
    const post = useAppSelector((state) => state.post);
    console.log(post);

    return <StyledOnlyArticlePage>{post.postId}</StyledOnlyArticlePage>;
};

export default OnlyArticlePage;

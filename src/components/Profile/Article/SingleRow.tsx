import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SingleContent from "./SingleContent";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { getExtraPosts } from "app/store/ducks/profile/profileThunk";
import { useParams } from "react-router-dom";
import useOnView from "hooks/useOnView";
import { v4 as uuidv4 } from "uuid";

const SingleRowContainer = styled.div`
    display: flex;
    gap: 3px;
    @media (min-width: 736px) {
        gap: 4px;
    }
    & > .emptyLayout {
        flex: 1;
    }
`;

interface SingleRowProps {
    posts: Profile.PostType[];
    isObserving: boolean;
    isLinkToParagraph?: boolean;
}

const SingleRow = ({
    posts,
    isObserving,
    isLinkToParagraph = false,
}: SingleRowProps) => {
    const dispatch = useAppDispatch();
    const extraPostPage = useAppSelector(
        (state) => state.profile.extraPostPage,
    );
    const { username } = useParams<{ username: string }>();
    const postRef = useRef<HTMLDivElement>(null);

    const isVisible = useOnView(postRef);

    useEffect(() => {
        const dispatchExtraPost = async () => {
            try {
                await dispatch(
                    getExtraPosts({
                        page: extraPostPage + 1,
                        username,
                    }),
                );
            } catch (error) {
                console.log(error);
            }
        };

        isObserving && isVisible && dispatchExtraPost(); // 이 때 비동기 작업 및 무한 스크롤
        // isLast && isVisible && dispatchExtraArticle();
    }, [isObserving, isVisible, dispatch]);
    return (
        <SingleRowContainer ref={postRef}>
            {posts.map((post) =>
                post ? (
                    <SingleContent
                        key={post.postId}
                        post={post}
                        isLinkToParagraph={isLinkToParagraph}
                    />
                ) : (
                    <div className="emptyLayout" key={uuidv4()}></div>
                ),
            )}
        </SingleRowContainer>
    );
};

export default SingleRow;

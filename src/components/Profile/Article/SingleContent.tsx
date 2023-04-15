import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Slide } from "assets/Svgs/slide.svg";
import sprite from "assets/Images/sprite4.png";
import ImageSprite from "components/Common/ImageSprite";
import { useAppDispatch } from "app/store/Hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { useHistory } from "react-router-dom";

const SingleContentContainer = styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    max-width: 309px;
    flex: 1;
    svg {
        position: absolute;
        right: 0;
        top: 0;
        margin: 7px;
    }

    img {
        object-fit: cover;
    }

    .hover {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
            display: flex;

            li {
                margin: 30px;
                display: flex;
                span {
                    margin-left: 6px;
                    font-weight: 600;
                    color: white;
                }
            }
        }
    }

    img,
    & > .hover {
        width: 100%;
        aspect-ratio: 1 / 1;
    }
`;

interface SingleContentProps {
    post: Profile.PostType;
    isLinkToParagraph?: boolean;
}

const heartImage: CommonType.ImageProps = {
    width: 19,
    height: 19,
    position: `-340px -333px`,
    url: sprite,
};
const commentImage: CommonType.ImageProps = {
    width: 19,
    height: 19,
    position: `-382px -333px`,
    url: sprite,
};

const SingleContent = ({
    post,
    isLinkToParagraph = false,
}: SingleContentProps) => {
    const [hoverd, setHoverd] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const contentClickHandler = () => {
        if (isLinkToParagraph) return history.push(`/p/${post.postId}`);
        return dispatch(
            modalActions.startArticleAloneModal({ postId: post.postId }),
        );
    };

    return (
        <SingleContentContainer
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                setHoverd(true);
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                setHoverd(false);
            }}
            onClick={contentClickHandler}
        >
            {post.hasManyPostImages && <Slide />}
            <img
                src={post.postImage.postImageUrl}
                alt={post.postImage.altText}
                className="single-content"
            />
            {hoverd && (
                <div className={hoverd ? "hover" : ""}>
                    <ul>
                        <li>
                            <ImageSprite {...heartImage} />
                            <span>{post.postLikesCount}</span>
                        </li>
                        <li>
                            <ImageSprite {...commentImage} />
                            <span>{post.postCommentsCount}</span>
                        </li>
                    </ul>
                </div>
            )}
        </SingleContentContainer>
    );
};

export default SingleContent;

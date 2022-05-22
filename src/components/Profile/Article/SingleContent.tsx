import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Slide } from "assets/Svgs/slide.svg";
import sprite from "assets/Images/sprite4.png";
import ImageSprite from "components/Common/ImageSprite";

const SingleContentContainer = styled.div`
    margin-right: 30px;
    position: relative;
    cursor: pointer;

    svg {
        position: absolute;
        right: 0;
        top: 0;
        margin: 7px;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .hover {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
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

    @media (min-width: 736px) {
        margin-right: 30px;

        &:last-child {
            margin-right: 0px;
        }

        img {
        }

        img:last-child {
        }
    }
`;

interface SingleContentContainer {
    post: Profile.PostType;
}

const heartImage: Common.ImageProps = {
    width: 19,
    height: 19,
    position: `-340px -333px`,
    url: sprite,
};
const commentImage: Common.ImageProps = {
    width: 19,
    height: 19,
    position: `-382px -333px`,
    url: sprite,
};

const SingleContent = ({ post }: SingleContentContainer) => {
    const [hoverd, setHoverd] = useState<boolean>(false);
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
        >
            {post.hasManyPosts && <Slide />}
            <img
                src={post.postImages.postImageUrl}
                alt={post.postImages.altText}
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

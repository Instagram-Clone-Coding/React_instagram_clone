import ImgHashTagAvatar from "components/Home/Article/ArticleImgSlider/ImgHashTagAvatar";
import ImgHashTagUsername from "components/Home/Article/ArticleImgSlider/ImgHashTagUsername";
import React, { useState } from "react";
import styled from "styled-components";

const StyledArticleImgSliderUnit = styled.div`
    width: 100%;
    scroll-snap-align: center;
    position: relative;
    & > .avatar {
        position: absolute;
        bottom: 0;
        left: 0;
    }
    & > a {
    }
    & > img {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 614px;
        @media (max-width: 1000px) {
            max-width: 600px;
        }
    }

    &.containImgHashTags {
        cursor: pointer;
    }
`;

const ArticleImgSliderUnit = ({
    imageDTO,
}: {
    imageDTO: HomeType.PostImageDTOProps;
}) => {
    const [isAvatarOn, setIsAvatarOn] = useState(false);
    const [isImgHashTagsOn, setIsImgHashTagOn] = useState<boolean | null>(null);
    const [timeoutId, setTimeoutId] =
        useState<null | ReturnType<typeof setTimeout>>(null);

    const onClickHandler = () => {
        if (!isAvatarOn) {
            setIsAvatarOn(true);
            setIsImgHashTagOn(true);
        } else if (!isImgHashTagsOn) {
            setIsImgHashTagOn(true);
        } else if (isImgHashTagsOn) {
            setIsImgHashTagOn(false);
        }
        setTimeoutId(null);
    };

    const differentiateClickEvents = () => {
        if (timeoutId === null) {
            setTimeoutId(setTimeout(onClickHandler, 500));
        } else {
            setTimeoutId(null);
            clearTimeout(timeoutId);
        }
    };

    const imgDoubleClickHandler = (): void => {
        if (!isAvatarOn) {
            setIsAvatarOn(true);
        }
    };

    return (
        <StyledArticleImgSliderUnit
            onClick={differentiateClickEvents}
            onDoubleClick={imgDoubleClickHandler}
            className={imageDTO.postTagDTOs ? "containImgHashTags" : ""}
        >
            <div className="avatar">
                {imageDTO.postTagDTOs && isAvatarOn && <ImgHashTagAvatar />}
            </div>
            {imageDTO.postTagDTOs &&
                isAvatarOn &&
                imageDTO.postTagDTOs.map((postTagDTO) => (
                    <ImgHashTagUsername
                        key={postTagDTO.id}
                        postTagDTO={postTagDTO}
                        isImgHashTagsOn={isImgHashTagsOn}
                    />
                ))}
            <img src={imageDTO.postImageUrl} alt={imageDTO.postImageUrl} />
        </StyledArticleImgSliderUnit>
    );
};

export default ArticleImgSliderUnit;

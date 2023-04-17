import ImgHashTagAvatar from "components/Common/Article/ArticleImgSlider/ImgHashTagAvatar";
import ImgHashTagUsername from "components/Common/Article/ArticleImgSlider/ImgHashTagUsername";
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
    }

    &.containImgHashTags {
        cursor: pointer;
    }
`;

interface ArticleImgSliderUnitProps {
    imageDTO: CommonType.PostImageDTOProps;
    unitWidth: number;
}

const ArticleImgSliderUnit = ({
    imageDTO,
    unitWidth,
}: ArticleImgSliderUnitProps) => {
    const [isAvatarOn, setIsAvatarOn] = useState(false);
    const [isImgHashTagsOn, setIsImgHashTagOn] = useState<boolean | null>(null);
    const [timeoutId, setTimeoutId] = useState<null | ReturnType<
        typeof setTimeout
    >>(null);

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
            className={imageDTO.postTags ? "containImgHashTags" : ""}
        >
            <div className="avatar">
                {imageDTO.postTags && isAvatarOn && <ImgHashTagAvatar />}
            </div>
            {imageDTO.postTags &&
                isAvatarOn &&
                imageDTO.postTags.map((postTag) => (
                    <ImgHashTagUsername
                        key={postTag.id}
                        postTagDTO={postTag}
                        isImgHashTagsOn={isImgHashTagsOn}
                    />
                ))}
            <img
                src={imageDTO.postImageUrl}
                alt={imageDTO.postImageUrl}
                width={unitWidth}
            />
        </StyledArticleImgSliderUnit>
    );
};

export default ArticleImgSliderUnit;

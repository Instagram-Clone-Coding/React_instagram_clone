import StoryCircle from "components/Common/StoryCircle";
import React, { useState } from "react";
import styled from "styled-components";
import HoverModal from "../Modals/HoverModal";
import Username from "../Username";

const StyledArticleHeader = styled.header`
    height: 60px;
    padding: 16px;
    display: flex;
    align-items: center;
    position: relative;

    .header-content {
        margin-left: 14px;
        flex: 1;
        div:nth-child(2) {
            font-size: 12px;
            line-height: 15px;
            cursor: pointer;
        }
    }
    .header-dots {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

const HEADER_STORY_CIRCLE = 42 / 64;

const ArticleHeader = ({ article }: ArticleProps) => {
    const [isModalActivated, setIsModalActivated] = useState(false);
    const [modalPositionObj, setModalPositionObj] = useState<DOMRect>();

    const mouseEnterHandler = (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>
    ) => {
        console.log("enter");
        setModalPositionObj(event?.currentTarget.getBoundingClientRect());
        setIsModalActivated(true);
    };

    const mouseLeaveHandler = () => {
        console.log("leave");
        setIsModalActivated(false);
    };

    return (
        <StyledArticleHeader>
            {isModalActivated && (
                <HoverModal
                    username={article.owner.username}
                    modalPosition={modalPositionObj}
                    onMouseEnter={() => setIsModalActivated(true)}
                    onMouseLeave={() => setIsModalActivated(false)}
                />
            )}
            <StoryCircle
                type="unread" // 백엔드 소통하여 읽었는지 여부 확인
                avatarUrl={article.owner.avatarUrl}
                username={article.owner.username}
                scale={HEADER_STORY_CIRCLE}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            />
            <div className="header-content">
                <Username
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                >
                    {article.owner.username}
                </Username>
                <div>{article.location}</div>
            </div>
            <div className="header-dots">
                <svg
                    aria-label="옵션 더 보기"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6.5" cy="12" r="1.5"></circle>
                    <circle cx="17.5" cy="12" r="1.5"></circle>
                </svg>
            </div>
        </StyledArticleHeader>
    );
};

export default React.memo(ArticleHeader);

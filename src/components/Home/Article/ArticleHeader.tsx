import StoryCircle from "components/Common/StoryCircle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArticleMenuModal from "../Modals/ArticleMenuModal";
import FollowingModal from "../Modals/FollowingModal";
import HoverModal from "../Modals/HoverModal";
import Username from "../Username";

const StyledArticleHeader = styled.header`
    height: 60px;
    padding: 16px;
    display: flex;
    align-items: center;
    position: relative;

    .header-content {
        flex: 1;
        margin-left: 14px;
        a {
            text-decoration: none;
            display: block;
        }
        & > a {
            font-size: 12px;
            line-height: 15px;
            cursor: pointer;
        }
        & > .header-mainContent {
            display: flex;
        }
        .header-followBox {
            & > span {
                margin: 0 4px;
            }
            & > button {
                margin-left: 2px;
                color: ${(props) => props.theme.color.blue};
            }
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
    const [isHoverModalActivated, setIsHoverModalActivated] = useState(false);
    const [isDotModalActivated, setIsDotModalActivated] = useState(false);
    const [isReportModalActivated, setIsReportModalActivated] = useState(false);
    const [isFollowingModalActivated, setIsFollowingModalActivated] =
        useState(false);
    const [modalPositionObj, setModalPositionObj] = useState<DOMRect>();
    const [isFollowing, setIsFollowing] = useState(false); // followingModal의 isFollowing과 연결할 것

    const mouseEnterHandler = (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>
    ) => {
        setModalPositionObj(event?.currentTarget.getBoundingClientRect());
        setIsHoverModalActivated(true);
    };

    const mouseLeaveHandler = () => {
        setIsHoverModalActivated(false);
    };

    const followHandler = () => {
        // follow
        setIsFollowing(true);
    };

    const unfollowHandler = () => {
        // unfollow하기 전에 modal에서 재차 확인
        setIsFollowingModalActivated(true);
    };

    return (
        <StyledArticleHeader>
            {isHoverModalActivated && (
                <HoverModal
                    isFollowing={isFollowing}
                    onFollowChange={(a: boolean) => setIsFollowing(a)}
                    username={article.owner.username}
                    modalPosition={modalPositionObj}
                    onMouseEnter={() => setIsHoverModalActivated(true)}
                    onMouseLeave={() => setIsHoverModalActivated(false)}
                    onFollowingModalOn={() =>
                        setIsFollowingModalActivated(true)
                    }
                />
            )}
            {isFollowing && isFollowingModalActivated && (
                <FollowingModal
                    onUnfollow={() => setIsFollowing(false)}
                    onModalOn={() => setIsFollowingModalActivated(true)}
                    onModalOff={() => setIsFollowingModalActivated(false)}
                    username={article.owner.username}
                    avatarUrl={article.owner.avatarUrl}
                />
            )}
            {isDotModalActivated && (
                <ArticleMenuModal
                    isFollowing={isFollowing}
                    onUnfollow={unfollowHandler}
                    onModalOn={() => setIsDotModalActivated(true)}
                    onModalOff={() => setIsDotModalActivated(false)}
                    onReportModalOn={() => setIsReportModalActivated(true)}
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
                <div className="header-mainContent">
                    <Username
                        onMouseEnter={mouseEnterHandler}
                        onMouseLeave={mouseLeaveHandler}
                    >
                        <Link to={`/${article.owner.username}`}>
                            {article.owner.username}
                        </Link>
                    </Username>
                    {!isFollowing && (
                        <div className="header-followBox">
                            <span>•</span>
                            <button onClick={followHandler}>팔로우</button>
                        </div>
                    )}
                </div>
                <Link to={`/explore/locations/:id/${article.location}`}>
                    {/* location id */}
                    {article.location}
                </Link>
            </div>
            <div
                className="header-dots"
                onClick={() => setIsDotModalActivated(true)}
            >
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

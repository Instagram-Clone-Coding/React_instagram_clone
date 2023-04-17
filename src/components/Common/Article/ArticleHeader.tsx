import StoryCircle from "components/Common/StoryCircle";
import Username from "components/Common/Username";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { postFollow } from "app/store/ducks/home/homThunk";
import Loading from "components/Common/Loading";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";

const StyledArticleHeader = styled.header`
    height: 60px;
    padding: 16px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};

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
            display: flex;
            align-items: center;
            & > span {
                margin: 0 4px;
            }
            & > button {
                display: flex;
                justify-content: center;
                align-items: center;
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

interface ArticleHeaderProps {
    memberImageUrl: string;
    memberUsername: string;
    postId: number;
    location?: string;
    isFollowing: boolean;
    followLoading: boolean;
}

const ArticleHeader = ({
    memberImageUrl,
    memberUsername,
    postId,
    location,
    isFollowing,
    followLoading,
}: ArticleHeaderProps) => {
    const myUsername = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );
    const dispatch = useAppDispatch();

    const mouseEnterHandler = async (
        event: React.MouseEvent<HTMLSpanElement | HTMLDivElement>,
    ) => {
        if (!event) return;
        const { top, bottom, left } =
            event.currentTarget.getBoundingClientRect();
        await dispatch(
            getMiniProfile({
                memberUsername,
                modalPosition: { top, bottom, left },
            }),
        );
    };

    const mouseLeaveHandler = () => {
        dispatch(modalActions.mouseNotOnHoverModal());
        setTimeout(() => dispatch(modalActions.checkMouseOnHoverModal()), 500);
    };

    const followHandler = () => {
        const followUser = async () => {
            await dispatch(postFollow({ username: memberUsername }));
        };
        followUser();
    };

    return (
        <StyledArticleHeader>
            <StoryCircle
                type="default" // 백엔드 소통하여 읽었는지 여부 확인
                avatarUrl={memberImageUrl}
                username={memberUsername}
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
                        <Link to={`/profile/${memberUsername}`}>
                            {memberUsername}
                        </Link>
                    </Username>
                    {memberUsername !== myUsername && !isFollowing && (
                        <div className="header-followBox">
                            <span>•</span>
                            <button onClick={followHandler}>
                                {followLoading ? (
                                    <Loading size={18} />
                                ) : (
                                    "팔로우"
                                )}
                            </button>
                        </div> // 로딩 처리 필요
                    )}
                </div>
                <Link to={`/explore/locations/:id/${location}`}>
                    {/* location id */}
                    {location}
                </Link>
            </div>
            <div
                className="header-dots"
                onClick={() =>
                    dispatch(
                        modalActions.startArticleMenuModal({
                            postId: postId,
                            memberUsername,
                            memberImageUrl,
                            isFollowing,
                        }),
                    )
                }
            >
                <ThreeDots />
            </div>
        </StyledArticleHeader>
    );
};

export default React.memo(ArticleHeader);

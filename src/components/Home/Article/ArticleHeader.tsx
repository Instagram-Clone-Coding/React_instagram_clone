import StoryCircle from "components/Common/StoryCircle";
import Username from "components/Common/Username";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";
import { postFollow } from "app/store/ducks/home/homThunk";
import Loading from "components/Common/Loading";

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
            display: flex;
            align-items: center;
            & > span {
                margin: 0 4px;
            }
            & > button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 36.34px;
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
    memberNickname: string;
    postId: number;
    location?: string;
    isFollowing: boolean;
    followLoading: boolean;
}

const ArticleHeader = ({
    memberImageUrl,
    memberUsername,
    memberNickname,
    postId,
    location,
    isFollowing,
    followLoading,
}: ArticleHeaderProps) => {
    const { miniProfile } = useAppSelector(({ modal }) => modal);
    const myUsername = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );
    const dispatch = useAppDispatch();

    // const [isFollowing, setIsFollowing] = useState(false); // followingModal의 isFollowing과 연결할 것
    const [prevEventText, setPrevEventText] = useState("");

    const fetchMiniProfile = async ({
        top,
        bottom,
        left,
    }: ModalType.ModalPositionProps) => {
        await dispatch(
            getMiniProfile({
                memberNickname,
                modalPosition: { top, bottom, left },
            }),
        );
    };

    const mouseEnterHandler = (
        event: React.MouseEvent<HTMLSpanElement | HTMLDivElement>,
    ) => {
        if (!event) return;
        const {
            currentTarget: { innerText },
        } = event;
        const { top, bottom, left } =
            event.currentTarget.getBoundingClientRect();
        if (innerText !== prevEventText) {
            dispatch(
                modalActions.changeHoverModalPosition({ top, bottom, left }),
            );
        }
        if (miniProfile) return dispatch(modalActions.mouseOnHoverModal());
        dispatch(
            modalActions.startModal({
                activatedModal: null,
                isOnMiniProfile: false,
                memberUsername,
                memberNickname,
                memberImageUrl,
                isFollowing,
            }),
        );
        fetchMiniProfile({
            top,
            bottom,
            left,
        });
    };

    const mouseLeaveHandler = (
        event: React.MouseEvent<HTMLSpanElement | HTMLDivElement>,
    ) => {
        if (!event) return;
        const {
            currentTarget: { innerText },
        } = event;
        setPrevEventText(innerText);
        dispatch(modalActions.mouseNotOnHoverModal());
        setTimeout(() => dispatch(modalActions.checkMouseOnHoverModal()), 500);
    };

    const followHandler = () => {
        const followUser = async () => {
            await dispatch(postFollow({ username: memberNickname }));
        };
        followUser();
    };

    return (
        <StyledArticleHeader>
            <StoryCircle
                type="unread" // 백엔드 소통하여 읽었는지 여부 확인
                avatarUrl={memberImageUrl}
                username={memberNickname}
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
                        <Link to={`/profile/${memberNickname}`}>
                            {memberNickname}
                        </Link>
                    </Username>
                    {memberNickname !== myUsername && !isFollowing && (
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
                        modalActions.startModal({
                            isOnMiniProfile: false,
                            activatedModal: "articleMenu",
                            postId: postId,
                            memberUsername,
                            memberNickname,
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

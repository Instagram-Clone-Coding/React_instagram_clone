import StoryCircle from "components/Common/StoryCircle";
import Username from "components/Common/Username";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ThreeDots } from "../../../assets/Svgs/threeDots.svg";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";
import { token } from "Routes";

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

interface ArticleHeaderProps {
    memberImageUrl: string;
    memberUsername: string;
    memberNickname: string;
    postId: number;
    location?: string;
}

const ArticleHeader = ({
    memberImageUrl,
    memberUsername,
    memberNickname,
    postId,
    location,
}: ArticleHeaderProps) => {
    const { miniProfile } = useAppSelector(({ modal }) => modal);
    const dispatch = useAppDispatch();

    const [isFollowing, setIsFollowing] = useState(false); // followingModal의 isFollowing과 연결할 것
    const [prevEventText, setPrevEventText] = useState("");

    const fetchMiniProfile = async () => {
        await dispatch(getMiniProfile({ token, memberUsername }));
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
                modalPosition: {
                    top,
                    bottom,
                    left,
                },
                memberUsername,
                memberNickname,
                memberImageUrl,
            }),
        );
        fetchMiniProfile();
    };

    const mouseLeaveHandler = (
        event: React.MouseEvent<HTMLSpanElement | HTMLDivElement>,
    ) => {
        if (!event) return;
        const {
            currentTarget: { innerText },
        } = event;
        // console.log("떨어진 텍스트는", innerText);
        // console.log("현재 텍스트는", prevEventText);
        setPrevEventText(innerText);
        // if (innerText !== prevEventText) {
        //     console.log("다릅니다");
        //     setPrevEventText(innerText);
        //     dispatch(modalActions.resetModal());
        // } else {
        dispatch(modalActions.mouseNotOnHoverModal());
        setTimeout(() => dispatch(modalActions.checkMouseOnHoverModal()), 100);
        // }
    };

    const followHandler = () => {
        // follow
        setIsFollowing(true);
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
                        <Link to={`/${memberNickname}`}>{memberNickname}</Link>
                    </Username>
                    {!isFollowing && (
                        <div className="header-followBox">
                            <span>•</span>
                            <button onClick={followHandler}>팔로우</button>
                        </div>
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

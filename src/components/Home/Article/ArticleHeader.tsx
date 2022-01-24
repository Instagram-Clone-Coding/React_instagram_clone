import StoryCircle from "components/Common/StoryCircle";
import Username from "components/Common/Username";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArticleMenuModal from "../Modals/ArticleMenuModal";
import FollowingModal from "../Modals/FollowingModal";
import HoverModal from "../Modals/HoverModal";
import ReportModal from "../Modals/ReportModal";
import ShareWithModal from "../Modals/SharerWithModal";
import { ReactComponent as ThreeDots } from "../../../assets/Svgs/threeDots.svg";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { homeActions } from "app/store/ducks/home/homeSlice";

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
    memberNickname: string;
    postId: number;
    location?: string;
}

const ArticleHeader = ({
    memberImageUrl,
    memberNickname,
    postId,
    location,
}: ArticleHeaderProps) => {
    // const [isHoverModalActivated, setIsHoverModalActivated] = useState(false);
    // const [isDotModalActivated, setIsDotModalActivated] = useState(false);
    // const [isReportModalActivated, setIsReportModalActivated] = useState(false);
    // const [isFollowingModalActivated, setIsFollowingModalActivated] =
    //     useState(false);
    // const [isShareWithModalActivated, setIsShareWithModalActivated] =
    //     useState(false);

    const { activatedModal } = useAppSelector(({ home }) => home.modalDTOs);
    const dispatch = useAppDispatch();

    // const [modalPositionObj, setModalPositionObj] = useState<DOMRect>();
    const [isFollowing, setIsFollowing] = useState(false); // followingModal의 isFollowing과 연결할 것

    const mouseEnterHandler = (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>,
    ) => {
        // se  tModalPositionObj(event?.currentTarget.getBoundingClientRect());
        // setIsHoverModalActivated(true);
        if (!event) return;
        const { top, bottom, left } =
            event.currentTarget.getBoundingClientRect();
        dispatch(
            homeActions.startModal({
                activatedModal: "hover",
                modalPosition: {
                    top,
                    bottom,
                    left,
                },
                memberNickname,
            }),
        );
    };

    const mouseLeaveHandler = () => {
        // setTimeout(() => {
        //     activatedModal || dispatch(homeActions.resetModal());
        // }, 500);
        dispatch(homeActions.resetModal());
        // setIsHoverModalActivated(false);
    };

    const followHandler = () => {
        // follow
        setIsFollowing(true);
    };

    // const unfollowHandler = () => {
    //     // unfollow하기 전에 modal에서 재차 확인
    //     setIsFollowingModalActivated(true);
    // };

    // const cloaseArticleMenuModalAndOpenReportModal = () => {
    //     setIsDotModalActivated(false);
    //     setIsReportModalActivated(true);
    // };

    // const cloaseArticleMenuModalAndOpenShareWithModal = () => {
    //     setIsDotModalActivated(false);
    //     setIsShareWithModalActivated(true);
    // };

    return (
        <StyledArticleHeader>
            {/* {isFollowing && activatedModal === "unfollowing" && (
                <FollowingModal
                    onUnfollow={() => setIsFollowing(false)}
                    onModalOn={() => setIsFollowingModalActivated(true)}
                    onModalOff={() => setIsFollowingModalActivated(false)}
                    username={memberNickname}
                    avatarUrl={memberImageUrl}
                />
            )}
            {activatedModal === "articleMenu" && (
                <ArticleMenuModal
                    isFollowing={isFollowing}
                    onUnfollow={unfollowHandler}
                    onModalOn={() => setIsDotModalActivated(true)}
                    onModalOff={() => setIsDotModalActivated(false)}
                    onReportModalOn={cloaseArticleMenuModalAndOpenReportModal}
                    onShareWithModalOn={
                        cloaseArticleMenuModalAndOpenShareWithModal
                    }
                />
            )}
            {activatedModal === "report" && (
                <ReportModal
                    onModalOn={() => setIsReportModalActivated(true)}
                    onModalOff={() => setIsReportModalActivated(false)}
                />
            )}
            {activatedModal === "shareWith" && (
                <ShareWithModal
                    onModalOn={() => setIsShareWithModalActivated(true)}
                    onModalOff={() => setIsShareWithModalActivated(false)}
                    username={memberNickname}
                />
            )} */}
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
                        homeActions.startModal({
                            activatedModal: "articleMenu",
                            postId: postId,
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

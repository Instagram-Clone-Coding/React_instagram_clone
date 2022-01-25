import StoryCircle from "components/Common/StoryCircle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "styles/UI/Card";
import ModalCard from "styles/UI/ModalCard";
import Username from "../../Common/Username";
import sprite2 from "../../../assets/Images/sprite2.png";
import useNumberSummary from "hooks/useNumberSummary";
import Button from "styles/UI/Button";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { token } from "Routes";

const StyledHoverModalInner = styled.div`
    width: 100%;
    .hoverModal-top {
        display: flex;
        gap: 16px;
        padding: 16px;
        align-items: center;
        border-bottom: ${(props) => "1px solid" + props.theme.color.bd_gray};
        & .hoverModal-top-info {
            display: flex;
            flex-direction: column;
            .hoverModal-top-username {
                text-decoration: none;
                display: flex;
                align-items: center;
                & > .hoverModal-top-verified {
                    margin-left: 4px;
                    background: url(${sprite2}) no-repeat -428px -142px;
                    background-size: 440px 411px;
                    width: 12px;
                    height: 12px;
                    color: transparent;
                }
            }

            .hoverModal-top-realName {
                color: ${(props) => props.theme.font.gray};
            }

            .hoverModal-top-link {
                margin-top: 8px;
                color: ${(props) => props.theme.font.link_blue};
                text-decoration: none;
            }
            .hoverModal-top-follwers {
                color: ${(props) => props.theme.font.gray};
            }
        }
    }
    .hoverModal-middle {
        display: flex;
        margin: 16px 0;
        & > div {
            width: 130px;
            display: flex;
            flex-direction: column;
            align-items: center;
            & > div:first-child {
                color: ${(props) => props.theme.font.gray};
            }
            & > div:last-child {
                font-weight: ${(props) => props.theme.font.bold};
            }
        }
    }
    .hoverModal-bottom {
        display: flex;
        width: 100%;
        & > a {
            flex: 1;
            width: 130px;
            height: 130px;
            display: flex;
            align-items: center;
            overflow-y: hidden;
            &:hover {
                opacity: 0.9;
            }
            & > img {
                width: 130px;
            }
        }
    }
    .hoverModal-btns {
        padding: 16px;
        display: flex;
        align-items: center;
        & > * {
            flex: 1 1 auto;
            text-decoration: none;
            font-weight: ${(props) => props.theme.font.bold};
            margin-right: 4px;
            cursor: pointer;
            & > div {
                padding: 5px 9px;
                text-align: center;
            }
        }
    }
`;

interface HoverModalProps {
    // isFollowing?: boolean;
    // onFollowChange: (a: boolean) => void;
    // username: string;
    // modalPosition?: DOMRect;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    miniProfile: ModalType.MiniProfileProps;
    // onFollowingModalOn: () => void;
}

const HoverModal = ({
    // isFollowing,
    // onFollowChange,
    // username,
    // modalPosition,
    onMouseEnter,
    onMouseLeave,
    miniProfile,
}: // onFollowingModalOn,
HoverModalProps) => {
    const { modalPosition } = useAppSelector(({ modal }) => modal);
    const dispatch = useAppDispatch();

    const postsNumSummary = useNumberSummary(
        miniProfile ? miniProfile.memberPostsCount : 0,
    );
    const followersNumSummary = useNumberSummary(
        miniProfile ? miniProfile.memberFollowersCount : 0,
    );
    const followsNumSummary = useNumberSummary(
        miniProfile ? miniProfile.memberFollowingsCount : 0,
    );

    return (
        <ModalCard
            modalType="positioned"
            modalPosition={modalPosition}
            onModalOn={onMouseEnter}
            onModalOff={onMouseLeave}
        >
            {miniProfile.memberName && (
                <StyledHoverModalInner>
                    <div className="hoverModal-top">
                        <Link to={`/${miniProfile.memberName}`}>
                            <StoryCircle
                                type="default"
                                avatarUrl={miniProfile.memberImage.imageUrl}
                                username={miniProfile.memberName}
                                scale={1}
                            />
                        </Link>
                        <div className="hoverModal-top-info">
                            <Link
                                to={`/${miniProfile.memberName}`}
                                className="hoverModal-top-username"
                            >
                                <Username>{miniProfile.memberName}</Username>
                                {/* {userSummary.verified && (
                                    <span className="hoverModal-top-verified">
                                        인증됨
                                    </span>
                                )} */}
                            </Link>
                            <div className="hoverModal-top-realName">
                                {miniProfile.memberName}
                                {/* 원래 진짜 이름 있어야 하는데 */}
                            </div>
                            {miniProfile.memberWebsite && (
                                <a
                                    href={`${miniProfile.memberWebsite}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hoverModal-top-link"
                                >
                                    {miniProfile.memberWebsite}
                                </a>
                            )}
                            <div className="hoverModal-top-follwers">
                                {miniProfile.followingMemberFollow
                                    ? `${
                                          miniProfile.followingMemberFollow
                                      }님 외 ${
                                          miniProfile.memberFollowersCount - 1
                                      }명이 팔로우합니다`
                                    : `${miniProfile.memberFollowersCount}명이 팔로우합니다`}
                            </div>
                        </div>
                    </div>
                    <div className="hoverModal-middle">
                        <div className="hoverModal-middle-articles">
                            <div>게시물</div>
                            <div>{postsNumSummary}</div>
                        </div>
                        <div className="hoverModal-middle-followers">
                            <div>팔로워</div>
                            <div>{followersNumSummary}</div>
                        </div>
                        <div className="hoverModal-middle-followings">
                            <div>팔로잉</div>
                            <div>{followsNumSummary}</div>
                        </div>
                    </div>
                    <div className="hoverModal-bottom">
                        {miniProfile.memberPosts.map((obj) => (
                            <Link to={`/p/${obj.postId}`} key={obj.postId}>
                                <img
                                    src={obj.postImageUrl}
                                    alt={`${miniProfile.memberName}님의 최근 게시물`}
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="hoverModal-btns">
                        {miniProfile.following ? (
                            <>
                                <Link to="/direct/t/id">
                                    <Card>메세지 보내기</Card>
                                </Link>
                                <div>
                                    <Card
                                        onClick={() => {
                                            console.log("clicked");
                                            dispatch(
                                                modalActions.changeActivatedModal(
                                                    "unfollowing",
                                                ),
                                            );
                                        }}
                                    >
                                        팔로잉
                                    </Card>
                                </div>
                            </>
                        ) : (
                            // <Button onClick={() => onFollowChange(true)}>
                            <Button onClick={() => {}}>팔로우</Button>
                        )}
                    </div>
                </StyledHoverModalInner>
            )}
        </ModalCard>
    );
};

export default HoverModal;

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
import { useAppSelector } from "app/store/hooks";

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
    onFollowingModalOn: () => void;
}

interface UserSummaryProps {
    avatarUrl: string;
    verified: boolean;
    isFollowing: boolean;
    realName: string;
    link?: string;
    followingUsernames: string[]; // 내가 팔로우한 사람 중에 이 사람 팔로우한 사람.
    articlesNum: number;
    followersNum: number;
    followsNum: number;
    recentImgs: {
        src: string;
        param: string; // 나중에 수정
    }[];
}

const HoverModal = ({
    // isFollowing,
    // onFollowChange,
    // username,
    // modalPosition,
    onMouseEnter,
    onMouseLeave,
    onFollowingModalOn,
}: HoverModalProps) => {
    const [userSummary, setUserSummary] = useState<UserSummaryProps>();
    const articlesNumSummary = useNumberSummary(
        userSummary ? userSummary.articlesNum : 0,
    );
    const followersNumSummary = useNumberSummary(
        userSummary ? userSummary.followersNum : 0,
    );
    const followsNumSummary = useNumberSummary(
        userSummary ? userSummary.followsNum : 0,
    );
    const { modalPosition, memberNickname } = useAppSelector(
        ({ home }) => home.modalDTOs,
    );

    useEffect(() => {
        // get username summary
        const fetchedUserSummary = {
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            verified: true,
            isFollowing: false,
            realName: "Son HeungMin(손흥민)",
            link: "https://linktr.ee/spursofficial",
            followingUsernames: ["hwangheechan", "me"],
            articlesNum: 11792,
            followersNum: 11424642,
            followsNum: 154,
            recentImgs: [
                {
                    src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                    param: "dsfds",
                },
                {
                    src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                    param: "hsgh",
                },
                {
                    src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                    param: "sdfhhjhj",
                },
            ],
        };
        setUserSummary(fetchedUserSummary);
        // onFollowChange(fetchedUserSummary.isFollowing);
    }, []);
    return (
        <ModalCard
            modalType="positioned"
            modalPosition={modalPosition}
            onModalOn={onMouseEnter}
            onModalOff={onMouseLeave}
        >
            {userSummary && memberNickname && (
                <StyledHoverModalInner>
                    <div className="hoverModal-top">
                        <Link to={`/${memberNickname}`}>
                            <StoryCircle
                                type="default"
                                avatarUrl={userSummary.avatarUrl}
                                username={memberNickname}
                                scale={1}
                            />
                        </Link>
                        <div className="hoverModal-top-info">
                            <Link
                                to={`/${memberNickname}`}
                                className="hoverModal-top-username"
                            >
                                <Username>{memberNickname}</Username>
                                {userSummary.verified && (
                                    <span className="hoverModal-top-verified">
                                        인증됨
                                    </span>
                                )}
                            </Link>
                            <div className="hoverModal-top-realName">
                                {userSummary.realName}
                            </div>
                            <a
                                href={`${userSummary.link}`}
                                target="_blank"
                                rel="noreferrer"
                                className="hoverModal-top-link"
                            >
                                {userSummary.link}
                            </a>
                            <div className="hoverModal-top-follwers">{`${userSummary.followingUsernames[0]}님 외 ${userSummary.followingUsernames.length}명이 팔로우합니다`}</div>
                        </div>
                    </div>
                    <div className="hoverModal-middle">
                        <div className="hoverModal-middle-articles">
                            <div>게시물</div>
                            <div>{articlesNumSummary}</div>
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
                        {userSummary.recentImgs.map((obj) => (
                            <Link to={`/p/${obj.param}`} key={obj.param}>
                                <img src={obj.src} alt={obj.param} />
                            </Link>
                        ))}
                    </div>
                    <div className="hoverModal-btns">
                        {/* {isFollowing ? (
                            <>
                                <Link to="/direct/t/id">
                                    <Card>메세지 보내기</Card>
                                </Link>
                                <div>
                                    <Card onClick={onFollowingModalOn}>
                                        팔로잉
                                    </Card>
                                </div>
                            </>
                        ) : (
                            <Button onClick={() => onFollowChange(true)}>
                                팔로우
                            </Button>
                        )} */}
                    </div>
                </StyledHoverModalInner>
            )}
        </ModalCard>
    );
};

export default HoverModal;

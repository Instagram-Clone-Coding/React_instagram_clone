import StoryCircle from "components/Common/StoryCircle";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import Card from "styles/UI/Card";
import ModalCard from "styles/UI/ModalCard";
import Username from "../../Common/Username";
import sprite2 from "../../../assets/Images/sprite2.png";
import useNumberSummary from "hooks/useNumberSummary";
import Button from "styles/UI/Button";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import Loading from "components/Common/Loading";
import { postFollow } from "app/store/ducks/home/homThunk";

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
        * {
            text-decoration: none;
        }
        & > #margin {
            margin-right: 4px;
        }
        & > a > button {
            width: 100%;
        }
        & > * {
            flex: 1 1 auto;
            font-weight: ${(props) => props.theme.font.bold};
            cursor: pointer;
            & > div {
                padding: 5px 9px;
                text-align: center;
            }
        }
        & > button > div {
            padding: 0;
        }
    }
`;

type printAboutFollowingMemberFollowTypes = (
    followingMemberFollowArr: [{ memberUsername: string }],
    rest: number,
) => string;

const printAboutFollowingMemberFollow: printAboutFollowingMemberFollowTypes = (
    followingMemberFollowArr,
    rest,
) => {
    if (rest === 0) return "1명이 팔로우합니다";
    return `${followingMemberFollowArr[0].memberUsername}님 외 ${rest}명이 팔로우합니다.`;
};

interface HoverModalProps {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    miniProfile: ModalType.MiniProfileStateProps;
}

const HoverModal = ({
    onMouseEnter,
    onMouseLeave,
    miniProfile,
}: HoverModalProps) => {
    const userInfo = useAppSelector(({ auth }) => auth.userInfo);
    const theme = useTheme();
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

    const followClickHandler = () => {
        const followUser = async () => {
            await dispatch(
                postFollow({ username: miniProfile.memberUsername }),
            );
        };
        followUser();
    };

    return (
        <ModalCard
            modalType="positioned"
            modalPosition={miniProfile.modalPosition}
            onModalOn={onMouseEnter}
            onModalOff={onMouseLeave}
        >
            {miniProfile.memberName && (
                <StyledHoverModalInner>
                    <div className="hoverModal-top">
                        <Link to={`/profile/${miniProfile.memberUsername}`}>
                            <StoryCircle
                                type="default"
                                avatarUrl={miniProfile.memberImage.imageUrl}
                                username={miniProfile.memberName}
                                scale={1}
                            />
                        </Link>
                        <div className="hoverModal-top-info">
                            <Link
                                to={`/profile/${miniProfile.memberUsername}`}
                                className="hoverModal-top-username"
                            >
                                <Username>
                                    {miniProfile.memberUsername}
                                </Username>
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
                                {printAboutFollowingMemberFollow(
                                    miniProfile.followingMemberFollow,
                                    miniProfile.followingMemberFollowCount,
                                )}
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
                        {userInfo?.memberUsername ===
                        miniProfile.memberUsername ? (
                            <Link to="/accounts/edit">
                                <Button
                                    bgColor={"#efefef"}
                                    color={theme.font.default_black}
                                >
                                    프로필 편집
                                </Button>
                            </Link>
                        ) : miniProfile.following ? (
                            <>
                                <Link to="/direct/t/id" id="margin">
                                    <Card>메세지 보내기</Card>
                                </Link>
                                <div>
                                    <Card
                                        onClick={() =>
                                            dispatch(
                                                modalActions.changeActivatedModal(
                                                    "unfollowing",
                                                ),
                                            )
                                        }
                                    >
                                        {miniProfile.isLoading ? (
                                            <Loading size={18} />
                                        ) : (
                                            "팔로잉"
                                        )}
                                    </Card>
                                </div>
                            </>
                        ) : (
                            <Button onClick={followClickHandler}>
                                {miniProfile.isLoading ? (
                                    <Loading size={18} isInButton={true} />
                                ) : (
                                    "팔로우"
                                )}
                            </Button>
                        )}
                    </div>
                </StyledHoverModalInner>
            )}
        </ModalCard>
    );
};

export default HoverModal;

import { makeRoom } from "app/store/ducks/direct/DirectThunk";
import {
    selectModal,
    setUnFollowSelectedUser,
} from "app/store/ducks/profile/profileSlice";
import { lookUpUserProfile } from "app/store/ducks/profile/profileThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import sprite from "assets/Images/sprite5.png";
import { ReactComponent as SettingSvg } from "assets/Svgs/setting.svg";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import Loading from "components/Common/Loading";
import BlockModal from "components/Common/Modal/BlockModal";
import StoryCircle from "components/Common/StoryCircle";
import { authorizedCustomAxios } from "customAxios";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "styles/UI/Button/Button";
import ImageSprite from "../../Common/ImageSprite";
import FollowerModal from "../Modals/FollowerModal";
import SettingModal from "../Modals/SettingModal";
import UnFollowModal from "../Modals/UnFollowModal";
import UserActionModal from "../Modals/UserActionModal";

interface ProfileHeaderContainerProps {
    me: boolean;
}

const ProfileHeaderContainer = styled.header<ProfileHeaderContainerProps>`
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;
    align-items: stretch;

    .profile-img {
        margin-right: 30px;
        display: flex;
        justify-content: center;
    }

    .profile-content {
        .name-with-icon {
            display: flex;
            align-items: center;
            flex-shrink: 1;

            .name {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 300;
                font-size: 28px;
                line-height: 32px;
                margin: -5px 0 -6px;
            }

            .edit {
                background-color: transparent;
                margin-left: 20px;
                border: ${(props) => props.me && "1px solid #dbdbdb"};
                border-radius: 4px;
                color: #262626;
                text-decoration: none;
                font-size: 14px;
                font-weight: 600;
                padding: 5px 9px;
                text-align: center;
                text-overflow: ellipsis;
            }

            .following {
                display: flex;
                align-items: center;

                .dm-button {
                    display: flex;
                    align-items: center;
                }
                button {
                    margin-left: 10px;
                    border: 1px solid #dbdbdb;
                    color: #262626;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    padding: 5px 9px;
                    height: 30px;
                }
            }

            svg {
                margin: 8px;
                cursor: pointer;
            }

            .follow-button {
                margin-left: 10px;
            }
        }

        .follower {
            display: flex;
            margin-bottom: 20px;

            .follower-with-number {
                margin-right: 40px;
                font-size: 16px;

                span {
                    font-weight: 600;
                }
            }

            li:not(:first-child) {
                cursor: pointer;
            }
        }

        .detail-info {
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
        }
    }

    @media (min-width: 736px) {
        margin-bottom: 44px;

        .profile-img {
            flex-grow: 1;
        }

        .profile-content {
            flex-basis: 30px;
            flex-grow: 5;

            .name-with-icon {
                margin-bottom: 20px;
            }
        }
    }
`;

interface ProfileHeaderProps {}

const memberImage: CommonType.ImageProps = {
    width: 24,
    height: 12,
    position: `-553px -100px`,
    url: sprite,
};

const ProfileHeader = ({}: ProfileHeaderProps) => {
    const dispatch = useAppDispatch();

    const memberProfile = useAppSelector(
        (state) => state.profile.memberProfile as Profile.MemberProfileProps,
    );
    const isLoading = useAppSelector((state) => state.direct.isLoading);

    const modal = useAppSelector((state) => state.profile.modal);
    const [isFollowerModal, setIsFollowerModal] = useState<boolean>(true); // 기본값은 팔로워 모달입니다. false 라면 팔로우 입니다
    const { username } = useParams<{ username: string }>();
    const history = useHistory();
    const followHandler = async () => {
        await authorizedCustomAxios.post(
            `/${memberProfile.memberUsername}/follow`,
        );

        // 팔로우한거 반영해주자 (언팔로우 버튼으로 바뀝니다)
        await dispatch(
            lookUpUserProfile({ username: memberProfile.memberUsername }),
        );
    };

    const sendMessageHandler = async () => {
        await dispatch(makeRoom({ usernames: [username] }));
        history.push(`/direct`);
    };

    return (
        <ProfileHeaderContainer me={memberProfile?.me}>
            <div className="profile-img">
                <StoryCircle
                    type="read" // 백엔드 소통 후 읽었는지 여부 확인
                    avatarUrl={memberProfile?.memberImage.imageUrl}
                    username={"chanhyuk"}
                    scale={2.5}
                />
            </div>
            <section className="profile-content">
                <div className="name-with-icon">
                    <h2 className="name">{memberProfile?.memberUsername}</h2>
                    {/*나와 타인에 따라서 아이콘을 다르게 랜더링 해줍니다*/}
                    {memberProfile?.me ? (
                        <>
                            <Link className="edit" to={"/accounts/edit"}>
                                프로필 편집
                            </Link>
                            <SettingSvg
                                onClick={() => {
                                    dispatch(selectModal("setting"));
                                }}
                            />
                        </>
                    ) : (
                        <>
                            {memberProfile?.following ? (
                                <div className={"following"}>
                                    <button
                                        className="dm-button"
                                        onClick={sendMessageHandler}
                                    >
                                        {isLoading ? (
                                            <Loading size={18} />
                                        ) : (
                                            <span>메시지 보내기</span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                setUnFollowSelectedUser({
                                                    imageUrl:
                                                        memberProfile
                                                            .memberImage
                                                            .imageUrl,
                                                    username:
                                                        memberProfile.memberUsername,
                                                }),
                                            );
                                            dispatch(selectModal("unFollow"));
                                        }}
                                    >
                                        <ImageSprite {...memberImage} />
                                    </button>
                                </div>
                            ) : (
                                <Button
                                    className={"follow-button"}
                                    onClick={followHandler}
                                >
                                    팔로우
                                </Button>
                            )}
                        </>
                    )}
                    <ThreeDots
                        onClick={() => {
                            dispatch(selectModal("userAction"));
                        }}
                    />
                </div>
                <ul className="follower">
                    <li className="follower-with-number">
                        게시물 <span>{memberProfile?.memberPostsCount}</span>
                    </li>
                    <li
                        className="follower-with-number"
                        onClick={() => {
                            dispatch(selectModal("follower"));
                            setIsFollowerModal(true);
                        }}
                    >
                        팔로워{" "}
                        <span>{memberProfile?.memberFollowersCount}</span>
                    </li>
                    <li
                        className="follower-with-number"
                        onClick={() => {
                            dispatch(selectModal("follower"));
                            setIsFollowerModal(false);
                        }}
                    >
                        팔로우{" "}
                        <span>{memberProfile?.memberFollowingsCount}</span>
                    </li>
                </ul>
                <div className="detail-info">{memberProfile?.memberName}</div>
            </section>
            {modal === "userAction" && (
                <UserActionModal
                    onModalOn={() => {
                        dispatch(selectModal("userAction"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}

            {modal === "setting" && (
                <SettingModal
                    onModalOn={() => {
                        dispatch(selectModal("setting"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}

            {modal === "follower" && (
                <FollowerModal
                    isFollowerModal={isFollowerModal}
                    onModalOn={() => {
                        dispatch(selectModal("follower"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}

            {modal === "unFollow" && (
                <UnFollowModal
                    onModalOn={() => {
                        dispatch(selectModal("unFollow"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                    cut={false}
                />
            )}

            {modal === "block" && (
                <BlockModal
                    onModalOn={() => {
                        dispatch(selectModal("block"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                    blockMemberUsername={username}
                />
            )}
        </ProfileHeaderContainer>
    );
};

export default ProfileHeader;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";
import CloseSVG from "assets/Svgs/CloseSVG";
import { authorizedCustomAxios } from "customAxios";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import UnFollowModal from "./UnFollowModal";
import {
    selectModal,
    setUnFollowSelectedUser,
} from "app/store/ducks/profile/profileSlice";
import Loading from "components/Common/Loading";

const FollowerModalInner = styled.div`
    padding-top: 30px;

    .header {
        margin-top: -30px;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;

        svg {
            cursor: pointer;
        }

        h1 {
            font-size: 1rem;
            font-weight: 600;
        }
    }

    .content {
        display: flex;
        flex-direction: column;

        .one-person {
            height: 54px;
            padding: 8px 16px;
            display: flex;

            .person-info {
                display: flex;
                align-items: center;

                img {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                }

                .person-name-container {
                    display: flex;
                    flex-direction: column;

                    .username {
                        font-weight: 600;
                    }

                    .follow-guide {
                        font-size: 12px;
                        line-height: 16px;
                        font-weight: 600;
                        color: #0095f6;
                        cursor: pointer;
                    }

                    .name {
                        color: #8e8e8e;
                    }
                }
            }

            .action-button {
                margin-left: auto;
                padding: 5px 9px;
                display: flex;
                align-items: center;
                border: 1px solid #dbdbdb;
                border-radius: 4px;
            }
        }
    }
`;

interface FollowerModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    isFollowerModal: boolean;
}

const FollowerModal = ({
    onModalOn,
    onModalOff,
    isFollowerModal,
}: FollowerModalProps) => {
    const dispatch = useAppDispatch();
    const { username } = useParams<{ username: string }>(); // 현재 프로필 페이지의 주인
    const userInfo = useAppSelector((state) => state.auth.userInfo); // 로그인한사람의 정보
    const [people, setPeople] = useState<Profile.personType[]>([]);
    const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
    const [openCutModal, setOpenCutModal] = useState<boolean>(false);
    const getPeople = async () => {
        const { data } = await authorizedCustomAxios.get(
            `/${username}/${isFollowerModal ? "followers" : "following"}`,
        );
        setPeople(data.data);
    };
    useEffect(() => {
        getPeople();
    }, []);

    const followHandler = async (username: string) => {
        setIsFollowLoading(true);
        await authorizedCustomAxios.post(`/${username}/follow`);
        setIsFollowLoading(false);
    };

    // 팔로워 모달 / 팔로우 모달 모두 오른쪽의 버튼에 어떤 액션이 나올지
    const renderRightButton = (person: Profile.personType) => {
        // 나의 프로필 페이지일 경우
        if (userInfo?.memberUsername === username) {
            // 팔로워 모달일 경우
            if (isFollowerModal) {
                return (
                    <button
                        className="action-button"
                        onClick={() => {
                            dispatch(
                                setUnFollowSelectedUser({
                                    imageUrl: person.member.image.imageUrl,
                                    username: person.member.username,
                                }),
                            );
                            setOpenCutModal(true);
                        }}
                    >
                        삭제
                    </button>
                );
            } else {
                // 팔로우 모달일 경우 내가 팔로우 한 사람들만 나온다.
                return (
                    <button
                        className="action-button"
                        onClick={() => {
                            dispatch(
                                setUnFollowSelectedUser({
                                    imageUrl: person.member.image.imageUrl,
                                    username: person.member.username,
                                }),
                            );
                            dispatch(selectModal("unFollow"));
                        }}
                    >
                        팔로잉
                    </button>
                );
            }
        } else {
            // 내가 아닌사람의 프로필 페이지일 경우
            // 팔로워 모달 팔로우 모달 동일합니다.
            // 내가 팔로우 이미했다면

            if (person.me) return; // 나라면 아무버튼 안보여주기

            if (person.following) {
                return (
                    <button
                        className="action-button"
                        onClick={() => {
                            dispatch(
                                setUnFollowSelectedUser({
                                    imageUrl: person.member.image.imageUrl,
                                    username: person.member.username,
                                }),
                            );
                            dispatch(selectModal("unFollow"));
                        }}
                    >
                        팔로잉
                    </button>
                );
            } else {
                // 내가 팔로우 안한사람이라면

                return (
                    <button
                        className="action-button"
                        onClick={async () => {
                            await followHandler(person.member.username);
                            await getPeople();
                        }}
                    >
                        팔로잉
                    </button>
                );
            }
        }
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <FollowerModalInner>
                <div className="header">
                    <div className="dummy"></div>
                    <h1>{isFollowerModal ? "팔로워" : "팔로우"}</h1>
                    <CloseSVG
                        color={"#262626"}
                        size={"24"}
                        onClick={onModalOff}
                    />
                </div>
                <div className="content">
                    {people.map((person) => (
                        <div
                            className={"one-person"}
                            key={person.member.username}
                        >
                            <div className="person-info">
                                <img
                                    src={person.member.image.imageUrl}
                                    alt={person.member.username}
                                />
                                <div className="person-name-container">
                                    <div>
                                        <span className="username">
                                            {person.member.username}
                                        </span>
                                        {/*나이거나 내가 이미 팔로우했다면 팔로우 가이드를 보여주면 안된다*/}
                                        {!person.me && !person.following && (
                                            <>
                                                {isFollowLoading ? (
                                                    <Loading size={18} />
                                                ) : (
                                                    <span
                                                        className="follow-guide"
                                                        onClick={async () => {
                                                            await followHandler(
                                                                person.member
                                                                    .username,
                                                            );
                                                            await getPeople();
                                                        }}
                                                    >
                                                        {" "}
                                                        · 팔로우
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <span className="name">
                                        {person.member.name}
                                    </span>
                                </div>
                            </div>
                            {renderRightButton(person)}
                        </div>
                    ))}
                </div>
            </FollowerModalInner>
            {openCutModal && (
                <UnFollowModal
                    onModalOn={() => {
                        setOpenCutModal(true);
                    }}
                    onModalOff={() => {
                        setOpenCutModal(false);
                    }}
                    cut={true}
                />
            )}
        </ModalCard>
    );
};

export default FollowerModal;

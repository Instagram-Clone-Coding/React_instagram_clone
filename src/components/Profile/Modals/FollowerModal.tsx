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
    const { username } = useParams<{ username: string }>(); // ?????? ????????? ???????????? ??????
    const userInfo = useAppSelector((state) => state.auth.userInfo); // ????????????????????? ??????
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

    // ????????? ?????? / ????????? ?????? ?????? ???????????? ????????? ?????? ????????? ?????????
    const renderRightButton = (person: Profile.personType) => {
        // ?????? ????????? ???????????? ??????
        if (userInfo?.memberUsername === username) {
            // ????????? ????????? ??????
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
                        ??????
                    </button>
                );
            } else {
                // ????????? ????????? ?????? ?????? ????????? ??? ???????????? ?????????.
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
                        ?????????
                    </button>
                );
            }
        } else {
            // ?????? ??????????????? ????????? ???????????? ??????
            // ????????? ?????? ????????? ?????? ???????????????.
            // ?????? ????????? ???????????????

            if (person.me) return; // ????????? ???????????? ???????????????

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
                        ?????????
                    </button>
                );
            } else {
                // ?????? ????????? ?????????????????????

                return (
                    <button
                        className="action-button"
                        onClick={async () => {
                            await followHandler(person.member.username);
                            await getPeople();
                        }}
                    >
                        ?????????
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
                    <h1>{isFollowerModal ? "?????????" : "?????????"}</h1>
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
                                        {/*???????????? ?????? ?????? ?????????????????? ????????? ???????????? ???????????? ?????????*/}
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
                                                        ?? ?????????
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

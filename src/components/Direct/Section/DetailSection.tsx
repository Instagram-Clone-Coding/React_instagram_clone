import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ReportModal from "components/Home/Modals/ReportModal";
import { closeModal, openModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import CommonDirectModal from "components/Direct/Section/Modals/CommonDirectModal";
import { Link } from "react-router-dom";
import BlockModal from "components/Common/Modal/BlockModal";
import theme from "styles/theme";

const DetailSectionContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    & > div {
        border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    }

    .group-name {
        padding: 15px 16px 0px;
        border-bottom: none;
        display: flex;
        input {
            border: none;
            background-color: transparent;
            padding-left: 5px;
            &::placeholder {
                color: gray;
            }
        }

        .complete-button {
            margin-left: auto;
            color: ${theme.color.blue};
        }
    }

    .direct-notification-check {
        padding: 20px 16px 16px;
        display: flex;

        input {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);

            &:focus {
                border-color: rgba(var(--d69, 0, 149, 246), 1);
            }
        }
    }

    .member-container {
        display: flex;
        flex-direction: column;
        padding: 16px 0;

        a {
            text-decoration: none;
        }

        h3 {
            margin: 0 16px;
            font-weight: bold;
            font-size: 1rem;
        }

        .member-profile-container {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            cursor: pointer;
            &:hover {
                background-color: #fafafa;
            }

            img {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                margin-right: 10px;
            }

            .member-id-name {
                display: flex;
                flex-direction: column;

                .username {
                    font-weight: bold;
                }

                .name {
                    color: #8e8e8e;
                }
            }
        }
    }

    .various-option-container {
        display: flex;
        flex-direction: column;

        div {
            display: flex;
            flex-direction: column;
            margin: 12px 16px;
            color: #ed4956;
            cursor: pointer;

            span {
                margin-top: 10px;
                color: ${theme.font.gray};
            }
        }
    }
`;

const DetailSection = () => {
    const dispatch = useAppDispatch();
    const { modal, selectedRoom } = useAppSelector((state) => state.direct);
    const [opponents, setOpponents] = useState<Direct.memberProps[]>();
    const username = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );
    useEffect(() => {
        setOpponents(
            selectedRoom?.members.filter((member) => {
                return member.username !== username;
            }),
        );
    }, [selectedRoom, username]);
    const isGroupChat = useMemo(() => {
        if (opponents) {
            return opponents.length > 1;
        }
    }, [opponents]);

    return (
        <DetailSectionContainer>
            {isGroupChat && (
                <div className="group-name">
                    <label htmlFor="group-name">?????? ??????:</label>
                    <input
                        type="text"
                        id="group-name"
                        placeholder="????????? ???????????????"
                    />
                    <button className="complete-button">??????</button>
                </div>
            )}
            <div className="direct-notification-check">
                <input type={"checkbox"} /> <span>????????? ?????? ??????</span>
            </div>
            <div className="member-container">
                <h3>??????</h3>
                {opponents?.map((opponent) => (
                    <Link to={`profile/${opponent?.username}`}>
                        <div className="member-profile-container">
                            <img src={opponent?.imageUrl} alt="?????? ??????" />
                            <div className="member-id-name">
                                <span className="username">
                                    {opponent?.username}
                                </span>
                                <span className="name">{opponent?.name}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="various-option-container">
                {isGroupChat && (
                    <div
                        onClick={() => {
                            console.log("?????? ?????????");
                        }}
                    >
                        ?????? ?????????
                        <span>
                            ?????? ????????? ??? ????????? ???????????? ?????? ???????????? ?????? ???
                            ??? ????????? ???????????? ?????? ????????????.
                        </span>
                    </div>
                )}
                <div
                    onClick={() => {
                        dispatch(openModal("deleteChat"));
                    }}
                >
                    ?????? ??????
                </div>
                {/* ?????? ????????? ???????????? ???????????????. */}
                {!isGroupChat && (
                    <>
                        <div
                            onClick={() => {
                                dispatch(openModal("block"));
                            }}
                        >
                            ??????
                        </div>
                        <div
                            onClick={() => {
                                dispatch(openModal("report"));
                            }}
                        >
                            ??????
                        </div>
                    </>
                )}
            </div>

            {/*under this point is modal section*/}
            {modal === "deleteChat" && (
                <CommonDirectModal
                    modalType={"deleteChat"}
                    title={"????????? ??????????????????????"}
                    description={
                        "???????????? ???????????? ?????? ?????????????????? ????????? ???????????????. ?????? ????????? ?????? ?????????????????? ?????? ???????????????."
                    }
                    actionName={"??????"}
                />
            )}
            {modal === "block" && (
                <BlockModal
                    onModalOn={() => {
                        dispatch(openModal("block"));
                    }}
                    onModalOff={() => {
                        closeModal();
                    }}
                    blockMemberUsername={
                        selectedRoom?.members[0].username as string
                    }
                />
            )}
            {modal === "report" && (
                <ReportModal
                    onModalOn={() => {
                        dispatch(openModal("report"));
                    }}
                    onModalOff={() => {
                        dispatch(closeModal());
                    }}
                />
            )}
        </DetailSectionContainer>
    );
};

export default DetailSection;

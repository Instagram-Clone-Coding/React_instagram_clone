import { selectView } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as DetailInfoActive } from "assets/Svgs/direct-detail-info-active.svg";
import { ReactComponent as DetailInfo } from "assets/Svgs/direct-detail-info.svg";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styles/theme";

interface SectionHeaderContainerType {
    view: string;
}

const SectionHeaderContainer = styled.section<SectionHeaderContainerType>`
    height: 60px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.color.bd_gray};

    .dummy-container {
        display: ${(props) => !(props.view === "detail") && "none"};
    }

    .user-profile-container {
        img {
            border-radius: 50%;
        }

        .group-user-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            .image-container {
                position: relative;
                margin-right: 20px;
                width: 40px;
                height: 40px;
                img {
                    position: absolute;
                    width: 22px;
                    height: 22px;
                }
                .first {
                    top: 4px;
                    left: 4px;
                }
                .second {
                    bottom: 4px;
                    right: 4px;
                }
            }
        }
        h3 {
            font-size: 1rem;
            font-weight: 600;
        }
        .single-user-container {
            height: 50%;
            display: flex;
            align-items: center;
            text-decoration: none;
            img {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                margin-right: 12px;
            }
        }
    }

    .detail-info-container {
        display: flex;
        cursor: pointer;
    }
`;

const SectionHeader = () => {
    const dispatch = useAppDispatch();
    const { view, selectedRoom } = useAppSelector((state) => state.direct);
    const username = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );
    const [opponents, setOpponents] = useState<Direct.memberProps[]>();
    const viewConvertHandler = () => {
        switch (view) {
            case "detail":
                dispatch(selectView("chat"));
                break;
            case "chat":
                dispatch(selectView("detail"));
                break;
            // case "requestsChat":
            //     dispatch(selectView("detail"))
            //     break
            default:
                break;
        }
    };

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
        <SectionHeaderContainer view={view}>
            <div className="dummy-container"></div>
            <div className="user-profile-container">
                {view === "detail" ? (
                    <h3>상세 정보</h3>
                ) : (
                    opponents && (
                        <>
                            {isGroupChat ? (
                                <div
                                    className="group-user-container"
                                    onClick={() => {
                                        dispatch(selectView("detail"));
                                    }}
                                >
                                    <div className="image-container">
                                        <img
                                            src={opponents[0].imageUrl}
                                            alt="avatarImg"
                                            className="first"
                                        />
                                        <img
                                            src={opponents[1].imageUrl}
                                            alt="avatarImg"
                                            className="second"
                                        />
                                    </div>
                                    <h3>
                                        {opponents
                                            .map(
                                                (opponent) => opponent.username,
                                            )
                                            .join(",")}
                                    </h3>
                                </div>
                            ) : (
                                <Link
                                    to={`/profile/${opponents[0]?.username}`}
                                    className="single-user-container"
                                >
                                    <img
                                        src={opponents[0].imageUrl}
                                        alt="selected-group-user-name"
                                    />
                                    <h3>{opponents[0].username}</h3>
                                </Link>
                            )}
                        </>
                    )
                )}
            </div>
            <div className="detail-info-container" onClick={viewConvertHandler}>
                {view === "detail" ? <DetailInfoActive /> : <DetailInfo />}
            </div>
        </SectionHeaderContainer>
    );
};

export default SectionHeader;

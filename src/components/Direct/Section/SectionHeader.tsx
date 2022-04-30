import { selectView } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as DetailInfoActive } from "assets/Svgs/direct-detail-info-active.svg";
import { ReactComponent as DetailInfo } from "assets/Svgs/direct-detail-info.svg";
import React, { useEffect, useState } from "react";
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
        a {
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

            h3 {
                font-size: 1rem;
                font-weight: 600;
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
    const [opponent, setOpponent] = useState<Direct.memberProps>();
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
        setOpponent(
            selectedRoom?.members.filter((member) => {
                return member.username !== username;
            })[0],
        );
    }, [selectedRoom]);

    return (
        <SectionHeaderContainer view={view}>
            <div className="dummy-container"></div>
            <div className="user-profile-container">
                {view === "detail" ? (
                    <h3>상세 정보</h3>
                ) : (
                    <Link to={`/profile/${opponent?.username}`}>
                        <img
                            src={opponent?.imageUrl}
                            alt="selected-user-image"
                        />
                        <h3>{opponent?.username}</h3>
                    </Link>
                )}
            </div>
            <div className="detail-info-container" onClick={viewConvertHandler}>
                {view === "detail" ? <DetailInfoActive /> : <DetailInfo />}
            </div>
        </SectionHeaderContainer>
    );
};

export default SectionHeader;

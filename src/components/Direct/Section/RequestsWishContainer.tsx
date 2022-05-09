import React from "react";
import styled from "styled-components";
import { openModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import CommonDirectModal from "./Modals/CommonDirectModal";

const RequestsWishContainerContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    border-top: 1px solid #dbdbdb;

    .guide-container {
        padding: 16px;
        text-align: center;
        background-color: #fafafa;

        .wish-content {
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;

            strong {
                font-weight: 600;
            }
        }

        .follow-info-content {
            color: #8e8e8e;
            font-weight: 400;
            margin-bottom: 20px;
        }

        .guide-content {
            font-weight: 400;
            color: #8e8e8e;
            font-size: 12px;
            line-height: 16px;
        }
    }

    .button-container {
        border-top: 1px solid #dbdbdb;

        height: 51px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .vertical-line {
            background-color: #dbdbdb;
            height: 24px;
            width: 1px;
        }

        .block-button {
            color: #ed4956;
        }

        .delete-button {
            color: #ed4956;
        }
    }
`;

const RequestsWishContainer = () => {
    const dispatch = useAppDispatch();
    const { modal } = useAppSelector((state) => state.direct);
    return (
        <RequestsWishContainerContainer>
            <div className="guide-container">
                <div className="wish-content">
                    <strong>suhw.han</strong>님이 회원님에게 메시지를 보내고
                    싶어 합니다
                </div>
                <div className="follow-info-content">
                    팔로워 120명 게시물 3개
                </div>
                <div className="guide-content">
                    지금부터 suwa.han님이 회원님에게 메시지를 보낼 수 있도록
                    허용하시겠어요? 수락하지 않는 이상 상대방은 회원님이 요청을
                    확인했다는 사실을 알 수 없습니다
                </div>
            </div>
            <div className="button-container">
                <button
                    className="block-button"
                    onClick={() => {
                        dispatch(openModal("block"));
                    }}
                >
                    차단
                </button>
                <div className="vertical-line"></div>
                <button className="delete-button">삭제</button>
                <div className="vertical-line"></div>
                <button className="accept-button">수락</button>
            </div>

            {modal === "block" && (
                <CommonDirectModal
                    modalType={"block"}
                    actionName={"차단"}
                    title={"개복치님을 차단하시겠어요?"}
                    description={
                        "상대방은 Instagram에서 회원님의 프로필, 게시물 또는 스토리를 찾을 수 없습니다. Instagram은 회원님이 차단한 사실을 상대방에게 알리지 않습니다."
                    }
                />
            )}
        </RequestsWishContainerContainer>
    );
};

export default RequestsWishContainer;

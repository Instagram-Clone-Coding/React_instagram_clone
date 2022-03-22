import { selectModal } from "app/store/ducks/profile/profileSlice";
import { useAppDispatch } from "app/store/Hooks";
import React from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

const UserActionModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
        width: 100%;
        flex: 1;
        height: 48px;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
    }
    & > div:not(:first-child) {
        border-top: ${(props) => props.theme.color.bd_gray} 1px solid;
    }

    & > div:not(:last-child) {
        color: #ed4956;
        font-weight: bold;
    }
`;

interface UserActionModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

const UserActionModal = ({ onModalOn, onModalOff }: UserActionModalProps) => {
    const dispatch = useAppDispatch();
    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <UserActionModalInner>
                <div
                    className="articleMenuModal-report"
                    onClick={() => {
                        dispatch(selectModal("block"));
                    }}
                >
                    차단
                </div>
                <div
                    className="articleMenuModal-report"
                    onClick={() => {
                        console.log("제한");
                    }}
                >
                    제한
                </div>
                <div
                    className="articleMenuModal-report"
                    onClick={() => {
                        console.log("신고");
                    }}
                >
                    신고
                </div>
                <div className="articleMenuModal-report" onClick={onModalOff}>
                    취소
                </div>
            </UserActionModalInner>
        </ModalCard>
    );
};

export default UserActionModal;

import React from "react";
import ModalCard from "styles/UI/ModalCard";
import styled from "styled-components";
import { useAppDispatch } from "app/store/Hooks";
import { logout } from "app/store/ducks/auth/authThunk";

const SettingModalInner = styled.div`
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
`;

interface SettingModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

const SettingModal = ({ onModalOn, onModalOff }: SettingModalProps) => {
    const dispatch = useAppDispatch();
    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <SettingModalInner>
                <div>비밀번호 변경</div>
                <div>네임 태그</div>
                <div>앱 및 웹사이트</div>
                <div>알림</div>
                <div>개인정보 및 보안</div>
                <div>로그인 활동</div>
                <div>Instagram에서 보낸 이메일</div>
                <div>문제 신고</div>
                <div onClick={() => dispatch(logout())}>로그아웃</div>
                <div onClick={onModalOff}>취소</div>
            </SettingModalInner>
        </ModalCard>
    );
};

export default SettingModal;

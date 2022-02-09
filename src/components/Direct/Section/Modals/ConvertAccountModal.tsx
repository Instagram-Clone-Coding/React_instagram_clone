import React from "react";
import styled from "styled-components";
import { ReactComponent as Checked } from "assets/Svgs/filled-checked-icon.svg";
import ModalCard from "styles/UI/ModalCard";
import { useAppDispatch } from "app/store/Hooks";
import { closeModal, openModal } from "app/store/ducks/direct/DirectSlice";

const ConvertAccountModalContainer = styled.div`
    padding-top: 20px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;

    h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid #dbdbdb;
    }

    .accounts-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;

        .user-profile {
            display: flex;
            align-items: center;
            font-size: 13px;
            font-weight: 500;

            img {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }

    .to-login-button {
        border-top: 1px solid #dbdbdb;
        padding: 20px;

        button {
            color: #0096f5;
        }
    }
`;

const ConvertAccountModal = () => {
    const dispatch = useAppDispatch();

    return (
        <ModalCard
            modalType={"withBackDrop"}
            onModalOn={() => {
                dispatch(openModal("convertAccount"));
            }}
            onModalOff={() => {
                dispatch(closeModal());
            }}
        >
            <ConvertAccountModalContainer>
                <h1>계정 전환</h1>
                <div className="accounts-section">
                    <div className="user-profile">
                        <img
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150"
                            alt="유저이미지"
                        />
                        <div className="username">gaebokchi</div>
                    </div>
                    <Checked />
                </div>
                <div className="accounts-section">
                    <div className="user-profile">
                        <img
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150"
                            alt="유저이미지"
                        />
                        <div className="username">gaebokchi</div>
                    </div>
                    <Checked />
                </div>
                <div className="accounts-section">
                    <div className="user-profile">
                        <img
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150"
                            alt="유저이미지"
                        />
                        <div className="username">gaebokchi</div>
                    </div>
                    <Checked />
                </div>
                <div className="to-login-button">
                    <button>기존 계정으로 로그인</button>
                </div>
            </ConvertAccountModalContainer>
        </ModalCard>
    );
};

export default ConvertAccountModal;

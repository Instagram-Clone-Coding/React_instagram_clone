import { changePassword } from "app/store/ducks/edit/editThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { authorizedCustomAxios } from "customAxios";
import useInput from "hooks/useInput";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import Notification from "styles/UI/Notification";

const PasswordEditContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .profile {
        display: flex;
        align-items: center;
        gap: 20px;
        img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
        }

        .username {
            font-size: 24px;
            font-weight: 400;
            line-height: 38px;
        }
    }
    .input-wrapper {
        margin-top: 50px;
        .input {
            display: flex;
            margin-bottom: 20px;
            aside {
                text-align: right;
                padding-right: 32px;
                margin-top: 6px;
                font-size: 16px;
                font-weight: 600;
                line-height: 18px;
            }

            input {
                border: 1px solid #dbdbdb;

                background: ${({ theme }) => theme.color.bg_gray};
                border-radius: 6px;
                font-size: 16px;
                height: 32px;
                padding: 20px;
                width: 100%;
            }
        }
    }
`;

const PasswordEdit = () => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(({ auth }) => auth.userInfo);
    const [errMsg, setErrMsg] = useState<string>("");

    const oldPassword = useInput("");
    const newPassword = useInput("");
    const newPasswordConfirm = useInput("");
    const changePasswordHandler = async () => {
        if (newPassword[0].value !== newPasswordConfirm[0].value) {
            setErrMsg("두 비밀번호가 일치하는지 확인하세요");
            return;
        }

        const body = {
            newPassword: newPassword[0].value,
            oldPassword: oldPassword[0].value,
        };

        const data = dispatch(changePassword(body)).unwrap();

        // if (data.status === 401) {
        // }
    };
    return (
        <PasswordEditContainer>
            {errMsg.length > 0 && <Notification text={errMsg} />}

            <div className="profile">
                <img
                    src={userInfo?.memberImageUrl}
                    alt="profile"
                    className="user-image"
                />
                <span className="username">{userInfo?.memberUsername}</span>
            </div>
            <div className="input-wrapper">
                <div className="input">
                    <aside>
                        <label htmlFor="prev">이전 비밀번호</label>
                    </aside>
                    <input type="password" name="prev" {...oldPassword[0]} />
                </div>
                <div className="input">
                    <aside>
                        <label htmlFor="prev">새 비밀번호</label>
                    </aside>
                    <input type="password" name="prev" {...newPassword[0]} />
                </div>
                <div className="input">
                    <aside>
                        <label htmlFor="prev">새 비밀번호 확인</label>
                    </aside>
                    <input
                        type="password"
                        name="prev"
                        {...newPasswordConfirm[0]}
                    />
                </div>
            </div>
            <div className="button-wrapper">
                <Button
                    bgColor="#0095f6"
                    color="#fff"
                    onClick={changePasswordHandler}
                >
                    비밀번호 변경{" "}
                </Button>
            </div>
        </PasswordEditContainer>
    );
};

export default PasswordEdit;

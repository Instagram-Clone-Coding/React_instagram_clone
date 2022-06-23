import { getUserInfo } from "app/store/ducks/auth/authThunk";
import { useAppDispatch } from "app/store/Hooks";
import { authorizedCustomAxios } from "customAxios";
import React, { ChangeEvent } from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

interface ProfileImageModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}
const ProfileImageModalInner = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        color: ${({ theme }) => theme.font.default_black};
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;

        margin: 32px 32px 20px;
        text-align: center;
    }

    .button-wrapper {
        display: flex;
        flex-direction: column;

        label {
            border-top: 1px solid ${({ theme }) => theme.color.bd_gray};
            padding: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.color.blue};
            cursor: pointer;
            text-align: center;
        }

        & > div {
            border-top: 1px solid ${({ theme }) => theme.color.bd_gray};
            padding: 16px;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
        }

        .delete-button {
            button {
                color: ${({ theme }) => theme.font.red};
            }
        }
    }
`;

const ProfileImageModal = ({
    onModalOff,
    onModalOn,
}: ProfileImageModalProps) => {
    const dispatch = useAppDispatch();

    const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        let frm = new FormData();

        frm.append("uploadedImage", e.target.files[0]);

        await authorizedCustomAxios.post("/accounts/image", frm); // 이미지 바꾸기
        await dispatch(getUserInfo()); // 이미지 바꾼거 적용하려면 새로 userInfo 불러옴
        onModalOff(); // 모달창꺼줌
    };

    const imageDeleteHandler = async () => {
        await authorizedCustomAxios.delete("accounts/image");
        await dispatch(getUserInfo());
        onModalOff();
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <ProfileImageModalInner>
                <div className="title">프로필 사진 바꾸기</div>

                <div className="button-wrapper">
                    <label htmlFor="img">사진 업로드</label>
                    <input
                        onChange={imageUploadHandler}
                        type="file"
                        id="img"
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <div className="delete-button" onClick={imageDeleteHandler}>
                        <button>현재 사진 삭제</button>
                    </div>

                    <div className="cancel-button" onClick={onModalOff}>
                        <button>취소</button>
                    </div>
                </div>
            </ProfileImageModalInner>
        </ModalCard>
    );
};

export default ProfileImageModal;

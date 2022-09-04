import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

const StyledUploadWarningModalInner = styled.div`
    width: 100%;
    & * {
        text-align: center;
    }
    & > .warning__header {
        margin: 32px 32px 16px 32px;
        & > h3 {
            font-weight: ${(props) => props.theme.font.bold};
            font-size: 18px;
        }
        & > div {
            padding-top: 16px;
            color: ${(props) => props.theme.font.gray};
        }
    }
    & > .warning__delete,
    & > .warning__cancel {
        display: block;
        width: 100%;
        border-top: 1px solid ${(props) => props.theme.color.bd_gray};
        padding: 4px 8px;
        line-height: 40px;
        min-height: 48px;
    }
    & > .warning__delete {
        margin-top: 16px;
        color: ${(props) => props.theme.font.red};
    }
    & > .warning__cancel {
        font-weight: normal;
    }
`;

const UploadWarningModal = () => {
    const purposeOfWarningModal = useAppSelector(
        ({ upload }) => upload.purposeOfWarningModal,
    );
    const dispatch = useAppDispatch();

    const deleteBtnClickHandler = () => {
        if (purposeOfWarningModal === "toDragAndDrop") {
            dispatch(uploadActions.prevStep());
        } else {
            dispatch(uploadActions.cancelUpload());
        }
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={() =>
                dispatch(uploadActions.startWarningModal(purposeOfWarningModal))
            }
            onModalOff={() => dispatch(uploadActions.cancelWarningModal())}
        >
            <StyledUploadWarningModalInner>
                <div className="warning__header">
                    <h3>게시물을 삭제하시겠어요?</h3>
                    <div>지금 나가면 수정 내용이 저장되지 않습니다.</div>
                </div>
                <button
                    className="warning__delete"
                    onClick={deleteBtnClickHandler}
                >
                    삭제
                </button>
                <button
                    className="warning__cancel"
                    onClick={() => dispatch(uploadActions.cancelWarningModal())}
                >
                    취소
                </button>
            </StyledUploadWarningModalInner>
        </ModalCard>
    );
};

export default UploadWarningModal;

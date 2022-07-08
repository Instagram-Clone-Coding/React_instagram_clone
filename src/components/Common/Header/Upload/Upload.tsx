import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalCard from "styles/UI/ModalCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import DragAndDrop from "components/Common/Header/Upload/DragAndDrop";
import Cut from "components/Common/Header/Upload/Cut";
import Edit from "components/Common/Header/Upload/Edit";
import Content from "components/Common/Header/Upload/Content";

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
interface ModalInnerProps {
    backdropWidth: number;
}

const StyledUploadModalInner = styled.div<ModalInnerProps>`
    width: 100%;
    height: 100%;
    & > svg {
        position: fixed;
        top: 10px;
        right: 10px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border-radius: 12px;
`;

const BORDER_TOTAL_WIDTH = 2;

const Upload = () => {
    const dispatch = useAppDispatch();
    const step = useAppSelector(({ upload }) => upload.step);
    const isGrabbing = useAppSelector(({ upload }) => upload.isGrabbing);
    const [backDropwidth, setBackDropWidth] = useState(window.innerWidth);
    const [backDropHeight, setBackDropHeight] = useState(window.innerHeight);
    const [isWarningModalOn, setIsWarningModalOn] = useState(false);
    const currentWidth = useMemo(
        () => (backDropwidth < 1140 ? backDropwidth - 219 : 920),
        [backDropwidth],
    );
    const currentMaxWidth = useMemo(
        () => (backDropwidth <= 1227 ? backDropwidth - 372 : 855),
        [backDropwidth],
    );

    const currentHeightLimitedByWindowHeight = useMemo(
        () =>
            Math.min(
                currentWidth + BORDER_TOTAL_WIDTH + 43,
                backDropHeight - 184,
            ),
        [currentWidth, backDropHeight],
    );

    const currentWidthLimitedByWindowHeight = useMemo(
        () =>
            Math.min(currentHeightLimitedByWindowHeight - 43, currentMaxWidth),
        [currentHeightLimitedByWindowHeight, currentMaxWidth],
    );
    useEffect(() => {
        window.addEventListener("resize", () => {
            setBackDropWidth(window.innerWidth);
            setBackDropHeight(window.innerHeight);
        });
        return () => {
            window.removeEventListener("resize", () => {
                setBackDropWidth(window.innerWidth);
                setBackDropHeight(window.innerHeight);
            });
        };
    }, []);

    const currentComponent = useCallback(
        (step: UploadType.StepType) => {
            switch (step) {
                case "dragAndDrop":
                    return <DragAndDrop />;
                case "cut":
                    return (
                        <Cut currentWidth={currentWidthLimitedByWindowHeight} />
                    );
                case "edit":
                    return (
                        <Edit
                            currentWidth={currentWidthLimitedByWindowHeight}
                        />
                    );
                case "content":
                    return (
                        <Content
                            currentWidth={currentWidthLimitedByWindowHeight}
                        />
                    );
            }
        },
        [currentWidthLimitedByWindowHeight],
    );

    const checkIsGrabbingAndCancelUpload = () => {
        if (isGrabbing) {
            dispatch(uploadActions.stopGrabbing());
        } else {
            setIsWarningModalOn(true);
            // dispatch(uploadActions.cancelUpload());
        }
    };

    return (
        <>
            {isWarningModalOn && (
                <ModalCard
                    modalType="withBackDrop"
                    onModalOn={() => setIsWarningModalOn(true)}
                    onModalOff={() => setIsWarningModalOn(false)}
                >
                    <StyledUploadWarningModalInner>
                        <div className="warning__header">
                            <h3>게시물을 삭제하시겠어요?</h3>
                            <div>
                                지금 나가면 수정 내용이 저장되지 않습니다.
                            </div>
                        </div>
                        <button className="warning__delete">삭제</button>
                        <button className="warning__cancel">취소</button>
                    </StyledUploadWarningModalInner>
                </ModalCard>
            )}
            <ModalCard
                modalType="withBackDrop"
                onModalOn={() => dispatch(uploadActions.startUpload())}
                onModalOff={checkIsGrabbingAndCancelUpload}
                isWithCancelBtn={true}
                width={
                    currentWidthLimitedByWindowHeight +
                    (step !== "edit" && step !== "content" ? 0 : 340)
                }
                height={currentHeightLimitedByWindowHeight}
                maxWidth={
                    currentMaxWidth +
                    BORDER_TOTAL_WIDTH +
                    (step !== "edit" && step !== "content" ? 0 : 340)
                }
                maxHeight={currentMaxWidth + BORDER_TOTAL_WIDTH + 43}
                minWidth={
                    348 +
                    BORDER_TOTAL_WIDTH +
                    (step !== "edit" && step !== "content" ? 0 : 340)
                }
                minHeight={391 + BORDER_TOTAL_WIDTH}
            >
                <StyledUploadModalInner
                    backdropWidth={backDropwidth}
                    onMouseUp={() => dispatch(uploadActions.stopGrabbing())}
                >
                    {currentComponent(step)}
                </StyledUploadModalInner>
            </ModalCard>
        </>
    );
};

export default Upload;

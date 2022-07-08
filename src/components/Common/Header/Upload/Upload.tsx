import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalCard from "styles/UI/ModalCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import DragAndDrop from "components/Common/Header/Upload/DragAndDrop";
import Cut from "components/Common/Header/Upload/Cut";
import Edit from "components/Common/Header/Upload/Edit";
import Content from "components/Common/Header/Upload/Content";
import UploadWarningModal from "components/Common/Header/Upload/UploadWarningModal";

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
    const isWarningModalOn = useAppSelector(
        ({ upload }) => upload.isWarningModalOn,
    );
    const [backDropwidth, setBackDropWidth] = useState(window.innerWidth);
    const [backDropHeight, setBackDropHeight] = useState(window.innerHeight);
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
            dispatch(uploadActions.startWarningModal());
        }
    };

    return (
        <>
            {isWarningModalOn && <UploadWarningModal />}
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

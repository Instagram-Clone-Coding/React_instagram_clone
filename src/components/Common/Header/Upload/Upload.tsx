import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalCard from "styles/UI/ModalCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { ReactComponent as BackIcon } from "assets/Svgs/back.svg";
import DragAndDrop from "components/Common/Header/Upload/DragAndDrop";
import Cut from "components/Common/Header/Upload/Cut";
import Edit from "components/Common/Header/Upload/Edit";

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
    & > .upload__header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 42px;
        min-height: 42px;
        border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};
        & > h1 {
            font-weight: ${(props) => props.theme.font.bold};
            flex-grow: 1;
            text-align: center;
            font-size: 16px;
        }
        & > div {
            flex: 0 0 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20px;
            & > .upload__next {
                color: ${(props) => props.theme.color.blue};
                font-weight: ${(props) => props.theme.font.bold};
            }
        }
    }
`;

const BORDER_TOTAL_WIDTH = 2;

const Upload = () => {
    const dispatch = useAppDispatch();
    const step = useAppSelector(({ upload }) => upload.step);
    const isGrabbing = useAppSelector(({ upload }) => upload.isGrabbing);
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

    const currentWidthLimitedByWindowHeight = useMemo(
        () =>
            Math.min(
                currentWidth + BORDER_TOTAL_WIDTH + 43,
                backDropHeight - 184,
            ) - 43,
        [currentWidth, backDropHeight],
    );
    const currentHeightLimitedByWindowHeight = useMemo(
        () =>
            Math.min(
                currentWidth + BORDER_TOTAL_WIDTH + 43,
                backDropHeight - 184,
            ),
        [currentWidth, backDropHeight],
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

    const currentHeading = useCallback((step: UploadType.StepType) => {
        switch (step) {
            case "dragAndDrop":
                return "새 게시물 만들기";
            case "cut":
                return "자르기";
            case "edit":
                return "편집";
        }
    }, []);

    const currentComponent = useCallback(
        (step: UploadType.StepType) => {
            switch (step) {
                case "dragAndDrop":
                    return <DragAndDrop />;
                case "cut":
                    return (
                        <Cut
                            currentWidth={Math.min(
                                currentWidthLimitedByWindowHeight,
                                currentMaxWidth,
                            )}
                        />
                    );
                case "edit":
                    return <Edit />;
            }
        },
        [currentWidthLimitedByWindowHeight, currentMaxWidth],
    );

    const checkIsGrabbingAndCancelUpload = () => {
        console.log("is triggered");
        if (isGrabbing) {
            dispatch(uploadActions.stopGrabbing());
        } else {
            dispatch(uploadActions.cancelUpload());
        }
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={() => dispatch(uploadActions.startUpload())}
            onModalOff={checkIsGrabbingAndCancelUpload}
            isWithCancelBtn={true}
            width={currentWidthLimitedByWindowHeight}
            height={currentHeightLimitedByWindowHeight}
            maxWidth={currentMaxWidth + BORDER_TOTAL_WIDTH}
            maxHeight={currentMaxWidth + BORDER_TOTAL_WIDTH + 43}
            minWidth={348 + BORDER_TOTAL_WIDTH}
            minHeight={391 + BORDER_TOTAL_WIDTH}
        >
            <StyledUploadModalInner
                backdropWidth={backDropwidth}
                onMouseUp={() => dispatch(uploadActions.stopGrabbing())}
            >
                <div className="upload__header">
                    {step !== "dragAndDrop" && (
                        <div onClick={() => dispatch(uploadActions.prevStep())}>
                            <button>
                                <BackIcon />
                            </button>
                        </div>
                    )}
                    <h1>{currentHeading(step)}</h1>
                    {step !== "dragAndDrop" && (
                        <div onClick={() => dispatch(uploadActions.nextStep())}>
                            <button className="upload__next">다음</button>
                        </div>
                    )}
                </div>
                {currentComponent(step)}
            </StyledUploadModalInner>
        </ModalCard>
    );
};

export default Upload;

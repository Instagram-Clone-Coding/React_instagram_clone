import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, { useCallback } from "react";
import { ReactComponent as BackIcon } from "assets/Svgs/back.svg";
import styled from "styled-components";
import { uploadArticle } from "app/store/ducks/upload/uploadThunk";

const StyledUploadHeader = styled.header`
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
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        & > button {
            text-align: center;
            padding: 16px;
        }
        & > .upload__next {
            color: ${(props) => props.theme.color.blue};
            font-weight: ${(props) => props.theme.font.bold};
        }
    }
`;

interface UploadHeaderProps {
    excuteBeforePrevStep?: () => void;
    excuteBeforeNextStep?: () => void;
}

const UploadHeader = ({
    excuteBeforeNextStep,
    excuteBeforePrevStep,
}: UploadHeaderProps) => {
    const dispatch = useAppDispatch();
    const step = useAppSelector((state) => state.upload.step);

    const currentHeading = useCallback((step: UploadType.StepType) => {
        switch (step) {
            case "dragAndDrop":
                return "새 게시물 만들기";
            case "cut":
                return "자르기";
            case "edit":
                return "편집";
            case "content":
                return "새 게시물 만들기";
            case "uploading":
                return "공유 중입니다";
            case "complete":
                return "게시물이 공유되었습니다";
        }
    }, []);

    const prevStepClickHandler = () => {
        if (excuteBeforePrevStep) excuteBeforePrevStep();
        if (step !== "cut") dispatch(uploadActions.prevStep());
    };
    const nextStepClickHandler = async (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        if (excuteBeforeNextStep) {
            excuteBeforeNextStep();
        }
        if (step !== "content") {
            dispatch(uploadActions.nextStep());
        } else {
            event.preventDefault();
            await dispatch(uploadArticle());
        }
    };

    return (
        <StyledUploadHeader>
            {step !== "dragAndDrop" &&
                step !== "uploading" &&
                step !== "complete" && (
                    <div onClick={prevStepClickHandler}>
                        <button>
                            <BackIcon />
                        </button>
                    </div>
                )}
            <h1>{currentHeading(step)}</h1>
            {step !== "dragAndDrop" &&
                step !== "uploading" &&
                step !== "complete" && (
                    <div onClick={nextStepClickHandler}>
                        <button className="upload__next">
                            {step === "content" ? "공유하기" : "다음"}
                        </button>
                    </div>
                )}
        </StyledUploadHeader>
    );
};

export default UploadHeader;

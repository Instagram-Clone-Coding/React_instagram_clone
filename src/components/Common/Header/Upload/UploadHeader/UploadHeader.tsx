import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, { useCallback } from "react";
import { ReactComponent as BackIcon } from "assets/Svgs/back.svg";
import styled from "styled-components";

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
        }
    }, []);

    const prevStepClickHandler = () => {
        if (excuteBeforePrevStep) {
            excuteBeforePrevStep();
        }
        dispatch(uploadActions.prevStep());
    };
    const nextStepClickHandler = () => {
        if (excuteBeforeNextStep) {
            excuteBeforeNextStep();
        }
        dispatch(uploadActions.nextStep());
    };

    return (
        <StyledUploadHeader>
            {step !== "dragAndDrop" && (
                <div onClick={prevStepClickHandler}>
                    <button>
                        <BackIcon />
                    </button>
                </div>
            )}
            <h1>{currentHeading(step)}</h1>
            {step !== "dragAndDrop" && (
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

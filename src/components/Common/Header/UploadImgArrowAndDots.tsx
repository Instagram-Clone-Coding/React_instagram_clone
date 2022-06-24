import React from "react";
import { ReactComponent as LeftArrow } from "assets/Svgs/leftArrow.svg";
import { ReactComponent as RightArrow } from "assets/Svgs/rightArrow.svg";
import styled from "styled-components";
import { useAppDispatch } from "app/store/Hooks";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";

const Wrapper = styled.div`
    & > .upload__leftArrow,
    & > .upload__rightArrow {
        transform: translateY(-50%);
        position: absolute;
        z-index: 999;
        background-color: rgba(26, 26, 26, 0.8);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.2s;
        &:hover {
            background-color: rgba(26, 26, 26, 0.5);
        }
    }
    & > .upload__leftArrow {
        left: 8px;
    }
    & > .upload__rightArrow {
        right: 8px;
    }
    & > .upload__imgDots {
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        & > div {
            background-color: ${(props) => props.theme.font.gray};
            border-radius: 50%;
            width: 6px;
            height: 6px;
            &.current {
                background-color: ${(props) => props.theme.color.blue};
            }
        }
        & > div:not(:last-child) {
            margin-right: 4px;
        }
    }
`;

interface UploadImgArrowAndDotsProps {
    currentIndex: number;
    files: UploadType.FileProps[];
    onLeftArrowClick?: () => void;
    onRightArrowClick?: () => void;
}

// 상위 컴포넌트에 position: relative 속성을 추가하여 사용 가능
// 각 arrow 클릭 시 index 이동 dispatch는 이미 포함되어 있음
const UploadImgArrowAndDots = ({
    currentIndex,
    files,
    onLeftArrowClick,
    onRightArrowClick,
}: UploadImgArrowAndDotsProps) => {
    const dispatch = useAppDispatch();
    return (
        <Wrapper>
            {currentIndex > 0 && (
                <button
                    className="upload__leftArrow"
                    onClick={() => {
                        onLeftArrowClick && onLeftArrowClick();
                        dispatch(uploadActions.prevIndex());
                    }}
                >
                    <LeftArrow />
                </button>
            )}
            {currentIndex < files.length - 1 && (
                <button
                    className="upload__rightArrow"
                    onClick={() => {
                        onRightArrowClick && onRightArrowClick();
                        dispatch(uploadActions.nextIndex());
                    }}
                >
                    <RightArrow />
                </button>
            )}
            <div className="upload__imgDots">
                {files.map((file, index) => (
                    <div
                        key={file.url}
                        className={`${currentIndex === index ? "current" : ""}`}
                    ></div>
                ))}
            </div>
        </Wrapper>
    );
};

export default UploadImgArrowAndDots;

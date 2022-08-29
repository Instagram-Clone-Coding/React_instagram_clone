import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as LeftArrow } from "assets/Svgs/leftArrow.svg";
import { ReactComponent as RightArrow } from "assets/Svgs/rightArrow.svg";
import EditCanvasUnit from "components/Common/Header/Upload/Edit/EditCanvasUnit";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React, { ChangeEvent, useMemo, useState } from "react";
import styled from "styled-components";

const StyledEdit = styled.div`
    display: flex;
    width: 100%;
    min-width: ${348 + 340}px;
    height: 100%;
    min-height: ${348}px;
    & > .upload__imgCanvasLayout {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.color.bg_gray};
        position: relative;
        & > button {
            position: absolute;
            width: 32px;
            height: 32px;
            background-color: rgba(26, 26, 26, 0.8);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
            &:hover {
                background-color: rgba(26, 26, 26, 0.5);
            }
        }
        & > .left {
            left: 8px;
        }
        & > .right {
            right: 8px;
        }
    }
    & > .upload__imgEditor {
        width: 340px;
        min-width: 340px;
        max-width: 340px;
        border-left: 1px solid ${(props) => props.theme.color.bd_gray};
        & > .header {
            display: flex;
            height: 53px;
            width: 100%;
            & > div {
                flex: 1;
                text-align: center;
                font-size: 16px;
                line-height: 24px;
                padding: 14px 0;
                font-weight: ${(props) => props.theme.font.bold};
                border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};
                color: ${(props) => props.theme.color.bd_gray};
                cursor: pointer;
                transition: all 0.2s;
                &.active {
                    border-bottom: 1px solid black;
                    color: black;
                }
            }
        }
        & > .adjust__input {
            padding: 0 16px;
            & > div {
                width: 100%;
            }
            & > div:first-child {
                padding: 14px 0;
                display: flex;
                justify-content: space-between;
                line-height: 24px;
                & > button {
                    color: ${(props) => props.theme.color.blue};
                    display: none;
                    &.entered {
                        display: block;
                    }
                }
            }
            & > div:last-child {
                height: 36px;
                display: flex;
                align-items: center;
                & > input {
                    flex: 1;
                    // range background 제거
                    -webkit-appearance: none;
                    background: transparent;
                    border: none;
                    height: 2px;
                    &::-webkit-slider-thumb {
                        -webkit-appearance: none; // 동그라미 제거
                        background-color: black;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                    }
                    /* &::-moz-range-thumb {
                    } */
                }
                & > div {
                    width: 24px;
                    margin-left: 8px;
                    text-align: right;
                }
            }
        }
    }
`;

interface EditProps {
    currentWidth: number;
}

const MIN_WIDTH = 348;

const getCanvasSize = (
    ratioMode: UploadType.RatioType,
    processedCanvasLayoutWidth: number,
) => {
    switch (ratioMode) {
        case "square":
            return {
                width: processedCanvasLayoutWidth,
                height: processedCanvasLayoutWidth,
            };
        case "original":
            return {
                width: processedCanvasLayoutWidth,
                height: processedCanvasLayoutWidth / 1.93,
            };
        case "thin":
            return {
                width: processedCanvasLayoutWidth * 0.8,
                height: processedCanvasLayoutWidth,
            };
        case "fat":
            return {
                width: processedCanvasLayoutWidth,
                height: (processedCanvasLayoutWidth * 9) / 16,
            };
    }
};

// 기존 함수를 제거하고, Canvas에서 이미지를 뽑아내었을 때 원본 이미지의 해상도를 유지하기 위해 Canvas width, height를 정밀하게 정하는 함수를 작성했습니다.
export const getNewImageSizeBasedOnOriginal = (
    ratioMode: UploadType.RatioType,
    currentFile: UploadType.FileProps,
) => {
    const { width, height, imageRatio } = currentFile;
    const scaledWidth = width / (currentFile.scale / 100 + 1);
    const scaledHeight = height / (currentFile.scale / 100 + 1);
    switch (ratioMode) {
        case "thin":
            if (imageRatio > 1) {
                return getCanvasSize(ratioMode, scaledHeight);
            } else {
                return {
                    width: scaledWidth,
                    height: (scaledWidth * 5) / 4,
                };
            }
        case "original":
            return { width: scaledWidth, height: scaledWidth / 1.93 };
        case "fat":
            return { width: scaledWidth, height: (scaledWidth * 9) / 16 };
        case "square":
            if (imageRatio > 1) {
                return {
                    width: scaledHeight,
                    height: scaledHeight,
                };
            } else {
                return {
                    width: scaledWidth,
                    height: scaledWidth,
                };
            }
    }
};

const Edit = ({ currentWidth }: EditProps) => {
    const files = useAppSelector((state) => state.upload.files);
    const ratioMode = useAppSelector((state) => state.upload.ratioMode);
    const currentIndex = useAppSelector((state) => state.upload.currentIndex);
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState<"filter" | "adjust">("filter");
    const [enteredAdjustInput, setEnteredAdjustInput] =
        useState<null | UploadType.AdjustInputTextType>(null);

    // window 너비에 따라 변경되는 값
    const processedCanvasLayoutWidth = useMemo(
        () => (currentWidth <= MIN_WIDTH ? MIN_WIDTH : currentWidth),
        [currentWidth],
    );
    const canvasSize = useMemo(
        () => getCanvasSize(ratioMode, processedCanvasLayoutWidth),
        [processedCanvasLayoutWidth, ratioMode],
    );

    const adjustInputs: {
        text: UploadType.AdjustInputTextType;
        value: number;
    }[] = useMemo(
        () => [
            { text: "밝기", value: files[currentIndex].brightness },
            { text: "대비", value: files[currentIndex].contrast },
            { text: "채도", value: files[currentIndex].saturate },
            { text: "흐리게", value: files[currentIndex].blur },
        ],
        [currentIndex, files],
    );

    return (
        <>
            <UploadHeader
                excuteBeforeNextStep={() =>
                    dispatch(uploadActions.resetNewFileUrl())
                }
            />
            <StyledEdit>
                <div
                    className="upload__imgCanvasLayout"
                    style={{
                        width: processedCanvasLayoutWidth + "px",
                        minWidth: processedCanvasLayoutWidth + "px",
                        minHeight: processedCanvasLayoutWidth + "px",
                    }}
                >
                    <EditCanvasUnit
                        currentCanvasWidth={canvasSize.width}
                        currentCanvasHeight={canvasSize.height}
                        currentFile={files[currentIndex]}
                    />
                    {currentIndex > 0 && (
                        <button
                            className="left"
                            onClick={() => dispatch(uploadActions.prevIndex())}
                        >
                            <LeftArrow />
                        </button>
                    )}
                    {currentIndex < files.length - 1 && (
                        <button
                            className="right"
                            onClick={() => dispatch(uploadActions.nextIndex())}
                        >
                            <RightArrow />
                        </button>
                    )}
                </div>
                <div className="upload__imgEditor">
                    <div className="header">
                        <div
                            className={`filter ${
                                editMode === "filter" ? "active" : ""
                            }`}
                            onClick={() => setEditMode("filter")}
                        >
                            필터
                        </div>
                        <div
                            className={`adjust ${
                                editMode === "adjust" ? "active" : ""
                            }`}
                            onClick={() => setEditMode("adjust")}
                        >
                            조정
                        </div>
                    </div>
                    {editMode === "adjust" ? (
                        adjustInputs.map((inputObj) => (
                            <div
                                key={inputObj.text}
                                className="adjust__input"
                                onMouseEnter={() =>
                                    setEnteredAdjustInput(inputObj.text)
                                }
                                onMouseLeave={() => setEnteredAdjustInput(null)}
                            >
                                <div>
                                    <div>{inputObj.text}</div>
                                    {inputObj.value !== 0 && (
                                        <button
                                            className={
                                                enteredAdjustInput ===
                                                inputObj.text
                                                    ? "entered"
                                                    : ""
                                            }
                                            onClick={() =>
                                                dispatch(
                                                    uploadActions.resetAdjustInput(
                                                        inputObj.text,
                                                    ),
                                                )
                                            }
                                        >
                                            재설정
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            dispatch(
                                                uploadActions.changeAdjustInput(
                                                    {
                                                        type: inputObj.text,
                                                        value: Number(
                                                            event.target.value,
                                                        ),
                                                    },
                                                ),
                                            )
                                        }
                                        value={inputObj.value}
                                        min={
                                            inputObj.text === "흐리게"
                                                ? 0
                                                : -100
                                        }
                                        max="100"
                                        step="1"
                                        style={{
                                            backgroundImage:
                                                inputObj.text !== "흐리게"
                                                    ? `linear-gradient(to right, rgb(219, 219, 219) 0%, 
                                    rgb(219, 219, 219) ${Math.min(
                                        50,
                                        inputObj.value / 2 + 50,
                                    )}%, rgb(38, 38, 38) ${Math.min(
                                                          50,
                                                          inputObj.value / 2 +
                                                              50,
                                                      )}%,
                                     rgb(38, 38, 38)   ${Math.max(
                                         50,
                                         inputObj.value / 2 + 50,
                                     )}%, rgb(219, 219, 219)  ${Math.max(
                                                          50,
                                                          inputObj.value / 2 +
                                                              50,
                                                      )}%, rgb(219, 219, 219) 100%)`
                                                    : `linear-gradient(to right, rgb(38, 38, 38) 0%, rgb(38, 38, 38) ${inputObj.value}%, rgb(219, 219, 219) ${inputObj.value}%, rgb(219, 219, 219) 100%)`,
                                        }}
                                    />
                                    <div>{inputObj.value}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>hello</div>
                    )}
                </div>
            </StyledEdit>
        </>
    );
};

export default Edit;

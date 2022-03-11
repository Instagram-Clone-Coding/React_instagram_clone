import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as LeftArrow } from "assets/Svgs/leftArrow.svg";
import { ReactComponent as RightArrow } from "assets/Svgs/rightArrow.svg";
import React, {
    ChangeEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";

const StyledEdit = styled.div`
    display: flex;
    width: 100%;
    min-width: ${348 + 340 + 2}px;
    height: 100%;
    & > .upload__imgCanvasLayout {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.color.bg_gray};
        position: relative;
        & > .upload__imgCanvas {
        }
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
            }
            & > div:last-child {
                & > input {
                    width: 100%;
                }
            }
        }
    }
`;

interface EditProps {
    currentWidth: number;
}

const MIN_WIDTH = 348;

const Edit = ({ currentWidth }: EditProps) => {
    const files = useAppSelector((state) => state.upload.files);
    const ratioMode = useAppSelector((state) => state.upload.ratioMode);
    const currentIndex = useAppSelector((state) => state.upload.currentIndex);
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [editMode, setEditMode] = useState<"filter" | "adjust">("filter");

    // window 너비에 따라 변경되는 값
    const processedCanvasLayoutWidth = useMemo(
        () => (currentWidth <= MIN_WIDTH ? MIN_WIDTH : currentWidth),
        [currentWidth],
    );
    const canvasSize = useMemo(() => {
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
    }, [processedCanvasLayoutWidth, ratioMode]);

    const imgSize = useMemo(() => {
        const currentFile = files[currentIndex];
        if (ratioMode !== "square") {
            switch (ratioMode) {
                case "thin":
                    if (currentFile.imageRatio > 1) {
                        return {
                            width:
                                processedCanvasLayoutWidth *
                                currentFile.imageRatio *
                                (currentFile.scale / 100 + 1),
                            height:
                                processedCanvasLayoutWidth *
                                (currentFile.scale / 100 + 1),
                        };
                    } else {
                        return {
                            width:
                                processedCanvasLayoutWidth *
                                0.8 *
                                (currentFile.scale / 100 + 1),
                            height:
                                ((processedCanvasLayoutWidth * 0.8) /
                                    currentFile.imageRatio) *
                                (currentFile.scale / 100 + 1),
                        };
                    }
                case "original":
                    return {
                        width:
                            processedCanvasLayoutWidth *
                            (currentFile.scale / 100 + 1),
                        height:
                            (processedCanvasLayoutWidth /
                                currentFile.imageRatio) *
                            (currentFile.scale / 100 + 1),
                    };
                case "fat":
                    return {
                        width:
                            processedCanvasLayoutWidth *
                            (currentFile.scale / 100 + 1),
                        height:
                            (processedCanvasLayoutWidth /
                                currentFile.imageRatio) *
                            (currentFile.scale / 100 + 1),
                    };
            }
        } else {
            if (currentFile.imageRatio > 1) {
                return {
                    width:
                        processedCanvasLayoutWidth *
                        currentFile.imageRatio *
                        (currentFile.scale / 100 + 1),
                    height:
                        processedCanvasLayoutWidth *
                        (currentFile.scale / 100 + 1),
                };
            } else {
                return {
                    width:
                        processedCanvasLayoutWidth *
                        (currentFile.scale / 100 + 1),
                    height:
                        (processedCanvasLayoutWidth / currentFile.imageRatio) *
                        (currentFile.scale / 100 + 1),
                };
            }
        }
    }, [processedCanvasLayoutWidth, currentIndex, files, ratioMode]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const currentFile = files[currentIndex];
        if (context) {
            context.clearRect(0, 0, canvasSize.width, canvasSize.height);
            const img = new Image(imgSize.width, imgSize.height); // url만으로 canvas에 이미지를 그릴 수 없습니다. 생성자 함수를 통해 새로운 img 객체를 만들어줍니다.
            img.src = currentFile.url;
            img.onload = () => {
                // 이미지 로드가 완료되었을 떄 함수가 실행됩니다.
                // 이미지 자체의 시작지점(sx,sy)를 조작하면 이미지 크기가 초기화되버리므로,
                // canvas에 그리기 시작하는 좌표(dx,dy)를 조작하여 간접적으로 translate를 구현합니다.
                context.drawImage(
                    img,
                    -(
                        imgSize.width / 2 -
                        canvasSize.width / 2 -
                        currentFile.translateX
                    ),
                    -(
                        imgSize.height / 2 -
                        canvasSize.height / 2 -
                        currentFile.translateY
                    ),
                    img.width,
                    img.height,
                );
            };
        }
    }, [
        currentIndex,
        files,
        processedCanvasLayoutWidth,
        canvasSize.width,
        canvasSize.height,
        imgSize.width,
        imgSize.height,
    ]);

    const adjustInputs: {
        text: "밝기" | "대비" | "채도" | "흐리게";
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
        <StyledEdit>
            <div
                className="upload__imgCanvasLayout"
                style={{
                    width: processedCanvasLayoutWidth + "px",
                    minWidth: processedCanvasLayoutWidth + "px",
                    minHeight: processedCanvasLayoutWidth + "px",
                }}
            >
                <canvas
                    className="upload__imgCanvas"
                    ref={canvasRef}
                    {...canvasSize}
                >
                    <img
                        src={files[currentIndex].url}
                        {...imgSize}
                        alt={`${currentIndex + 1}번째 게시물`}
                    />
                </canvas>
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
                {adjustInputs.map((inputObj) => (
                    <div className="adjust__input">
                        <div>{inputObj.text}</div>
                        <div>
                            <input
                                type="range"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>,
                                ) =>
                                    dispatch(
                                        uploadActions.changeAdjustInput({
                                            type: inputObj.text,
                                            value: Number(event.target.value),
                                        }),
                                    )
                                }
                                value={inputObj.value}
                                min="-100"
                                max="100"
                                step="1"
                            />
                            <div>{inputObj.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </StyledEdit>
    );
};

export default Edit;
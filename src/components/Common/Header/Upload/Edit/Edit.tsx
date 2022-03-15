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
    min-width: ${348 + 340}px;
    height: 100%;
    min-height: ${348}px;
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

const Edit = ({ currentWidth }: EditProps) => {
    const files = useAppSelector((state) => state.upload.files);
    const ratioMode = useAppSelector((state) => state.upload.ratioMode);
    const currentIndex = useAppSelector((state) => state.upload.currentIndex);
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [editMode, setEditMode] = useState<"filter" | "adjust">("filter");
    const [enteredAdjustInput, setEnteredAdjustInput] =
        useState<null | UploadType.AdjustInputTextType>(null);

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
                context.filter = `brightness(${
                    currentFile.brightness / 3 + 100
                }%) contrast(${currentFile.contrast / 3 + 100}%) saturate(${
                    currentFile.saturate + 100
                }%) 
                blur(${currentFile.blur / 50}px)
                `;
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
                // 각각의 픽셀에 필터 준비
                // const imageData = context.getImageData(
                //     0,
                //     0,
                //     canvasSize.width,
                //     canvasSize.height,
                // );
                // const rgbArr = imageData.data;
                // for (let rIndex = 0; rIndex < rgbArr.length; rIndex += 4) {
                //     rgbArr[rIndex] -= currentFile.blur;
                //     rgbArr[rIndex + 1] -= currentFile.blur;
                //     rgbArr[rIndex + 2] -= currentFile.blur;
                // }
                // context.putImageData(imageData, 0, 0);
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
                                        enteredAdjustInput === inputObj.text
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
                                        uploadActions.changeAdjustInput({
                                            type: inputObj.text,
                                            value: Number(event.target.value),
                                        }),
                                    )
                                }
                                value={inputObj.value}
                                min={inputObj.text === "흐리게" ? 0 : -100}
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
                                                  inputObj.value / 2 + 50,
                                              )}%,
                                     rgb(38, 38, 38)   ${Math.max(
                                         50,
                                         inputObj.value / 2 + 50,
                                     )}%, rgb(219, 219, 219)  ${Math.max(
                                                  50,
                                                  inputObj.value / 2 + 50,
                                              )}%, rgb(219, 219, 219) 100%)`
                                            : `linear-gradient(to right, rgb(38, 38, 38) 0%, rgb(38, 38, 38) ${inputObj.value}%, rgb(219, 219, 219) ${inputObj.value}%, rgb(219, 219, 219) 100%)`,
                                }}
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

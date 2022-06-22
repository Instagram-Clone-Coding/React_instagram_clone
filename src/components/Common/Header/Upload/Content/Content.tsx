import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { getNewImageSizeBasedOnOriginal } from "components/Common/Header/Upload/Edit/Edit";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
    getRatioCalculatedBoxWidth,
    getRatioCalculatedBoxHeight,
} from "components/Common/Header/Upload/Cut/CutImgUnit";
import { ReactComponent as SmileFace } from "assets/Svgs/smileFace.svg";
import { ReactComponent as DownV } from "assets/Svgs/downV.svg";
import { ReactComponent as LocationIcon } from "assets/Svgs/location.svg";
import Picker, { IEmojiData } from "emoji-picker-react";

const StyledContent = styled.div`
    display: flex;
    & > .upload__contentImg {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > .upload__contents {
        width: 340px;
        min-width: 340px;
        max-width: 340px;

        & > .textareaBox {
            & > .textarea__header {
                margin: 18px 16px 14px 16px;
                display: flex;
                align-items: center;
                img {
                    width: 28px;
                    height: 28px;
                    margin-right: 12px;
                }
                div {
                    font-weight: ${(props) => props.theme.font.bold};
                    font-size: 16px;
                }
            }
            & > textarea {
                border: none;
                overflow: auto;
                outline: none;
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                resize: none; /*remove the resize handle on the bottom right*/
                width: 100%;
                height: 168px;
                padding: 0 16px;
                font-size: 16px;
                background: transparent;
            }
            & > .textarea__bottom {
                display: flex;
                justify-content: space-between;
                height: 30px;
                padding: 4px 16px 4px 8px;
                position: relative;
                .emoji-picker-react {
                    position: absolute;
                    left: -300px;
                    top: -200px;
                    width: 300px !important;
                    height: 400px;
                    @media (max-width: 800px) {
                        top: -100px;
                        height: 200px;
                    }
                }
                & > button {
                    color: #c7c7c7;
                    font-size: 12px;
                    font-weight: normal;
                    &:hover {
                        color: black;
                    }
                }
                & > svg {
                    color: ${(props) => props.theme.font.gray};
                    cursor: pointer;
                }
            }
        }
        & > .upload__contentOption {
            width: 100%;
            border-top: 1px solid ${(props) => props.theme.color.bd_gray};
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            min-height: 44px;
            cursor: pointer;
            & * {
                font-size: 16px;
            }
            & > .header,
            & > .activated {
                width: 100%;
                padding: 14px 16px;
            }
            & > .header {
                padding: 14px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                & > span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & > svg {
                        transform: rotate(180deg);
                        width: 16px;
                        height: 16px;
                    }
                    &.bold {
                        font-weight: ${(props) => props.theme.font.bold};
                    }
                    &.reverse {
                        transform: rotate(180deg);
                    }
                }
            }
            &.location > .header {
                & > input {
                    border: none;
                    background-color: transparent;
                }
                & > span {
                    & > svg {
                        transform: none;
                    }
                }
            }
            & > .activated {
                padding-top: 0;
                & .smallFont {
                    font-size: 12px;
                    color: ${(props) => props.theme.font.gray};
                }
                & > div {
                    height: 44px;
                    margin: 12px 0 16px 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    & > img,
                    & > input {
                        height: 44px;
                    }
                    & > input {
                        margin-left: 8px;
                        width: 255px;
                        background-color: transparent;
                        border-radius: 6px;
                        font-size: 14px;
                        padding: 4px 12px;
                    }
                }
            }
        }
        & > hr {
            width: 100%;
            margin: 0;
            border: 0;
            background-color: ${(props) => props.theme.color.bd_gray};
            height: 1px;
        }
    }
`;

interface ContentProps {
    currentWidth: number;
}

const Content = ({ currentWidth }: ContentProps) => {
    const dispatch = useAppDispatch();
    const { files, currentIndex, ratioMode, textareaValue } = useAppSelector(
        (state) => state.upload,
    );
    const { userInfo } = useAppSelector((state) => state.auth);
    const [isEmojiModalOn, setIsEmojiModalOn] = useState(false);
    const [isAccessOptionOn, setIsAccessOptionOn] = useState(false);
    const [isAdvancedOptionOn, setIsAdvancedOptionOn] = useState(false);

    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        dispatch(uploadActions.addEmojiOnTextarea(emojiObject.emoji));
        setIsEmojiModalOn(false);
    };

    const currentFile = useMemo(
        () => files[currentIndex],
        [files, currentIndex],
    );

    useEffect(() => {
        files.forEach((file, index) => {
            const blobImageSize = getNewImageSizeBasedOnOriginal(
                ratioMode,
                file,
            );
            const virtualCanvas = document.createElement("canvas");
            virtualCanvas.width = blobImageSize.width;
            virtualCanvas.height = blobImageSize.height;
            const ctx = virtualCanvas.getContext("2d");
            if (ctx) {
                const img = new Image(file.width, file.height); // url만으로 canvas에 이미지를 그릴 수 없습니다. 생성자 함수를 통해 새로운 img 객체를 만들어줍니다.
                img.src = file.url;
                img.onload = () => {
                    ctx.clearRect(
                        0,
                        0,
                        virtualCanvas.width,
                        virtualCanvas.height,
                    );
                    ctx.filter = `brightness(${
                        file.brightness / 3 + 100
                    }%) contrast(${file.contrast / 3 + 100}%) saturate(${
                        file.saturate + 100
                    }%)
                blur(${file.blur / 50}px)
                `;
                    ctx.drawImage(
                        img,
                        (img.width - virtualCanvas.width) / 2 -
                            (img.width * file.translateX) / // Cut step에서 scale 값 때문에 발생한 translate 오차
                                (file.scale / 100 + 1),
                        (img.height - virtualCanvas.height) / 2 -
                            (img.height * file.translateY) / // Cut step에서 scale 값 때문에 발생한 translate 오차
                                (file.scale / 100 + 1),
                        virtualCanvas.width,
                        virtualCanvas.height,
                        0,
                        0,
                        virtualCanvas.width,
                        virtualCanvas.height,
                    );
                    virtualCanvas.toBlob(function (blob) {
                        if (!blob) return;
                        var newImg = document.createElement("img"),
                            url = URL.createObjectURL(blob);
                        newImg.onload = function () {
                            dispatch(
                                uploadActions.addNewFileUrl({ url, index }),
                            );
                            // no longer need to read the blob so it's revoked
                            // URL.revokeObjectURL(url);
                        };
                        newImg.src = url;
                        document.body.appendChild(newImg);
                    });
                };
            }
        });
    }, [dispatch, ratioMode]);

    return (
        <>
            <UploadHeader
                excuteBeforePrevStep={() =>
                    dispatch(uploadActions.resetNewFileUrl())
                }
            />
            <StyledContent>
                <div
                    className="upload__contentImg"
                    style={{
                        width: currentWidth,
                        height: currentWidth,
                        minWidth: currentWidth,
                        minHeight: currentWidth,
                    }}
                >
                    {currentFile.newUrl !== "" && (
                        <img
                            src={currentFile.newUrl}
                            alt={"태그할 수 있는 사진"}
                            width={getRatioCalculatedBoxWidth(
                                ratioMode,
                                currentWidth,
                            )}
                            height={getRatioCalculatedBoxHeight(
                                ratioMode,
                                currentWidth,
                            )}
                        />
                    )}
                </div>
                <div className="upload__contents">
                    <div className="upload__contentInput textareaBox">
                        <div className="textarea__header">
                            <img
                                src={userInfo?.memberImageUrl}
                                alt={"유효하지 않은 url입니다."}
                            />
                            <div>{userInfo?.memberUsername}</div>
                        </div>
                        <textarea
                            placeholder="문구 입력..."
                            value={textareaValue}
                            onChange={(event) =>
                                dispatch(
                                    uploadActions.setTextareaValue(
                                        event.target.value,
                                    ),
                                )
                            }
                            maxLength={2200}
                        ></textarea>
                        <div
                            className="textarea__bottom"
                            onBlur={() => setIsEmojiModalOn(false)}
                        >
                            {isEmojiModalOn && (
                                <Picker onEmojiClick={onEmojiClick} />
                            )}
                            <SmileFace
                                onClick={() => setIsEmojiModalOn(true)}
                            />
                            <button>{`${textareaValue.length}/2,200`}</button>
                        </div>
                    </div>
                    <div className="upload__contentOption location">
                        <div className="header">
                            <input
                                // disabled={true}
                                placeholder="위치 추가(개발 준비중)"
                            />
                            <span>
                                <LocationIcon />
                            </span>
                        </div>
                    </div>
                    <div className="upload__contentOption accessibility">
                        <div
                            className="header"
                            onClick={() => setIsAccessOptionOn((prev) => !prev)}
                        >
                            <span className={isAccessOptionOn ? "bold" : ""}>
                                접근성
                            </span>
                            <span className={isAccessOptionOn ? "reverse" : ""}>
                                <DownV />
                            </span>
                        </div>
                        {isAccessOptionOn && (
                            <div className="activated">
                                <div className="smallFont">
                                    대체 텍스트는 시각적으로 사진을 보기 어려운
                                    사람들에게 사진 내용을 설명하는
                                    텍스트입니다. 대체 텍스트는 회원님의 사진에
                                    대해 자동으로 생성되며, 직접 입력할 수도
                                    있습니다.
                                </div>
                                {files.map((file) => (
                                    <div key={file.newUrl}>
                                        <img
                                            src={file.newUrl}
                                            alt={"유효하지 않은 url입니다."}
                                        ></img>
                                        <input
                                            type="text"
                                            placeholder="대체 텍스트 입력..."
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="upload__contentOption advanced">
                        <div
                            className="header"
                            onClick={() =>
                                setIsAdvancedOptionOn((prev) => !prev)
                            }
                        >
                            <span className={isAdvancedOptionOn ? "bold" : ""}>
                                고급 설정
                            </span>
                            <span
                                className={isAdvancedOptionOn ? "reverse" : ""}
                            >
                                <DownV />
                            </span>
                        </div>
                        {isAdvancedOptionOn && (
                            <div className="activated">hello</div>
                        )}
                    </div>
                    <hr />
                </div>
            </StyledContent>
        </>
    );
};

export default Content;

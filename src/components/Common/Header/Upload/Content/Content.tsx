import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { getNewImageSizeBasedOnOriginal } from "components/Common/Header/Upload/Edit/Edit";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import {
    getRatioCalculatedBoxWidth,
    getRatioCalculatedBoxHeight,
} from "components/Common/Header/Upload/Cut/CutImgUnit";

const StyledContent = styled.div`
    display: flex;
    & > .upload__contentImg {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > .upload__contentInputs {
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
        }
    }
`;

interface ContentProps {
    currentWidth: number;
}

const Content = ({ currentWidth }: ContentProps) => {
    const { files, currentIndex, ratioMode } = useAppSelector(
        (state) => state.upload,
    );
    const { userInfo } = useAppSelector((state) => state.auth);
    const currentFile = useMemo(
        () => files[currentIndex],
        [files, currentIndex],
    );

    const dispatch = useAppDispatch();

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
                <div className="upload__contentInputs">
                    <div className="upload__contentInput textareaBox">
                        <div className="textarea__header">
                            <img
                                src={userInfo?.memberImageUrl}
                                alt={"유효하지 않은 url입니다."}
                            />
                            <div>{userInfo?.memberUsername}</div>
                        </div>
                        <textarea></textarea>
                    </div>
                    <div className="upload__contentInput location"></div>
                    <div className="upload__contentInput accessibility"></div>
                    <div className="upload__contentInput advanced"></div>
                </div>
            </StyledContent>
        </>
    );
};

export default Content;

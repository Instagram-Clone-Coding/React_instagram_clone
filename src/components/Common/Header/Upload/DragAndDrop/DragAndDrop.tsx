import React, { ChangeEvent, DragEvent, useRef, useState } from "react";
import { ReactComponent as ImgOrVideoIcon } from "assets/Svgs/imgOrVideo.svg";
import Button from "styles/UI/Button";
import { useAppDispatch } from "app/store/Hooks";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import styled from "styled-components";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";

const StyledDragAndDrop = styled.div`
    width: 100%;
    height: 100%;
    & > .upload__file {
        padding: 24px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > div {
            margin-top: 16px;
            & > h2 {
                font-weight: 300;
                font-size: 22px;
                line-height: 26px;
                text-align: center;
            }
        }
        & > button {
            margin-top: 24px;
        }
        &.dragOver {
            background-color: ${(props) => props.theme.color.bg_gray};
            & > svg {
                color: ${(props) => props.theme.color.blue};
            }
        }
    }
    & > form > input {
        display: none !important;
    }
`;

const DragAndDrop = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const [files, setFiles] = useState<(string | ArrayBuffer | null)[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const dispatch = useAppDispatch();

    const buttonClickHandler = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    //drag한 마우스가 들어왔을 때
    const dragInHandler = (event: DragEvent): void => {
        event.preventDefault();
        event.stopPropagation();
    };

    // drag한 마우스가 해당 요소 밖으로 벗어났을 때
    const dragOutHandler = (event: DragEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        setIsDraggingOver(false);
    };

    // drag한 마우스가 해당 요소 위에서 움직일 때(유지될 떄)
    const dragOverHandler = (event: DragEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer!.files) {
            setIsDraggingOver(true);
        }
    };

    const dropHandler = (event: DragEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles = event.dataTransfer.files;
        Array.from(droppedFiles).forEach((file, index) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                // window.URL.revokeObjectURL(img.src);
                dispatch(
                    uploadActions.addFile({
                        url: img.src,
                        width: img.width,
                        height: img.height,
                        imageRatio: img.width / img.height,
                    }),
                );
                if (index === droppedFiles.length - 1) {
                    dispatch(uploadActions.nextStep());
                }
            };
        });
        setIsDraggingOver(false);
    };

    const fileInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const addedFiles = event.target.files;
        if (!addedFiles) return;
        Array.from(addedFiles).forEach((file, index) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                // window.URL.revokeObjectURL(img.src);
                dispatch(
                    uploadActions.addFile({
                        url: img.src,
                        width: img.width,
                        height: img.height,
                        imageRatio: img.width / img.height,
                    }),
                );
                if (index === addedFiles.length - 1) {
                    dispatch(uploadActions.nextStep());
                }
            };
        });
    };

    return (
        <>
            <UploadHeader />
            <StyledDragAndDrop>
                <div
                    className={`upload__file ${
                        isDraggingOver ? "dragOver" : ""
                    }`}
                    onDrop={dropHandler}
                    onDragEnter={dragInHandler}
                    onDragLeave={dragOutHandler}
                    onDragOver={dragOverHandler}
                >
                    <ImgOrVideoIcon />
                    <div>
                        <h2>사진과 동영상을 여기 끌어다 놓으세요</h2>
                    </div>
                    <Button type="button" onClick={buttonClickHandler}>
                        컴퓨터에서 선택
                    </Button>
                </div>
                <form
                    encType="multipart/form-data"
                    method="POST"
                    role="presentation"
                >
                    <input
                        accept="image/jpeg,image/png,image/heic,image/heif"
                        multiple={true}
                        type="file"
                        ref={inputRef}
                        onChange={fileInputChangeHandler}
                        // value={}
                    />
                </form>
            </StyledDragAndDrop>
        </>
    );
};

export default DragAndDrop;

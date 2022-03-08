import { useAppSelector } from "app/store/Hooks";
import { ReactComponent as LeftArrow } from "assets/Svgs/leftArrow.svg";
import { ReactComponent as RightArrow } from "assets/Svgs/rightArrow.svg";
import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

const StyledEdit = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    /* justify-content: center;
    align-items: center; */
    & > .upload__imgCanvasLayout {
        /* flex: 1; */
        display: flex;
        width: 100%;
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
    }
`;

interface EditProps {
    currentWidth: number;
}

const Edit = ({ currentWidth }: EditProps) => {
    const files = useAppSelector((state) => state.upload.files);
    const ratioMode = useAppSelector((state) => state.upload.ratioMode);
    const currentIndex = useAppSelector((state) => state.upload.currentIndex);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvasSize = useMemo(() => {
        switch (ratioMode) {
            case "square":
                return { width: currentWidth, height: currentWidth };
            case "original":
                return { width: currentWidth, height: currentWidth * 1.93 };
            case "thin":
                return { width: currentWidth * 0.8, height: currentWidth };
            case "fat":
                return { width: currentWidth, height: (currentWidth * 9) / 16 };
        }
    }, [currentWidth, ratioMode]);

    useEffect(() => {
        // if (!canvasRef.current) return;
        const canvas = canvasRef?.current;
        const context = canvas?.getContext("2d");
        if (context) {
            const img = new Image(); // url만으로 canvas에 이미지를 그릴 수 없습니다. 생성자 함수를 통해 새로운 img 객체를 만들어줍니다.
            context.scale(
                files[currentIndex].scale / 100 + 1,
                files[currentIndex].scale / 100 + 1,
            ); // scale만큼 zoom
            img.src = files[currentIndex].url; // img객체의 src를 file.url로 변경합니다.
            img.onload = () => {
                // 이미지 로드가 완료되었을 떄 함수가 실행됩니다.
                context.drawImage(
                    img,
                    10,
                    10,
                    100,
                    100 / files[currentIndex].imageRatio,
                );
                console.log(files[currentIndex].scale / 100 + 1);
            };
        }
    }, [currentIndex, files, currentWidth]);

    return (
        <StyledEdit>
            <div className="upload__imgCanvasLayout">
                <canvas
                    className="upload__imgCanvas"
                    {...canvasSize}
                    ref={canvasRef}
                >
                    <img
                        src={files[currentIndex].url}
                        {...canvasSize}
                        alt={`${currentIndex + 1}번째 게시물`}
                    />
                </canvas>
                <button className="left">
                    <LeftArrow />
                </button>
                <button className="right">
                    <RightArrow />
                </button>
            </div>
            <div className="upload__imgEditor">필터</div>
        </StyledEdit>
    );
};

export default Edit;

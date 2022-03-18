import React, { memo, useEffect, useRef } from "react";

interface EditCanvasUnitProps {
    currentCanvasWidth: number;
    currentCanvasHeight: number;
    currentImageWidth: number;
    currentImageHeight: number;
    currentFile: UploadType.FileProps;
}

const EditCanvasUnit = ({
    currentCanvasWidth,
    currentCanvasHeight,
    currentImageWidth,
    currentImageHeight,
    currentFile,
}: EditCanvasUnitProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (context) {
            context.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight);
            const img = new Image(currentImageWidth, currentImageHeight); // url만으로 canvas에 이미지를 그릴 수 없습니다. 생성자 함수를 통해 새로운 img 객체를 만들어줍니다.
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
                        currentImageWidth / 2 -
                        currentCanvasWidth / 2 -
                        currentFile.translateX
                    ),
                    -(
                        currentImageHeight / 2 -
                        currentCanvasHeight / 2 -
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
        currentCanvasWidth,
        currentCanvasHeight,
        currentImageWidth,
        currentImageHeight,
        currentFile.translateX,
        currentFile.translateY,
        currentFile.url,
        currentFile.blur,
        currentFile.brightness,
        currentFile.contrast,
        currentFile.saturate,
    ]);

    return (
        <canvas
            className="upload__imgCanvas"
            ref={canvasRef}
            width={currentCanvasWidth}
            height={currentCanvasHeight}
        >
            <img
                src={currentFile.url}
                width={currentImageWidth}
                height={currentImageHeight}
                alt="이미지를 불러올 수 없습니다."
            />
        </canvas>
    );
};

export default memo(EditCanvasUnit);

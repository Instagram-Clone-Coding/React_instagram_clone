import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { getProcessedMinSize } from "components/Common/Header/Upload/Cut/Cut";
import React, {
    forwardRef,
    memo,
    MouseEvent,
    useCallback,
    useMemo,
} from "react";
import styled from "styled-components";

export const getRatioCalculatedBoxWidth = (
    ratioType: UploadType.RatioType,
    currentWidth: number,
) => {
    switch (ratioType) {
        case "thin":
            return currentWidth * 0.8;
        default:
            return currentWidth;
    }
};

export const getRatioCalculatedBoxHeight = (
    ratioType: UploadType.RatioType,
    currentWidth: number,
) => {
    switch (ratioType) {
        case "original":
            return currentWidth / 1.93;
        case "fat":
            return (currentWidth * 9) / 16;
        default:
            return currentWidth;
    }
};

interface StyledCutImgUnitProps {
    ratioType: UploadType.RatioType;
    processedCurrentWidth: number;
    url: string;
}

const StyledCutImgUnit = styled.div<StyledCutImgUnitProps>`
    width: ${(props) =>
        getRatioCalculatedBoxWidth(
            props.ratioType,
            props.processedCurrentWidth,
        )}px;
    height: ${(props) =>
        getRatioCalculatedBoxHeight(
            props.ratioType,
            props.processedCurrentWidth,
        )}px;
    transition: width 0.3s, height 0.3s;
    overflow: hidden; // 고려
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    & > .upload__image {
        background-image: url(${(props) => props.url});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }
`;

interface CutImgUnitProps {
    currentFile: UploadType.FileProps;
    ratioMode: UploadType.RatioType;
    processedCurrentWidth: number;
    onGrabStart: () => void;
    onFixTransform: (scale: number) => void;
}

const CutImgUnit = forwardRef<HTMLDivElement, CutImgUnitProps>(
    (
        {
            currentFile,
            ratioMode,
            processedCurrentWidth,
            onGrabStart,
            onFixTransform,
        },
        imageRef,
    ) => {
        const dispatch = useAppDispatch();
        const isGrabbing = useAppSelector((state) => state.upload.isGrabbing);

        const mouseDownhandler = useCallback(
            (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (isGrabbing) return;
                const { screenX, screenY } = event;
                onGrabStart();
                dispatch(uploadActions.startGrabbing());
                dispatch(
                    uploadActions.startGrab({
                        x: screenX,
                        y: screenY,
                    }),
                );
            },
            [isGrabbing, dispatch, onGrabStart],
        );

        const mouseUpHandler = useCallback(
            (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (!isGrabbing) return;
                dispatch(uploadActions.stopGrabbing());
                onFixTransform(currentFile.scale);
                dispatch(uploadActions.resetGrabbedPosition());
            },
            [isGrabbing, dispatch, onFixTransform, currentFile.scale],
        );

        const mouseMoveHandler = useCallback(
            (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (!isGrabbing) return;
                const { screenX, screenY } = event;
                const { minWidth, minHeight } = getProcessedMinSize(
                    processedCurrentWidth,
                    currentFile.imageRatio,
                    ratioMode,
                );
                const scaledMinWidth = minWidth * (currentFile.scale / 100 + 1);
                const scaledMinHeight =
                    minHeight * (currentFile.scale / 100 + 1);
                const gapX = screenX - currentFile.grabbedPosition.x;
                const gapY = screenY - currentFile.grabbedPosition.y;
                // setTransformX(gapX + transformX);
                // setTransformY(gapY + transformY);
                dispatch(
                    uploadActions.startTranslate({
                        translateX:
                            (gapX + currentFile.translateX * scaledMinWidth) /
                            scaledMinWidth,
                        translateY:
                            (gapY + currentFile.translateY * scaledMinHeight) /
                            scaledMinHeight,
                    }),
                );
            },
            [
                isGrabbing,
                dispatch,
                currentFile.grabbedPosition.x,
                currentFile.grabbedPosition.y,
                processedCurrentWidth,
                currentFile.imageRatio,
                ratioMode,
                currentFile.scale,
            ], // 여기서 transform을 deps로 넣으면 엄청 중첩되서 빠르게 움직여버림
        );

        const mouseLeaveHandler = useCallback(
            (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (!isGrabbing) return;
                onFixTransform(currentFile.scale);
                // grab 취소는 상위 컴포넌트인 Uplaod에서!
            },
            [onFixTransform, isGrabbing, currentFile.scale],
        );

        return (
            <StyledCutImgUnit
                ratioType={ratioMode}
                processedCurrentWidth={processedCurrentWidth}
                url={currentFile.url}
            >
                <div
                    className="upload__image"
                    ref={imageRef}
                    onMouseDown={mouseDownhandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseLeave={mouseLeaveHandler}
                    style={{
                        transform:
                            currentFile.translateX === 0 &&
                            currentFile.translateY === 0 &&
                            currentFile.scale === 0
                                ? "none"
                                : `translate3d(${
                                      currentFile.translateX * 100
                                  }%,${
                                      currentFile.translateY * 100
                                  }%,0) scale(${currentFile.scale / 100 + 1})`,
                        ...getProcessedMinSize(
                            processedCurrentWidth,
                            currentFile.imageRatio,
                            ratioMode,
                        ),
                    }}
                ></div>
            </StyledCutImgUnit>
        );
    },
);

export default memo(CutImgUnit);

import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, {
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import { ReactComponent as CutIcon } from "assets/Svgs/cut.svg";
import { ReactComponent as Resize } from "assets/Svgs/resize.svg";
import { ReactComponent as Gallery } from "assets/Svgs/gallery.svg";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";

interface StyledCutProps {
    url: string;
    currentWidth: number;
}

const INACTIVE_COLOR = "#FFFFFF";
const ACTIVE_COLOR = "#262626";

const StyledCut = styled.div<StyledCutProps>`
    width: ${(props) => props.currentWidth}px;
    height: ${(props) => props.currentWidth}px;
    /* @media (max-width: 720px) {
        width: 348px;
        height: 348px;
    } */
    overflow: hidden;
    border-radius: 0 0 12px 12px;
    cursor: grab;
    position: relative;
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
    & > .upload__handleMenu {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 8px;
        display: flex;
        & > div {
            background-color: rgba(26, 26, 26, 0.8);
            position: absolute;
            bottom: 0;
            margin: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition-property: opacity;
            transition-duration: 0.2s;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            &:hover {
                opacity: 0.8;
                transition-property: opacity;
                transition-duration: 0.2s;
            }
            & > button {
                width: 100%;
                height: 100%;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &.ratio {
                left: 0;
            }
            &.resize {
                left: 0;
                margin-left: 52px;
            }
            &.gallery {
                right: 0;
            }
            &.active {
                background-color: white;
            }
            &.inactive {
                opacity: 0.3;
            }
        }
    }
    & > .upload__handleInput {
        position: absolute;
        bottom: 0;
        width: 100%;
        & > div {
            position: absolute;
            bottom: 48px;
            margin: 8px;
            background-color: rgba(26, 26, 26, 0.8);
            &.ratio {
                left: 0;
            }
            &.resize {
                left: 0;
                margin-left: 52px;
            }
            &.gallery {
                right: 0;
            }
        }
    }
`;

interface CutProps {
    currentWidth: number;
}

const MIN_WIDTH = 348;

const Cut = ({ currentWidth }: CutProps) => {
    const files = useAppSelector((state) => state.upload.files);
    const isGrabbing = useAppSelector((state) => state.upload.isGrabbing);
    const dispatch = useAppDispatch();
    const [handlingMode, setHandlingMode] =
        useState<"ratio" | "resize" | "gallery" | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [grabbedPosition, setGrabbedPosition] = useState({ x: 0, y: 0 });
    const [transformX, setTransformX] = useState(0);
    const [transformY, setTransformY] = useState(0);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const imageRatio = useMemo(
        () => files[currentIndex].width / files[currentIndex].height,
        [currentIndex, files],
    );
    const processedCurrentWidth = useMemo(
        () => (currentWidth <= MIN_WIDTH ? MIN_WIDTH : currentWidth),
        [currentWidth],
    );

    const mouseDownhandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (isGrabbing) return;
            const { screenX, screenY } = event;
            dispatch(uploadActions.startGrabbing());
            setGrabbedPosition({
                x: screenX,
                y: screenY,
            });
        },
        [isGrabbing],
    );

    const mouseUpHandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (!isGrabbing) return;
            if (!imageRef.current) return;
            dispatch(uploadActions.stopGrabbing());
            const widthGap =
                (imageRef.current.offsetWidth - processedCurrentWidth) / 2;
            const heightGap =
                (imageRef.current.offsetHeight - processedCurrentWidth) / 2;
            // 객체 형태로 하면 최신 "값"을 가져오지 못함
            setTransformX((prev) => {
                if (widthGap === 0) {
                    return 0;
                } else {
                    if (prev > widthGap) {
                        return widthGap;
                    } else if (prev < -widthGap) {
                        return -widthGap;
                    } else {
                        return prev;
                    }
                }
            });
            setTransformY((prev) => {
                if (heightGap === 0) {
                    return 0;
                } else {
                    if (prev > heightGap) {
                        return heightGap;
                    } else if (prev < -heightGap) {
                        return -heightGap;
                    } else {
                        return prev;
                    }
                }
            });
            setGrabbedPosition({ x: 0, y: 0 });
        },
        [isGrabbing],
    );

    const mouseMoveHandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (!isGrabbing) return;
            const { screenX, screenY } = event;
            const gapX = screenX - grabbedPosition.x;
            const gapY = screenY - grabbedPosition.y;
            setTransformX(gapX + transformX);
            setTransformY(gapY + transformY);
        },
        [isGrabbing, grabbedPosition], // 여기서 transform을 deps로 넣으면 엄청 중첩되서 빠르게 움직여버림
    );

    const mouseLeaveHandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (!isGrabbing) return;
            const { screenX, screenY } = event;
            const gapX = screenX - grabbedPosition.x;
            const gapY = screenY - grabbedPosition.y;
            setTransformX(gapX + transformX);
            setTransformY(gapY + transformY);
            // setTransform({
            //     x: gapX + transform.x,
            //     y: gapY + transform.y,
            // });
        },
        [isGrabbing, grabbedPosition],
    );

    // useEffect(() => {
    //     const backdrop = document
    //         .getElementById("modal-root")
    //         ?.getElementsByTagName("div")[0];
    //     console.log(backdrop);
    //     backdrop?.addEventListener("mouseup", (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         console.log("backdrop에서 이벤트 발생");
    //         mouseUpHandler(event);
    //     });
    //     return () => {
    //         backdrop?.removeEventListener("mouseup", (event) => {
    //             event.preventDefault();
    //             event.stopPropagation();
    //             console.log("backdrop에서 초기화");
    //             mouseUpHandler(event);
    //         });
    //     };
    // }, []);

    return (
        <StyledCut
            url={files[currentIndex].url}
            currentWidth={processedCurrentWidth}
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
                        transformX === 0 && transformY === 0
                            ? "none"
                            : `translate3d(${transformX}px,${transformY}px,0)`,
                    minWidth:
                        imageRatio >= 1
                            ? processedCurrentWidth * imageRatio
                            : processedCurrentWidth,
                    minHeight:
                        imageRatio < 1
                            ? processedCurrentWidth / imageRatio
                            : processedCurrentWidth,
                }}
            ></div>
            <div className="upload__handleMenu">
                <div
                    className={`ratio ${
                        handlingMode === "ratio"
                            ? "active"
                            : handlingMode !== null
                            ? "inactive"
                            : ""
                    }`}
                    onClick={() => {
                        setHandlingMode((prev) =>
                            prev === "ratio" ? null : "ratio",
                        );
                    }}
                >
                    <button>
                        <CutIcon
                            fill={
                                handlingMode === "ratio"
                                    ? ACTIVE_COLOR
                                    : INACTIVE_COLOR
                            }
                        />
                    </button>
                </div>
                <div
                    className={`resize ${
                        handlingMode === "resize"
                            ? "active"
                            : handlingMode !== null
                            ? "inactive"
                            : ""
                    }`}
                    onClick={() => {
                        setHandlingMode((prev) =>
                            prev === "resize" ? null : "resize",
                        );
                    }}
                >
                    <button>
                        <Resize
                            fill={
                                handlingMode === "resize"
                                    ? ACTIVE_COLOR
                                    : INACTIVE_COLOR
                            }
                            color={
                                handlingMode === "resize"
                                    ? ACTIVE_COLOR
                                    : INACTIVE_COLOR
                            }
                        />
                    </button>
                </div>
                <div
                    className={`gallery ${
                        handlingMode === "gallery"
                            ? "active"
                            : handlingMode !== null
                            ? "inactive"
                            : ""
                    }`}
                    onClick={() => {
                        setHandlingMode((prev) =>
                            prev === "gallery" ? null : "gallery",
                        );
                    }}
                >
                    <button>
                        <Gallery
                            fill={
                                handlingMode === "gallery"
                                    ? ACTIVE_COLOR
                                    : INACTIVE_COLOR
                            }
                            color={
                                handlingMode === "gallery"
                                    ? ACTIVE_COLOR
                                    : INACTIVE_COLOR
                            }
                        />
                    </button>
                </div>
            </div>
            <div className="upload__handleInput">
                <div
                    className={`ratio ${handlingMode === "ratio" ? "on" : ""}`}
                >
                    <button>
                        <div>원본</div>
                        <div></div>
                    </button>
                    <button>
                        <div>1:1</div>
                        <div></div>
                    </button>
                    <button>
                        <div>4:5</div>
                        <div></div>
                    </button>
                    <button>
                        <div>16:9</div>
                        <div></div>
                    </button>
                </div>
                <div
                    className={`resize ${
                        handlingMode === "resize" ? "on" : ""
                    }`}
                >
                    here
                </div>
                <div
                    className={`gallery ${
                        handlingMode === "gallery" ? "on" : ""
                    }`}
                >
                    gallery
                </div>
            </div>
        </StyledCut>
    );
};

export default Cut;

import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, {
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled, { useTheme } from "styled-components";
import { ReactComponent as CutIcon } from "assets/Svgs/cut.svg";
import { ReactComponent as Resize } from "assets/Svgs/resize.svg";
import { ReactComponent as Gallery } from "assets/Svgs/gallery.svg";
import { ReactComponent as PhotoOutline } from "assets/Svgs/photoOutline.svg";
import { ReactComponent as SquareCut } from "assets/Svgs/squareCut.svg";
import { ReactComponent as ThinRectangle } from "assets/Svgs/thinRectangle.svg";
import { ReactComponent as FatRectangle } from "assets/Svgs/fatRectangle.svg";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";

interface StyledCutProps {
    url: string;
    currentWidth: number;
}

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
            bottom: 8px;
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
                left: 8px;
            }
            &.resize {
                left: 8px;
                margin-left: 52px;
            }
            &.gallery {
                right: 8px;
            }
            &.active {
                box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
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
            visibility: hidden;
            position: absolute;
            bottom: 56px;
            margin: 8px;
            background-color: rgba(26, 26, 26, 0.8);
            border-radius: 8px;
            @keyframes appear {
                0% {
                    bottom: 40px;
                    opacity: 0;
                    visibility: hidden;
                }
                100% {
                    bottom: 56px;
                    opacity: 1;
                    visibility: visible;
                }
            }
            @keyframes disappear {
                0% {
                    bottom: 56px;
                    opacity: 1;
                    visibility: visible;
                }
                100% {
                    bottom: 40px;
                    opacity: 0;
                    visibility: hidden;
                }
            }
            &.on {
                animation: appear 0.4s forwards;
            }
            &.off {
                animation: disappear 0.4s forwards;
            }
            &.ratio {
                left: 8px;
                display: flex;
                flex-direction: column;
                & > button {
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 4px 0 16px;
                    &.active > div {
                        color: white;
                    }
                    & > div {
                        color: ${(props) => props.theme.font.gray};
                        & > div {
                            margin: -3px 0 -4px;
                            font-weight: 600;
                        }
                    }
                    & > div:last-child {
                        padding: 12px;
                        /* width: 24px; */
                        /* height: 24px; */
                        display: flex;
                    }
                }
                & > hr {
                    width: 100%;
                    opacity: 0.15;
                    height: 1px;
                    margin: 0;
                }
            }
            &.resize {
                left: 8px;
                margin-left: 52px;
            }
            &.gallery {
                right: 8px;
            }
        }
    }
`;

interface CutProps {
    currentWidth: number;
}

const MIN_WIDTH = 348;

type RatioType = "original" | "square" | "thin" | "fat";

const Cut = ({ currentWidth }: CutProps) => {
    const theme = useTheme();
    const files = useAppSelector((state) => state.upload.files);
    const isGrabbing = useAppSelector((state) => state.upload.isGrabbing);
    const dispatch = useAppDispatch();
    const [handlingMode, setHandlingMode] =
        useState<"ratio" | "resize" | "gallery" | null | "first">("first");
    const [ratioMode, setRatioMode] = useState<RatioType>("square");
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

    const fixOverTranformedImage = useCallback(() => {
        if (!imageRef.current) return;
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
    }, [processedCurrentWidth]);

    const mouseDownhandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (isGrabbing) return;
            const { screenX, screenY } = event;
            setHandlingMode(null);
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
            dispatch(uploadActions.stopGrabbing());
            fixOverTranformedImage();
            setGrabbedPosition({ x: 0, y: 0 });
        },
        [isGrabbing, dispatch, fixOverTranformedImage],
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

    const ratioMenus: {
        text: string;
        svgComponent: React.FunctionComponent<
            React.SVGProps<SVGSVGElement> & {
                title?: string | undefined;
            }
        >;
        type: RatioType;
    }[] = [
        { text: "원본", svgComponent: PhotoOutline, type: "original" },
        { text: "1:1", svgComponent: SquareCut, type: "square" },
        { text: "4:5", svgComponent: ThinRectangle, type: "thin" },
        { text: "16:9", svgComponent: FatRectangle, type: "fat" },
    ];

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
                            : handlingMode === "first" || handlingMode === null
                            ? ""
                            : "inactive"
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
                                    ? theme.font.default_black
                                    : theme.color.bg_white
                            }
                        />
                    </button>
                </div>
                <div
                    className={`resize ${
                        handlingMode === "resize"
                            ? "active"
                            : handlingMode === "first" || handlingMode === null
                            ? ""
                            : "inactive"
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
                                    ? theme.font.default_black
                                    : theme.color.bg_white
                            }
                            color={
                                handlingMode === "resize"
                                    ? theme.font.default_black
                                    : theme.color.bg_white
                            }
                        />
                    </button>
                </div>
                <div
                    className={`gallery ${
                        handlingMode === "gallery"
                            ? "active"
                            : handlingMode === "first" || handlingMode === null
                            ? ""
                            : "inactive"
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
                                    ? theme.font.default_black
                                    : theme.color.bg_white
                            }
                            color={
                                handlingMode === "gallery"
                                    ? theme.font.default_black
                                    : theme.color.bg_white
                            }
                        />
                    </button>
                </div>
            </div>
            <div className="upload__handleInput">
                <div
                    className={`ratio ${
                        handlingMode === "ratio"
                            ? "on"
                            : handlingMode === "first"
                            ? ""
                            : "off"
                    }`}
                >
                    {ratioMenus.map((ratioMenu, index) => (
                        <>
                            <button
                                className={
                                    ratioMode === ratioMenu.type ? "active" : ""
                                }
                                onClick={() =>
                                    setRatioMode((prev) =>
                                        prev !== ratioMenu.type
                                            ? ratioMenu.type
                                            : prev,
                                    )
                                }
                            >
                                <div>
                                    <div>{ratioMenu.text}</div>
                                </div>
                                <div>
                                    <ratioMenu.svgComponent
                                        fill={
                                            ratioMode === ratioMenu.type
                                                ? "white"
                                                : theme.font.gray
                                        }
                                        color={
                                            ratioMode === ratioMenu.type
                                                ? "white"
                                                : theme.font.gray
                                        }
                                    />
                                </div>
                            </button>
                            {index < ratioMenus.length - 1 && <hr />}
                        </>
                    ))}
                </div>
                <div
                    className={`resize ${
                        handlingMode === "resize"
                            ? "on"
                            : handlingMode === "first"
                            ? ""
                            : "off"
                    }`}
                >
                    here
                </div>
                <div
                    className={`gallery ${
                        handlingMode === "gallery"
                            ? "on"
                            : handlingMode === "first"
                            ? ""
                            : "off"
                    }`}
                >
                    gallery
                </div>
            </div>
        </StyledCut>
    );
};

export default Cut;

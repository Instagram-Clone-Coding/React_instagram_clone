import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, {
    ChangeEvent,
    Fragment,
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

type RatioType = "original" | "square" | "thin" | "fat";
type HandlingType = "ratio" | "resize" | "gallery" | null | "first";

const MIN_WIDTH = 348;

const HANDLE_MENUS: {
    isColorContained: boolean;
    svgComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
    type: HandlingType;
}[] = [
    { isColorContained: false, svgComponent: CutIcon, type: "ratio" },
    { isColorContained: true, svgComponent: Resize, type: "resize" },
    { isColorContained: true, svgComponent: Gallery, type: "gallery" },
];

const RATIO_MENUS: {
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

const getRatioCalculatedBoxWidth = (
    ratioType: RatioType,
    currentWidth: number,
) => {
    switch (ratioType) {
        case "thin":
            return currentWidth * 0.8;
        default:
            return currentWidth;
    }
};

const getRatioCalculatedBoxHeight = (
    ratioType: RatioType,
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
interface StyledCutProps {
    url: string;
    processedCurrentWidth: number;
    ratioType: RatioType;
}

const StyledCut = styled.div<StyledCutProps>`
    width: ${(props) => props.processedCurrentWidth}px;
    height: ${(props) => props.processedCurrentWidth}px;
    position: relative;
    border-radius: 0 0 12px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > .upload__handleMenu {
        position: absolute;
        z-index: 999;
        bottom: 0;
        width: 100%;
        padding: 8px;
        display: flex;
        & > div {
            background-color: rgba(26, 26, 26, 0.8);
            position: absolute;
            z-index: 999;
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
        z-index: 999;
        bottom: 0;
        width: 100%;
        & > div {
            visibility: hidden;
            position: absolute;
            z-index: 999;
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
                width: 132px;
                height: 32px;
                display: flex;
                align-items: center;
                padding: 8px 12px;
                & > .upload__progressClickable {
                    width: 100%;
                    height: 5px;
                    display: flex;
                    align-items: center;
                    & > input[type="range"] {
                        -webkit-appearance: none;
                        width: 100%;
                        height: 1px;
                        background: transparent;
                        border: none;
                        cursor: pointer;
                    }
                    & > input[type="range"]:focus {
                        //  blue border 제거
                        outline: none;
                    }
                    & > input[type="range"]::-ms-track {
                        width: 100%;
                        background: transparent;
                        border-color: transparent;
                        color: transparent;
                    }

                    & > input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        background-color: white;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                    }
                }
            }
            &.gallery {
                right: 8px;
            }
        }
    }
    & > .upload__ratioBox {
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
    }
`;

interface CutProps {
    currentWidth: number;
}

const Cut = ({ currentWidth }: CutProps) => {
    const theme = useTheme();
    const files = useAppSelector((state) => state.upload.files);
    const isGrabbing = useAppSelector((state) => state.upload.isGrabbing);
    const dispatch = useAppDispatch();
    const [handlingMode, setHandlingMode] = useState<HandlingType>("first");
    const [ratioMode, setRatioMode] = useState<RatioType>("square");
    const [ratioState, setRatioState] = useState<boolean | null>(null);
    const [resizeState, setResizeState] = useState<boolean | null>(null);
    const [galleryState, setGalleryState] = useState<boolean | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [grabbedPosition, setGrabbedPosition] = useState({ x: 0, y: 0 }); // 각 인덱스
    const [transformX, setTransformX] = useState(0); // 각 인덱스
    const [transformY, setTransformY] = useState(0); // 각 인덱스
    const [scale, setScale] = useState(0); // 각 인덱스
    const imageRef = useRef<HTMLDivElement | null>(null); // 각 인덱스

    // 각 인덱스
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
            (imageRef.current.offsetWidth * (scale / 100 + 1) -
                getRatioCalculatedBoxWidth(ratioMode, processedCurrentWidth)) /
            2;
        const heightGap =
            (imageRef.current.offsetHeight * (scale / 100 + 1) -
                getRatioCalculatedBoxHeight(ratioMode, processedCurrentWidth)) /
            2;
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
    }, [processedCurrentWidth, ratioMode, scale]);

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
        [isGrabbing, dispatch],
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
            fixOverTranformedImage();
            // grab 취소는 상위 컴포넌트인 Uplaod에서!
        },
        [fixOverTranformedImage, isGrabbing],
    );

    const processedMinSize: {
        minWidth: number;
        minHeight: number;
    } = useMemo(() => {
        if (ratioMode !== "square") {
            switch (ratioMode) {
                // case "square":
                case "thin":
                    return {
                        minWidth: processedCurrentWidth * imageRatio,
                        minHeight: processedCurrentWidth,
                    };
                case "original":
                    return {
                        minWidth: (processedCurrentWidth / 1.93) * imageRatio,
                        minHeight: processedCurrentWidth / 1.93,
                    };
                case "fat":
                    return {
                        minWidth:
                            ((processedCurrentWidth * 9) / 16) * imageRatio,
                        minHeight: (processedCurrentWidth * 9) / 16,
                    };
            }
        } else {
            if (imageRatio > 1) {
                return {
                    minWidth: processedCurrentWidth * imageRatio,
                    minHeight: processedCurrentWidth,
                };
            } else {
                return {
                    minWidth: processedCurrentWidth,
                    minHeight: processedCurrentWidth / imageRatio,
                };
            }
        }
    }, [imageRatio, processedCurrentWidth, ratioMode]);

    const toggleInputState = useCallback((type: HandlingType) => {
        switch (type) {
            case "ratio":
                setRatioState((prev) => (prev === true ? false : true));
                setResizeState((prev) => (prev !== null ? false : null));
                setGalleryState((prev) => (prev !== null ? false : null));
                break;
            case "resize":
                setResizeState((prev) => (prev === true ? false : true));
                setRatioState((prev) => (prev !== null ? false : null));
                setGalleryState((prev) => (prev !== null ? false : null));
                break;
            case "gallery":
                setGalleryState((prev) => (prev === true ? false : true));
                setRatioState((prev) => (prev !== null ? false : null));
                setResizeState((prev) => (prev !== null ? false : null));
                break;
        }
    }, []);

    const scaleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;
        setScale(Number(value));
    };

    return (
        <StyledCut
            url={files[currentIndex].url}
            processedCurrentWidth={processedCurrentWidth}
            ratioType={ratioMode}
        >
            <div className="upload__handleMenu">
                {HANDLE_MENUS.map((menuObj) => (
                    <div
                        key={menuObj.type}
                        className={`${menuObj.type} ${
                            handlingMode === menuObj.type
                                ? "active"
                                : handlingMode === "first" ||
                                  handlingMode === null
                                ? ""
                                : "inactive"
                        }`}
                        onClick={() => {
                            setHandlingMode((prev) => {
                                return prev === menuObj.type
                                    ? null
                                    : menuObj.type;
                            });
                            toggleInputState(menuObj.type);
                        }}
                    >
                        <button>
                            {menuObj.isColorContained ? (
                                <menuObj.svgComponent
                                    fill={
                                        handlingMode === menuObj.type
                                            ? theme.font.default_black
                                            : theme.color.bg_white
                                    }
                                    color={
                                        handlingMode === menuObj.type
                                            ? theme.font.default_black
                                            : theme.color.bg_white
                                    }
                                />
                            ) : (
                                <menuObj.svgComponent
                                    fill={
                                        handlingMode === menuObj.type
                                            ? theme.font.default_black
                                            : theme.color.bg_white
                                    }
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>
            <div className="upload__handleInput">
                <div
                    className={`ratio ${
                        ratioState ? "on" : ratioState === null ? "" : "off"
                    }`}
                >
                    {RATIO_MENUS.map((ratioMenu, index) => (
                        <Fragment key={ratioMenu.type}>
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
                            {index < RATIO_MENUS.length - 1 && <hr />}
                        </Fragment>
                    ))}
                </div>
                <div
                    className={`resize ${
                        resizeState ? "on" : resizeState === null ? "" : "off"
                    }`}
                >
                    <div className="upload__progressClickable">
                        <input
                            className="upload__progress"
                            max="100"
                            min="0"
                            type="range"
                            value={scale}
                            onChange={scaleChangeHandler}
                            onMouseUp={fixOverTranformedImage}
                            style={{
                                background:
                                    scale >= 50
                                        ? `linear-gradient(to right, white ${scale}%, black ${
                                              100 - scale
                                          }%)`
                                        : `linear-gradient(to left, black ${
                                              100 - scale
                                          }%, white ${scale}%)`,
                            }}
                        ></input>
                    </div>
                </div>
                <div
                    className={`gallery ${
                        galleryState ? "on" : galleryState === null ? "" : "off"
                    }`}
                >
                    gallery
                </div>
            </div>
            <div className="upload__ratioBox">
                <div
                    className="upload__image"
                    ref={imageRef}
                    onMouseDown={mouseDownhandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseLeave={mouseLeaveHandler}
                    style={{
                        transform:
                            transformX === 0 && transformY === 0 && scale === 0
                                ? "none"
                                : `translate3d(${transformX}px,${transformY}px,0) scale(${
                                      scale / 100 + 1
                                  })`,
                        ...processedMinSize,
                    }}
                ></div>
            </div>
        </StyledCut>
    );
};

export default Cut;

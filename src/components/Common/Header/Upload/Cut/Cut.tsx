import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, {
    ChangeEvent,
    Fragment,
    useCallback,
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
import CutImgUnit from "components/Common/Header/Upload/Cut/CutImgUnit";

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
    type: UploadType.RatioType;
}[] = [
    { text: "원본", svgComponent: PhotoOutline, type: "original" },
    { text: "1:1", svgComponent: SquareCut, type: "square" },
    { text: "4:5", svgComponent: ThinRectangle, type: "thin" },
    { text: "16:9", svgComponent: FatRectangle, type: "fat" },
];

const getRatioCalculatedBoxWidth = (
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

const getRatioCalculatedBoxHeight = (
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
interface StyledCutProps {
    url: string;
    processedCurrentWidth: number;
    ratioType: UploadType.RatioType;
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
`;

interface CutProps {
    currentWidth: number;
}

const Cut = ({ currentWidth }: CutProps) => {
    const theme = useTheme();
    const files = useAppSelector((state) => state.upload.files);
    const ratioMode = useAppSelector(({ upload }) => upload.ratioMode);
    const currentIndex = useAppSelector(({ upload }) => upload.currentIndex);
    const dispatch = useAppDispatch();
    const [handlingMode, setHandlingMode] = useState<HandlingType>("first");
    const [ratioState, setRatioState] = useState<boolean | null>(null);
    const [resizeState, setResizeState] = useState<boolean | null>(null);
    const [galleryState, setGalleryState] = useState<boolean | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);

    // window 너비에 따라 변경되는 값
    const processedCurrentWidth = useMemo(
        () => (currentWidth <= MIN_WIDTH ? MIN_WIDTH : currentWidth),
        [currentWidth],
    );

    const fixOverTranformedImage = useCallback(
        (scale: number) => {
            if (!imageRef.current) return;
            const widthGap =
                (imageRef.current.offsetWidth * (scale / 100 + 1) -
                    getRatioCalculatedBoxWidth(
                        ratioMode,
                        processedCurrentWidth,
                    )) /
                2;
            const heightGap =
                (imageRef.current.offsetHeight * (scale / 100 + 1) -
                    getRatioCalculatedBoxHeight(
                        ratioMode,
                        processedCurrentWidth,
                    )) /
                2;
            dispatch(
                uploadActions.fixOverTranslatedImg({ widthGap, heightGap }),
            );
        },
        [processedCurrentWidth, ratioMode, dispatch],
    );

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

    const scaleChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const {
                target: { value },
            } = event;
            // setScale(Number(value));
            dispatch(uploadActions.changeScale(Number(value)));
        },
        [dispatch],
    );

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
                                    dispatch(
                                        uploadActions.changeRatioMode(
                                            ratioMenu.type,
                                        ),
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
                            value={files[currentIndex].scale}
                            onChange={scaleChangeHandler}
                            onMouseUp={() =>
                                fixOverTranformedImage(
                                    files[currentIndex].scale,
                                )
                            }
                            style={{
                                background:
                                    files[currentIndex].scale >= 50
                                        ? `linear-gradient(to right, white ${
                                              files[currentIndex].scale
                                          }%, black ${
                                              100 - files[currentIndex].scale
                                          }%)`
                                        : `linear-gradient(to left, black ${
                                              100 - files[currentIndex].scale
                                          }%, white ${
                                              files[currentIndex].scale
                                          }%)`,
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
            <CutImgUnit
                currentFile={files[currentIndex]}
                ratioMode={ratioMode}
                processedCurrentWidth={processedCurrentWidth}
                onGrabStart={() => {
                    setHandlingMode(null);
                    toggleInputState(handlingMode);
                }}
                onFixTransform={fixOverTranformedImage}
                ref={imageRef}
            />
        </StyledCut>
    );
};

export default Cut;

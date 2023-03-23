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
import { ReactComponent as Delete } from "assets/Svgs/delete.svg";
import { ReactComponent as PlusIcon } from "assets/Svgs/plus.svg";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import CutImgUnit from "components/Common/Header/Upload/Cut/CutImgUnit";
import sprite from "assets/Images/sprite.png";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import UploadImgArrowAndDots from "components/Common/Header/UploadImgArrowAndDots";
import WarningMaxUploadNumberModal from "components/Common/Header/Upload/WarningMaxUploadNumberModal";
import { MAX_IMAGES_NUMBER } from "components/Common/Header/Upload/Upload";

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

export const getProcessedMinSize = (
    processedCurrentWidth: number,
    imageRatio: number,
    ratioMode: UploadType.RatioType,
): {
    minWidth: number;
    minHeight: number;
} => {
    // const imageRatio = currentFile.imageRatio;
    if (ratioMode !== "square") {
        switch (ratioMode) {
            case "thin":
                if (imageRatio > 1) {
                    return {
                        minWidth: processedCurrentWidth * imageRatio,
                        minHeight: processedCurrentWidth,
                    };
                } else {
                    return {
                        minWidth: processedCurrentWidth * 0.8,
                        minHeight: (processedCurrentWidth * 0.8) / imageRatio,
                    };
                }
            case "original":
                return {
                    minWidth: processedCurrentWidth,
                    minHeight: processedCurrentWidth / imageRatio,
                };
            case "fat":
                return {
                    minWidth: processedCurrentWidth,
                    minHeight: processedCurrentWidth / imageRatio,
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
};
interface StyledCutProps {
    url: string;
    processedCurrentWidth: number;
    ratioType: UploadType.RatioType;
    counts: number;
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
            box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
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
                height: 118px;
                right: 8px;
                padding: 8px;
                max-width: ${(props) =>
                    getRatioCalculatedBoxWidth(
                        props.ratioType,
                        props.processedCurrentWidth,
                    ) - 32}px;
                display: flex;
                & > .upload__galleryImgsWrapper {
                    position: relative;
                    width: ${(props) => props.counts * 106}px;
                    max-width: ${(props) =>
                        getRatioCalculatedBoxWidth(
                            props.ratioType,
                            props.processedCurrentWidth,
                        ) -
                        48 -
                        58}px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    & > .upload__galleryImgs-leftArrow {
                        position: absolute;
                        left: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        & > div {
                            background-image: url(${sprite});
                            background-repeat: no-repeat;
                            background-position: -379px -128px;
                            height: 45px;
                            width: 45px;
                        }
                    }
                    & > .upload__galleryImgs-rightArrow {
                        position: absolute;
                        right: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        & > div {
                            background-image: url(${sprite});
                            background-repeat: no-repeat;
                            background-position: -244px -107px;
                            height: 45px;
                            width: 45px;
                        }
                    }
                    & > .upload__galleryImgs {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                        margin-right: 6px;
                        overflow-x: auto;
                        overflow-y: hidden;
                        -ms-overflow-style: none; /* IE and Edge */
                        scrollbar-width: none; /* Firefox */
                        &::-webkit-scrollbar {
                            display: none; /* Chrome , Safari , Opera */
                        }
                        & > .upload__galleryImgWrapper {
                            width: 94px;
                            min-width: 94px;
                            height: 94px;
                            margin: 0 6px;
                            overflow: hidden;
                            position: relative;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            & > .upload__galleryImg {
                                height: 100%;
                                cursor: pointer;
                            }
                            & > .uplaod__galleryDeleteBtn {
                                position: absolute;
                                top: 4px;
                                right: 4px;
                                width: 20px;
                                height: 20px;
                                background: rgba(26, 26, 26, 0.8);
                                border-radius: 50%;
                                padding: 4px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }
                }
                & > .upload__addBtnLayout {
                    margin: 0 4px 0 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    & > button {
                        border-radius: 50%;
                        border: 1px solid
                            ${(props) => props.theme.color.bd_gray};
                        width: 48px;
                        height: 48px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    & > form > input {
                        display: none !important;
                    }
                }
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
    const ratioMode = useAppSelector((state) => state.upload.ratioMode);
    const currentIndex = useAppSelector((state) => state.upload.currentIndex);
    const grabbedGalleryImgIndex = useAppSelector(
        (state) => state.upload.grabbedGalleryImgIndex,
    );
    const grabbedGalleryImgNewIndex = useAppSelector(
        (state) => state.upload.grabbedGalleryImgNewIndex,
    );
    const dispatch = useAppDispatch();
    const [handlingMode, setHandlingMode] = useState<HandlingType>("first");
    const [ratioState, setRatioState] = useState<boolean | null>(null);
    const [resizeState, setResizeState] = useState<boolean | null>(null);
    const [galleryState, setGalleryState] = useState<boolean | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isGalleryScrollInLeft, setIsGalleryScrollInLeft] = useState<
        boolean | null
    >(true);
    const [isGalleryScrollInRight, setIsGalleryScrollInRight] = useState<
        boolean | null
    >(false);
    const gallerySliderRef = useRef<HTMLDivElement | null>(null);
    const [isGalleryImgGrabbed, setIsGalleryImgGrabbed] = useState(false);
    const [grabbedGalleryImgClientX, setGrabbedGalleryImgClientX] = useState(0);
    const [grabbedGalleryImgTranslateX, setGrabbedGalleryImgTranslateX] =
        useState(0); // 클릭된 galleryImg가 이동하는 값
    const [isWarnigMaxImageNumberModalOn, setIsWarnigMaxImageNumberModalOn] =
        useState(false);

    useEffect(() => {
        if (!gallerySliderRef.current) return;
        const resizeArrowHandler = () => {
            if (!gallerySliderRef.current) return;
            if (
                gallerySliderRef.current.clientWidth ===
                gallerySliderRef.current.scrollWidth
            ) {
                setIsGalleryScrollInLeft(null);
                setIsGalleryScrollInRight(null);
            } else {
                // 무조건 resize될 때 오른쪽이 줄어듭니다.
                setIsGalleryScrollInLeft(true);
                setIsGalleryScrollInRight(false);
            }
        };
        window.addEventListener("resize", resizeArrowHandler);

        return () => {
            window.removeEventListener("resize", resizeArrowHandler);
        };
    }, []);
    // window 너비에 따라 변경되는 값
    const processedCurrentWidth = useMemo(
        () => (currentWidth <= MIN_WIDTH ? MIN_WIDTH : currentWidth),
        [currentWidth],
    );

    const fixOverTranformedImage = useCallback(
        (scale: number) => {
            if (!imageRef.current) return;
            const widthGapRatio =
                (imageRef.current.offsetWidth * (scale / 100 + 1) -
                    getRatioCalculatedBoxWidth(
                        ratioMode,
                        processedCurrentWidth,
                    )) /
                2 /
                files[currentIndex].width;
            const heightGapRatio =
                (imageRef.current.offsetHeight * (scale / 100 + 1) -
                    getRatioCalculatedBoxHeight(
                        ratioMode,
                        processedCurrentWidth,
                    )) /
                2 /
                files[currentIndex].width;
            dispatch(
                uploadActions.fixOverTranslatedImg({
                    widthGapRatio,
                    heightGapRatio,
                }),
            );
        },
        [processedCurrentWidth, ratioMode, dispatch, currentIndex, files],
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

    const buttonClickHandler = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const fileInputChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const addedFiles = event.target.files;
            if (!addedFiles) return;
            if (addedFiles.length + files.length > MAX_IMAGES_NUMBER) {
                return setIsWarnigMaxImageNumberModalOn(true);
            }
            Array.from(addedFiles).forEach((file) => {
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
                };
            });
        },
        [dispatch],
    );
    // gallery scroll
    const galleryLeftScrollHandler = useCallback(() => {
        if (!gallerySliderRef.current) return;
        gallerySliderRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
        });
    }, []);
    const galleryRightScrollHandler = useCallback(() => {
        if (!gallerySliderRef.current) return;
        gallerySliderRef.current.scrollTo({
            left: gallerySliderRef.current.scrollWidth,
            behavior: "smooth",
        });
    }, []);

    const galleryScrollHandler = useCallback(() => {
        if (!gallerySliderRef.current) return;
        if (gallerySliderRef.current.scrollLeft === 0) {
            setIsGalleryScrollInLeft(true);
            setIsGalleryScrollInRight(false);
        } else if (
            gallerySliderRef.current.clientWidth ===
            gallerySliderRef.current.scrollWidth -
                gallerySliderRef.current.scrollLeft
        ) {
            setIsGalleryScrollInLeft(false);
            setIsGalleryScrollInRight(true);
        } else {
            setIsGalleryScrollInLeft(false);
            setIsGalleryScrollInRight(false);
        }
    }, []);

    // gallery grab
    const galleryGrabHandler = useCallback(
        (event: MouseEvent<HTMLDivElement>, clickedIndex: number) => {
            if (isGalleryImgGrabbed) return;
            const { clientX } = event;
            setIsGalleryImgGrabbed(true);
            setGrabbedGalleryImgClientX(clientX);
            dispatch(uploadActions.startGrabbingGalleryImg(clickedIndex));
        },
        [dispatch, isGalleryImgGrabbed],
    );

    const grabbedGalleryTranslateHandler = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (!isGalleryImgGrabbed) return;
            if (grabbedGalleryImgIndex === null) return;
            const { clientX } = event;
            const gap = clientX - grabbedGalleryImgClientX;
            const indexToChange =
                (gap >= 0 ? Math.floor(gap / 106) : Math.ceil(gap / 106)) +
                parseInt(String((gap % 106) / 53));
            const filesIndexLimit = files.length - 1;
            const newIndex = grabbedGalleryImgIndex + indexToChange;
            const newIndexFixed =
                newIndex > filesIndexLimit
                    ? filesIndexLimit
                    : newIndex < 0
                    ? 0
                    : newIndex;
            dispatch(
                uploadActions.changeGrabbedGalleryTranslateCount(newIndexFixed),
            );
            setGrabbedGalleryImgTranslateX(gap);
        },
        [
            dispatch,
            files.length,
            grabbedGalleryImgIndex,
            grabbedGalleryImgClientX,
            isGalleryImgGrabbed,
        ],
    );

    const stopGalleryGrabbingHandler = useCallback(() => {
        if (!isGalleryImgGrabbed) return;
        if (grabbedGalleryImgIndex === null) return;
        setIsGalleryImgGrabbed(false);
        setGrabbedGalleryImgClientX(0);
        setGrabbedGalleryImgTranslateX(0);
        dispatch(uploadActions.changeGalleryOrder());
        dispatch(uploadActions.stopGrabbingGalleryImg());
    }, [isGalleryImgGrabbed, grabbedGalleryImgIndex, dispatch]);

    const calculatedGalleryImgTranslateX = useCallback(
        (index: number) => {
            // 아예 그랩을 시작하지 않음
            if (grabbedGalleryImgIndex === null) return index * 106;
            // 그랩을 시작했는데, translate를 아예 안함
            if (grabbedGalleryImgTranslateX === null) return index * 106;
            // 그랩 시작하고 transition도 있음. 그랩한 index에 대해
            if (grabbedGalleryImgIndex === index) {
                return index * 106 + grabbedGalleryImgTranslateX;
            }
            // 그랩 시작하고 transition도 있음. 그랩하지 않은 index에 대해
            else {
                // translate 정도가 다른 요소를 움직일만큼은 아님
                if (
                    grabbedGalleryImgNewIndex === grabbedGalleryImgIndex ||
                    grabbedGalleryImgNewIndex === null
                ) {
                    return index * 106;
                }
                if (
                    index <= grabbedGalleryImgIndex &&
                    index >= grabbedGalleryImgNewIndex
                ) {
                    return (index + 1) * 106;
                } else if (
                    index >= grabbedGalleryImgIndex &&
                    index <= grabbedGalleryImgNewIndex
                ) {
                    return (index - 1) * 106;
                } else {
                    // 그랩한 img가 다시 돌아올 떄 다른 img 원상복귀
                    return index * 106;
                }
            }
        },
        [
            grabbedGalleryImgTranslateX,
            grabbedGalleryImgNewIndex,
            grabbedGalleryImgIndex,
        ],
    );

    return (
        <>
            {isWarnigMaxImageNumberModalOn && (
                <WarningMaxUploadNumberModal
                    warnigContent="images"
                    onModalOn={() => setIsWarnigMaxImageNumberModalOn(true)}
                    onModalOff={() => setIsWarnigMaxImageNumberModalOn(false)}
                />
            )}
            <UploadHeader
                excuteBeforePrevStep={() => {
                    fixOverTranformedImage(files[currentIndex].scale);
                    dispatch(uploadActions.startWarningModal("toDragAndDrop"));
                }}
                excuteBeforeNextStep={() =>
                    fixOverTranformedImage(files[currentIndex].scale)
                }
            />
            <StyledCut
                url={files[currentIndex].url}
                processedCurrentWidth={processedCurrentWidth}
                ratioType={ratioMode}
                counts={files.length}
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
                                        ratioMode === ratioMenu.type
                                            ? "active"
                                            : ""
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
                            resizeState
                                ? "on"
                                : resizeState === null
                                ? ""
                                : "off"
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
                                                  100 -
                                                  files[currentIndex].scale
                                              }%)`
                                            : `linear-gradient(to left, black ${
                                                  100 -
                                                  files[currentIndex].scale
                                              }%, white ${
                                                  files[currentIndex].scale
                                              }%)`,
                                }}
                            ></input>
                        </div>
                    </div>
                    <div
                        className={`gallery ${
                            galleryState
                                ? "on"
                                : galleryState === null
                                ? ""
                                : "off"
                        }`}
                    >
                        <div className="upload__galleryImgsWrapper">
                            <div
                                className="upload__galleryImgs"
                                ref={gallerySliderRef}
                                onScroll={galleryScrollHandler}
                            >
                                {files.map((file, index) => (
                                    <div
                                        className="upload__galleryImgWrapper"
                                        key={file.url}
                                        onClick={() =>
                                            dispatch(
                                                uploadActions.changeIndex(
                                                    index,
                                                ),
                                            )
                                        }
                                        onMouseDown={(
                                            event: MouseEvent<HTMLDivElement>,
                                        ) => galleryGrabHandler(event, index)}
                                        onMouseMove={
                                            grabbedGalleryTranslateHandler
                                        }
                                        onMouseUp={stopGalleryGrabbingHandler}
                                        onMouseLeave={
                                            stopGalleryGrabbingHandler
                                        }
                                        style={{
                                            position: "absolute",
                                            zIndex:
                                                grabbedGalleryImgIndex !==
                                                    null &&
                                                grabbedGalleryImgIndex === index
                                                    ? 1
                                                    : 0,
                                            transform: `translate3d(${calculatedGalleryImgTranslateX(
                                                index,
                                            )}px,0px,0px) scale(${
                                                grabbedGalleryImgIndex === index
                                                    ? 1.2
                                                    : 1
                                            })`,
                                            transition:
                                                grabbedGalleryImgIndex === index
                                                    ? "none"
                                                    : "transform 0.4s",
                                            opacity:
                                                grabbedGalleryImgIndex === index
                                                    ? 0.9
                                                    : 1,
                                        }}
                                    >
                                        <div
                                            className="upload__galleryImg"
                                            style={{
                                                minWidth: `${
                                                    94 * file.imageRatio
                                                }px`,
                                                backgroundImage: `
                                                linear-gradient(rgba(0, 0, 0, ${
                                                    currentIndex === index
                                                        ? 0
                                                        : 0.5
                                                }), rgba(0, 0, 0, ${
                                                    currentIndex === index
                                                        ? 0
                                                        : 0.5
                                                })),
                                             url(${file.url})`,
                                                backgroundPosition:
                                                    "center center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                overflow: "hidden",
                                                transform:
                                                    file.translateX === 0 &&
                                                    file.translateY === 0 &&
                                                    file.scale === 0
                                                        ? "none"
                                                        : `translate3d(${
                                                              imageRef.current
                                                                  ? (file.translateX /
                                                                        imageRef
                                                                            .current
                                                                            .offsetWidth) *
                                                                    100
                                                                  : 0
                                                          }%,${
                                                              imageRef.current
                                                                  ? (file.translateY /
                                                                        imageRef
                                                                            .current
                                                                            .offsetHeight) *
                                                                    100
                                                                  : 0
                                                          }%,0) scale(${
                                                              file.scale / 100 +
                                                              1
                                                          })`,
                                            }}
                                        ></div>
                                        {currentIndex === index && (
                                            <button
                                                className="uplaod__galleryDeleteBtn"
                                                onClick={() => {
                                                    setHandlingMode(null);
                                                    toggleInputState("gallery");
                                                    dispatch(
                                                        uploadActions.deleteFile(),
                                                    );
                                                }}
                                            >
                                                <Delete />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isGalleryScrollInLeft !== null &&
                                !isGalleryScrollInLeft && (
                                    <button
                                        className="upload__galleryImgs-leftArrow"
                                        onClick={galleryLeftScrollHandler}
                                    >
                                        <div></div>
                                    </button>
                                )}
                            {isGalleryScrollInRight !== null &&
                                !isGalleryScrollInRight && (
                                    <button
                                        className="upload__galleryImgs-rightArrow"
                                        onClick={galleryRightScrollHandler}
                                    >
                                        <div></div>
                                    </button>
                                )}
                        </div>
                        {files.length < MAX_IMAGES_NUMBER && (
                            <div className="upload__addBtnLayout">
                                <button onClick={buttonClickHandler}>
                                    <PlusIcon />
                                </button>
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
                                    />
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                {files.length > 1 && (
                    <UploadImgArrowAndDots
                        currentIndex={currentIndex}
                        files={files}
                        onLeftArrowClick={() => {
                            setHandlingMode((prev) => {
                                return prev !== "first" ? null : "first";
                            });
                            toggleInputState(handlingMode);
                            fixOverTranformedImage(files[currentIndex].scale);
                        }}
                        onRightArrowClick={() => {
                            setHandlingMode((prev) => {
                                return prev !== "first" ? null : "first";
                            });
                            toggleInputState(handlingMode);
                            fixOverTranformedImage(files[currentIndex].scale);
                        }}
                    />
                )}
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
        </>
    );
};

export default Cut;

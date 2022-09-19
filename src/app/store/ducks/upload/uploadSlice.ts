import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadArticle } from "app/store/ducks/upload/uploadThunk";

const initialState: UploadType.UploadStateProps = {
    isUploading: false,
    isGrabbing: false,
    isWarningModalOn: false,
    purposeOfWarningModal: "cancelUpload",
    step: "dragAndDrop",
    ratioMode: "square",
    files: [],
    currentIndex: 0,
    grabbedGalleryImgIndex: null,
    grabbedGalleryImgNewIndex: null,
    textareaValue: "",
    isLikesAndViewsHidden: false,
    isCommentBlocked: false,
};

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        submit: (state, action) => {},
        startUpload: (state) => {
            state.isUploading = true;
        },
        cancelUpload: (state) => {
            state.files.forEach((file) => {
                URL.revokeObjectURL(file.url);
                URL.revokeObjectURL(file.newUrl);
            });
            return initialState;
        },
        prevStep: (state) => {
            switch (state.step) {
                case "dragAndDrop":
                    return initialState;
                case "cut":
                    state.files.forEach((file) =>
                        window.URL.revokeObjectURL(file.url),
                    );
                    return { ...initialState, isUploading: true };
                case "edit":
                    state.step = "cut";
                    break;
                case "content":
                    state.step = "edit";
                    break;
            }
        },
        nextStep: (state) => {
            switch (state.step) {
                case "dragAndDrop":
                    state.step = "cut";
                    break;
                case "cut":
                    state.step = "edit";
                    break;
                case "edit":
                    state.step = "content";
                    break;
            }
        },
        addFile: (
            state,
            action: PayloadAction<UploadType.FileDragAndDropProps>,
        ) => {
            state.files.push({
                ...action.payload,
                translateX: 0,
                translateY: 0,
                scale: 0,
                grabbedPosition: { x: 0, y: 0 },
                brightness: 0,
                contrast: 0,
                saturate: 0,
                blur: 0,
                newUrl: "",
                alternativeText: "",
                hashtags: [],
                blob: null,
            });
        },
        startGrabbing: (state) => {
            state.isGrabbing = true;
        },
        stopGrabbing: (state) => {
            state.isGrabbing = false;
        },
        // Cut
        changeRatioMode: (
            state,
            action: PayloadAction<UploadType.RatioType>,
        ) => {
            state.ratioMode = action.payload;
        },
        resetGrabbedPosition: (state) => {
            state.files[state.currentIndex].grabbedPosition = { x: 0, y: 0 };
        },
        startGrab: (
            state,
            action: PayloadAction<UploadType.GrabbedPositionProps>,
        ) => {
            state.files[state.currentIndex].grabbedPosition = action.payload;
        },
        startTranslate: (
            state,
            action: PayloadAction<UploadType.TranslateProps>,
        ) => {
            state.files[state.currentIndex].translateX =
                action.payload.translateX;
            state.files[state.currentIndex].translateY =
                action.payload.translateY;
        },
        fixOverTranslatedImg: (
            state,
            action: PayloadAction<{
                widthGapRatio: number;
                heightGapRatio: number;
            }>,
        ) => {
            // 객체 형태로 하면 최신 "값"을 가져오지 못함
            const { widthGapRatio, heightGapRatio } = action.payload;
            const currentFile = state.files[state.currentIndex];
            if (widthGapRatio === 0) {
                currentFile.translateX = 0;
            } else {
                if (currentFile.translateX > widthGapRatio) {
                    currentFile.translateX = widthGapRatio;
                } else if (currentFile.translateX < -widthGapRatio) {
                    currentFile.translateX = -widthGapRatio;
                }
            }
            if (heightGapRatio === 0) {
                currentFile.translateY = 0;
            } else {
                if (currentFile.translateY > heightGapRatio) {
                    currentFile.translateY = heightGapRatio;
                } else if (currentFile.translateY < -heightGapRatio) {
                    currentFile.translateY = -heightGapRatio;
                }
            }
        },
        changeScale: (state, action: PayloadAction<number>) => {
            state.files[state.currentIndex].scale = action.payload;
        },
        nextIndex: (state) => {
            state.currentIndex++;
        },
        prevIndex: (state) => {
            state.currentIndex--;
        },
        changeIndex: (state, action: PayloadAction<number>) => {
            if (
                action.payload <= state.files.length - 1 &&
                action.payload > -1
            ) {
                state.currentIndex = action.payload;
            }
        },
        deleteFile: (state) => {
            state.files = state.files.filter(
                (file, index) => index !== state.currentIndex,
            );
            if (state.currentIndex !== 0) {
                state.currentIndex--;
            }
            if (state.files.length === 0) {
                state.currentIndex = 0;
                state.step = "dragAndDrop";
            }
        },
        startGrabbingGalleryImg: (state, action: PayloadAction<number>) => {
            state.grabbedGalleryImgIndex = action.payload;
            state.grabbedGalleryImgNewIndex = action.payload;
        },
        stopGrabbingGalleryImg: (state) => {
            state.grabbedGalleryImgIndex = null;
            state.grabbedGalleryImgNewIndex = null;
        },
        changeGrabbedGalleryTranslateCount: (
            state,
            action: PayloadAction<number>,
        ) => {
            state.grabbedGalleryImgNewIndex = action.payload;
        },
        changeGalleryOrder: (state) => {
            if (
                state.grabbedGalleryImgIndex !== null &&
                state.grabbedGalleryImgNewIndex !== null
            ) {
                const translatedFile =
                    state.files[state.grabbedGalleryImgIndex];
                // 3 -> 2
                // 0 1 2 3 4 5
                // 0 1 3 2 4 5  0~1 / / 2~5(본인 뺴고)
                //
                // 3 -> 4
                // 0 1 2 3 4 5
                // 0 1 2 4 3 5 0~4(본인 빼고) / / 5
                if (
                    state.grabbedGalleryImgNewIndex <
                    state.grabbedGalleryImgIndex
                ) {
                    const prevFiles = state.files.filter(
                        (file, index) =>
                            state.grabbedGalleryImgNewIndex !== null &&
                            index < state.grabbedGalleryImgNewIndex,
                    );

                    const nextFiles = state.files.filter(
                        (file, index) =>
                            state.grabbedGalleryImgNewIndex !== null &&
                            index >= state.grabbedGalleryImgNewIndex &&
                            file !== translatedFile,
                    );
                    state.files = [...prevFiles, translatedFile, ...nextFiles];
                } else if (
                    state.grabbedGalleryImgNewIndex >
                    state.grabbedGalleryImgIndex
                ) {
                    const prevFiles = state.files.filter(
                        (file, index) =>
                            state.grabbedGalleryImgNewIndex !== null &&
                            index <= state.grabbedGalleryImgNewIndex &&
                            file !== translatedFile,
                    );

                    const nextFiles = state.files.filter(
                        (file, index) =>
                            state.grabbedGalleryImgNewIndex !== null &&
                            index > state.grabbedGalleryImgNewIndex,
                    );
                    state.files = [...prevFiles, translatedFile, ...nextFiles];
                }
                state.currentIndex = state.grabbedGalleryImgNewIndex;
                // state.files = [...prevArr, translatedFile, ...nextArr];
            }
        },
        changeAdjustInput: (
            state,
            action: PayloadAction<{
                type: UploadType.AdjustInputTextType;
                value: number;
            }>,
        ) => {
            switch (action.payload.type) {
                case "밝기":
                    state.files[state.currentIndex].brightness =
                        action.payload.value;
                    break;
                case "대비":
                    state.files[state.currentIndex].contrast =
                        action.payload.value;
                    break;
                case "채도":
                    state.files[state.currentIndex].saturate =
                        action.payload.value;
                    break;
                case "흐리게":
                    state.files[state.currentIndex].blur = action.payload.value;
                    break;
            }
        },
        resetAdjustInput: (
            state,
            action: PayloadAction<UploadType.AdjustInputTextType>,
        ) => {
            switch (action.payload) {
                case "밝기":
                    state.files[state.currentIndex].brightness = 0;
                    break;
                case "대비":
                    state.files[state.currentIndex].contrast = 0;
                    break;
                case "채도":
                    state.files[state.currentIndex].saturate = 0;
                    break;
                case "흐리게":
                    state.files[state.currentIndex].blur = 0;
                    break;
            }
        },
        addNewFileUrl: (
            state,
            action: PayloadAction<{
                url: string;
                index: number;
                blob: Blob | null;
            }>,
        ) => {
            state.files[action.payload.index].newUrl = action.payload.url;
            state.files[action.payload.index].blob = action.payload.blob;
        },
        resetNewFileUrl: (state) => {
            state.files.forEach((file) => {
                file.newUrl = "";
            });
        },
        setTextareaValue: (state, action: PayloadAction<string>) => {
            state.textareaValue = action.payload;
        },
        addEmojiOnTextarea: (state, action: PayloadAction<string>) => {
            state.textareaValue += action.payload;
        },
        setAlternativeValue: (
            state,
            action: PayloadAction<{ value: string; index: number }>,
        ) => {
            state.files[action.payload.index].alternativeText =
                action.payload.value;
        },
        toggleIsLikesAndViewsHidden: (state) => {
            state.isLikesAndViewsHidden = !state.isLikesAndViewsHidden;
        },
        toggleIsCommentBlocked: (state) => {
            state.isCommentBlocked = !state.isCommentBlocked;
        },
        addHashtags: (state, action: PayloadAction<UploadType.HashtagType>) => {
            const index = state.files[state.currentIndex].hashtags.findIndex(
                (hashtag) => hashtag.username === action.payload.username,
            );
            if (index === -1) {
                state.files[state.currentIndex].hashtags.push(action.payload);
            } else {
                state.files[state.currentIndex].hashtags[index] =
                    action.payload;
            }
        },
        deleteHashtag: (state, action: PayloadAction<number>) => {
            state.files[state.currentIndex].hashtags = state.files[
                state.currentIndex
            ].hashtags.filter((hashtag, index) => index !== action.payload);
        },
        startWarningModal: (
            state,
            action: PayloadAction<UploadType.PurposeOfWarningModalType>,
        ) => {
            state.isWarningModalOn = true;
            state.purposeOfWarningModal = action.payload;
        },
        // excuteFunctionAfterWarning: (state) => {
        //     state.isWarningModalOn = false;
        //     state.functionAfterWarning && state.functionAfterWarning();
        // },
        cancelWarningModal: (state) => {
            state.isWarningModalOn = false;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(uploadArticle.pending, (state) => {
                state.step = "uploading";
            })
            .addCase(uploadArticle.fulfilled, (state) => {
                state.step = "complete";
            })
            .addCase(uploadArticle.rejected, (state) => {
                return initialState;
            });
    },
});

export const { actions: uploadActions, reducer: uploadReducer } = uploadSlice;

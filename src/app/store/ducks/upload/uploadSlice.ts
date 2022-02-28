import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UploadType.UploadStateProps = {
    isUploading: false,
    isGrabbing: false,
    step: "dragAndDrop",
    ratioMode: "square",
    files: [],
    currentIndex: 0,
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
            return initialState;
        },
        toCutStep: (state) => {
            state.step = "cut";
        },
        prevStep: (state) => {
            switch (state.step) {
                case "dragAndDrop":
                    return initialState;
                case "cut":
                    // 나중에 경고 모달 필요
                    return { ...initialState, isUploading: true };
                case "filter":
                    state.step = "cut";
                    break;
                case "content":
                    state.step = "filter";
                    break;
            }
        },
        nextStep: (state) => {
            switch (state.step) {
                case "dragAndDrop":
                    state.step = "cut";
                    break;
                case "cut":
                    state.step = "filter";
                    break;
                case "filter":
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
            action: PayloadAction<{ widthGap: number; heightGap: number }>,
        ) => {
            // 객체 형태로 하면 최신 "값"을 가져오지 못함
            const { widthGap, heightGap } = action.payload;
            const currentFile = state.files[state.currentIndex];
            if (widthGap === 0) {
                currentFile.translateX = 0;
            } else {
                if (currentFile.translateX > widthGap) {
                    currentFile.translateX = widthGap;
                } else if (currentFile.translateX < -widthGap) {
                    currentFile.translateX = -widthGap;
                }
            }
            if (heightGap === 0) {
                currentFile.translateY = 0;
            } else {
                if (currentFile.translateY > heightGap) {
                    currentFile.translateY = heightGap;
                } else if (currentFile.translateY < -heightGap) {
                    currentFile.translateY = -heightGap;
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
    },
});

export const { actions: uploadActions, reducer: uploadReducer } = uploadSlice;

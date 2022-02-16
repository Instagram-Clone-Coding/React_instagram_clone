import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UploadType.UploadStateProps = {
    isUploading: false,
    step: "dragAndDrop",
    files: [],
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
        prevStep: (state) => {
            switch (state.step) {
                case "dragAndDrop":
                    return initialState;
                case "cut":
                    // 나중에 경고 모달 필요
                    state.files = [];
                    state.step = "dragAndDrop";
                    break;
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
        addFile: (state, action: PayloadAction<UploadType.FileType>) => {
            state.files.push(action.payload);
        },
    },
});

export const { actions: uploadActions, reducer: uploadReducer } = uploadSlice;

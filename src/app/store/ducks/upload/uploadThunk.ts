import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";
import { authorizedCustomAxios } from "customAxios";

export const uploadArticle = createAsyncThunk<
    AxiosType.ResponseType,
    undefined,
    { state: RootState }
>("upload/uploadArticle", async (payload, ThunkOptions) => {
    try {
        const {
            upload: {
                textareaValue,
                files,
                isCommentBlocked,
                isLikesAndViewsHidden,
            },
            auth: { userInfo },
        } = ThunkOptions.getState();
        if (!userInfo) throw ThunkOptions.rejectWithValue("로그인해주세요.");
        const { memberName, memberUsername } = userInfo;
        const formData = new FormData();
        formData.append("content", textareaValue);
        formData.append("commentFlag", JSON.stringify(isCommentBlocked));
        let hashtagIndex = 0;
        for (let i = 0; i < files.length; i++) {
            const currentFileObj = files[i];
            // ** Blob -> File 로 변환**
            if (!currentFileObj.blob) return;
            let file = new File([currentFileObj.blob], `file${i}.png`);
            console.log(file);
            formData.append(`postImages[${i}]`, file);
            formData.append(
                `altText[${i}]`,
                currentFileObj.alternativeText.trim() ||
                    `Photo by ${memberName} with ${memberUsername}`,
            );
            currentFileObj.hashtags.forEach((hashtag) => {
                formData.append(
                    `postImageTags[${hashtagIndex}].id`,
                    JSON.stringify(i),
                );
                formData.append(
                    `postImageTags[${hashtagIndex}].username`,
                    hashtag.username,
                );
                formData.append(
                    `postImageTags[${hashtagIndex}].tagX`,
                    JSON.stringify(hashtag.tagX),
                );
                formData.append(
                    `postImageTags[${hashtagIndex}].tagY`,
                    JSON.stringify(hashtag.tagY),
                );
                hashtagIndex++;
            });
        }
        authorizedCustomAxios.defaults.headers.post["Content-Type"] =
            "multipart/form-data";
        const {
            data: { data },
        } = await authorizedCustomAxios.post(`/posts`, formData);
        console.log(data);
        return data;
    } catch (error) {
        if (!window.navigator.onLine) {
            throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`);
        } else {
            throw ThunkOptions.rejectWithValue(error);
        }
    }
});
// postImages[0] = "이미지"
// postImages[1] = "이미지2"
// postImageTags[index].id , postImageTAgs[index].tagX
// altTexts[0] = "대체텍스트1", altTexts[1] = "데채텍스트2"

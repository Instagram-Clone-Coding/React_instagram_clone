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
                isLikesAndViewsHidden, // 좋아요와 조회수 숨기기
            },
            auth: { userInfo },
        } = ThunkOptions.getState();
        if (!userInfo) throw ThunkOptions.rejectWithValue("로그인해주세요.");
        const { memberName, memberUsername } = userInfo;
        const formData = new FormData();
        formData.append("content", textareaValue);
        formData.append("commentFlag", JSON.stringify(isCommentBlocked));
        formData.append("likeFlag", JSON.stringify(isLikesAndViewsHidden));

        let hashtagIndex = 0;
        for (let i = 0; i < files.length; i++) {
            const currentFileObj = files[i];
            // ** Blob -> File 로 변환**
            if (!currentFileObj.blob) return;
            let file = new File([currentFileObj.blob], `file${i}.png`);
            formData.append(`postImages[${i}]`, file);
            formData.append(
                `altTexts[${i}]`,
                currentFileObj.alternativeText.trim() ||
                    `Photo by ${memberName} with ${memberUsername}`,
            );
            currentFileObj.hashtags.forEach((hashtag) => {
                formData.append(
                    `postImageTags[${hashtagIndex}].id`, // 해당 태그가 어떤 이미지에 있는지
                    JSON.stringify(i),
                );
                formData.append(
                    `postImageTags[${hashtagIndex}].username`, // 해당 태그의 username
                    hashtag.username,
                );
                formData.append(
                    `postImageTags[${hashtagIndex}].tagX`, // 해당 태그의 상대적 위치(left로부터)
                    JSON.stringify(hashtag.tagX),
                );
                formData.append(
                    `postImageTags[${hashtagIndex}].tagY`, // 해당 태크의 상대적 위치(top으로부터)
                    JSON.stringify(hashtag.tagY),
                );
                hashtagIndex++;
            });
        }
        const {
            data: { data },
        } = await authorizedCustomAxios.post(`/posts`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        if (!window.navigator.onLine) {
            throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`);
        } else {
            throw ThunkOptions.rejectWithValue(error);
        }
    }
});

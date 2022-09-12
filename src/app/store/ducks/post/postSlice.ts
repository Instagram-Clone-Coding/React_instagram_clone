import { createSlice } from "@reduxjs/toolkit";

const initialState: PostType.ArticleStateProps = {
    followingMemberUsernameLikedPost: null, // 내가 팔로우한 사람 중에서 이 글을 좋아한 사람 있으면 보내줌
    member: {
        id: 0,
        username: "",
        name: "",
        image: {
            imageUrl: "",
            imageType: "",
            imageName: "",
            imageUUID: "",
        },
        hasStory: false,
    },
    postBookmarkFlag: false, // 내가 북마크 했는지
    postCommentsCount: 0,
    postContent: "",
    postId: 0,
    postImages: [],
    postLikeFlag: false, // 내가 좋아요 했는지
    postLikesCount: 0,
    postUploadDate: "",
    hashtagsOfContent: [],
    mentionsOfContent: [],
    likeOptionFlag: false, // 업로드한 사람만 좋아요 및 좋아요한 사람 확인 가능
    commentOptionFlag: false,
    isFollowing: false,
    followLoading: false,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (build) => {},
});

export const postReducer = postSlice.reducer;

export const postActions = postSlice.actions;

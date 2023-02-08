import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postFollow, postUnfollow } from "app/store/ducks/home/homThunk";

const initialState: ParagraphType.ParagraphStateProps = {
    isDataFetching: true,
    recentPosts: [],
    articleObj: {
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
        following: false,
        followLoading: false,
    },
};

const paragraphSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setArticle: (state, action: PayloadAction<PostType.ArticleProps>) => {
            state.articleObj = {
                ...action.payload,
                followLoading: false,
            };
            state.isDataFetching = false;
        },
        setRecentPosts: (state, action: PayloadAction<Profile.PostType[]>) => {
            state.recentPosts = action.payload;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(postFollow.pending, (state, action) => {
                state.articleObj.followLoading = true;
            })
            .addCase(postFollow.fulfilled, (state, action) => {
                state.articleObj.followLoading = false;
                state.articleObj.following = true;
            })
            .addCase(postFollow.rejected, (state, action) => {
                state.articleObj.followLoading = false;
                state.articleObj.following = true;
            })
            .addCase(postUnfollow.fulfilled, (state, action) => {
                state.articleObj.following = false;
            })
            .addCase(postUnfollow.rejected, (state, action) => {
                state.articleObj.following = true;
            });
    },
    // extraReducers: (build) => {},
});

export const paragraphReducer = paragraphSlice.reducer;

export const paragraphActions = paragraphSlice.actions;

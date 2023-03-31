import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postFollow, postUnfollow } from "app/store/ducks/home/homThunk";

const initialState: ParagraphType.ParagraphStateProps = {
    isDataFetching: true,
    recentPosts: [],
    replyParentObj: null,
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
        likeOptionFlag: true, // 좋아요, 조회수를 공개할 것인지(false면 본인만 확인 가능)
        commentOptionFlag: true, // 댓글 기능을 활성화 여부
        following: false,
        followLoading: false,
        recentComments: [],
        comments: [],
    },
};

const paragraphSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        resetParagraph: (state) => {
            return initialState;
        },
        setArticle: (state, action: PayloadAction<PostType.ArticleProps>) => {
            state.articleObj = {
                ...action.payload,
                followLoading: false,
                recentComments: action.payload.recentComments.slice(0, 2),
                comments: action.payload.recentComments,
            };
            state.isDataFetching = false;
        },
        setRecentPosts: (state, action: PayloadAction<Profile.PostType[]>) => {
            state.recentPosts = action.payload;
        },
        startReply: (
            state,
            action: PayloadAction<ParagraphType.ReplyParentObjType>,
        ) => {
            state.replyParentObj = action.payload;
        },
        finishReply: (state) => {
            state.replyParentObj = null;
        },
        setNextComments: (
            state,
            action: PayloadAction<PostType.CommentType[]>,
        ) => {
            state.articleObj.comments.push(...action.payload);
        },
        writeNewComment: (
            state,
            action: PayloadAction<{
                comment: PostType.CommentType;
                parentId?: number;
            }>,
        ) => {
            if (!action.payload.parentId) {
                state.articleObj.comments.unshift(action.payload.comment);
                state.articleObj.recentComments.unshift(action.payload.comment);
            } else {
                state.articleObj.comments.forEach((comment) => {
                    state.replyParentObj = null;
                    if (comment.id === action.payload.parentId) {
                        comment.repliesCount++;
                        if (comment.replies) {
                            comment.replies.unshift(action.payload.comment);
                        } else {
                            comment.replies = [action.payload.comment];
                        }
                    }
                });
            }
        },
        deleteComment: (
            state,
            action: PayloadAction<{ commentId: number }>,
        ) => {
            state.articleObj.comments = state.articleObj.comments.filter(
                (comment) => comment.id !== action.payload.commentId,
            );
            state.articleObj.comments.forEach((comment) => {
                if (comment.replies) {
                    comment.replies = comment.replies.filter(
                        (reply) => reply.id !== action.payload.commentId,
                    );
                }
            });
        },
        setReplies: (
            state,
            action: PayloadAction<{
                replies: PostType.CommentType[];
                parentId: number;
            }>,
        ) => {
            state.articleObj.comments.forEach((comment) => {
                if (comment.id === action.payload.parentId) {
                    if (comment.replies) {
                        comment.replies.push(...action.payload.replies);
                    } else {
                        comment.replies = action.payload.replies;
                    }
                }
            });
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

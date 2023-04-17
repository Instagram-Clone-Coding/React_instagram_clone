declare module Direct {
    interface PostMessageDTO {
        postId: number;
        postImage: CommonType.ImageInfo;
        postImageCount: number;
        status: string;
        uploader: AuthType.UserInfo;
    }

    interface MessageDTO {
        messageId: number;
        content: string | PostMessageDTO;
        messageType: messageType;
        messageDate: string;
        sender: CommonType.memberType;
        roomId: number;
        senderImage: CommonType.ImageInfo;
        likeMembers: CommonType.memberType[];
    }

    interface ChatItem {
        roomId: number;
        lastMessage: MessageDTO;
        unreadFlag: boolean;
        inviter: inviterProps;
        members: memberProps[];
        typing?: boolean;
    }

    interface inviterProps {
        username: string;
        name: string;
        imageUrl: string;
    }

    interface memberProps {
        username: string;
        name: string;
        imageUrl: string;
    }

    interface RoomsProps {
        status: boolean;
        chatRoomId: number;
        inviter: inviterProps; // 초대한사람
        members: memberProps[]; // 초대받은사람
    }
    type modalType =
        | "deleteChat"
        | "block"
        | "report"
        | "newChat"
        | "convertAccount"
        | "deleteAll"
        | "deleteChatMessage"
        | "likedMember"
        | null;
    type currentSectionViewType =
        | "inbox"
        | "detail"
        | "chat"
        | "requests"
        | "requestsChat";
    type messageType = "TEXT" | "POST";
}
declare module UIType {
    interface ButtonProps {
        bgColor?: string;
        radius?: number;
        color?: string;
    }

    interface ContentBoxProps {
        padding: string;
        margin: string;
    }
}

declare module AxiosType {
    interface ResponseType {
        status: number;
        code: number;
        message: string;
    }
}

declare module AuthType {
    interface Token {
        type: string;
        accessToken: string;
    }

    interface TokenResponse extends AxiosType.ResponseType {
        data: AuthType.Token;
    }

    interface UserInfo {
        memberId: number;
        memberImageUrl: string;
        memberName: string;
        memberUsername: string;
    }

    interface signUpUserData {
        email: string;
        name: string;
        password: string;
        username: string;
    }

    interface useInputProps {
        value: string;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        onBlur?: () => void;
        onFocus?: () => void;
    }

    interface InputProps {
        inputName: "email" | "name" | "username" | "password" | "id" | "code";
        innerText: string;
        type: "text" | "password";
        inputProps: useInputProps;
        isValid?: boolean | null;
        isFocus?: boolean;
        hasValidator?: (value: string) => boolean;
    }
    interface resetPasswordState {
        email?: string;
    }

    type resetPasswordQuery = {
        username: string;
        code: string;
    };
}

declare module HomeType {
    type StoriesScrollPositionType = "left" | "right" | "center";
    interface homeStateProps {
        storiesScrollPosition: storiesScrollPositionType;
        articles: PostType.ArticleStateProps[];
        // location?
        isLoading: boolean; // 더미 로딩
        isExtraArticleLoading: boolean;
        extraArticlesCount: number;
        isAsyncError: boolean;
        hoveredUser: {
            avatarUrl: string;
            verified: boolean;
            isFollowing: boolean;
            realName: string;
            link: string;
            followingUsernames: string[];
            articlesNum: number;
            followersNum: number;
            followsNum: number;
            recentImgs: {
                src: string;
                param: string;
            }[]; // 최신 3개
        } | null;
        isCopiedNotification: boolean;
    }
}

declare module PostType {
    interface PostImgTagDTOProps {
        id: number;
        tag: {
            username: string;
            x: number;
            y: number;
        };
    }

    interface CommentType {
        id: number;
        commentLikeFlag: boolean;
        commentLikesCount: number;
        content: string;
        hashtagsOfContent: string[];
        member: CommonType.memberType;
        mentionsOfContent: string[];
        repliesCount: number;
        replies?: CommentType[];
        uploadDate: string;
    }

    interface ArticleProps {
        followingMemberUsernameLikedPost: null | string; // 내가 팔로우한 사람 중에서 이 글을 좋아한 사람 있으면 보내줌
        member: CommonType.memberType;
        postBookmarkFlag: boolean; // 내가 북마크 했는지
        postCommentsCount: number;
        postContent: string;
        postId: number;
        postImages: CommonType.PostImageDTOProps[];
        postLikeFlag: boolean; // 내가 좋아요 했는지
        postLikesCount: number;
        postUploadDate: string;
        hashtagsOfContent: string[];
        mentionsOfContent: string[];
        likeOptionFlag: boolean; // 업로드한 사람만 좋아요 및 좋아요한 사람 확인 가능
        commentOptionFlag: boolean; // 댓글 작성 가능 여부
        following: boolean;
        recentComments: CommentType[];
    }

    interface ArticleStateProps extends ArticleProps {
        followLoading: boolean;
    }

    interface LargerArticleStateProps extends ArticleStateProps {
        comments: CommentType[];
    }
}

declare module ParagraphType {
    interface ReplyParentObjType {
        id: number;
        username: string;
    }
    interface ParagraphStateProps {
        isDataFetching: boolean;
        articleObj: PostType.LargerArticleStateProps;
        recentPosts: Profile.PostType[];
        replyParentObj: ReplyParentObjType | null;
    }
}

declare module ModalType {
    type ActivatedModalType =
        | "unfollowing"
        | "report"
        | "articleMenu"
        | "commentMenu"
        | "shareWith"
        | null;

    interface ModalPositionProps {
        top: number;
        bottom: number;
        left: number;
    }

    interface FetchMiniProfileProps extends ModalPositionProps {
        memberUsername: string;
    }
    interface MiniProfileProps {
        blocked: boolean;
        blocking: boolean;
        follower: boolean;
        following: boolean;
        hasStory: boolean;
        followingMemberFollow: // 내가 팔로우 하는 사람 중에 이 유저를 팔로우하는 사람 대표 1명
        [
            {
                memberUsername: string;
            },
        ];
        followingMemberFollowCount: number; // 위 member 제외 나머지 수
        me: boolean;
        memberFollowersCount: number; // 유저를 팔로우우하는 사람
        memberFollowingsCount: number; // 유저가 팔로우하는 사람 전부
        memberPostsCount: number; // 게시글 수
        memberImage: {
            imageUrl: string;
            imageType: string;
            imageName: string;
            imageUUID: string;
        };
        memberName: string;
        memberPosts: { postId: number; postImageUrl: string }[]; // string
        memberUsername: string;
        memberWebsite: null | string;
    }

    interface MiniProfileStateProps extends MiniProfileProps {
        isLoading: boolean;
        modalPosition: ModalPositionProps;
    }

    interface ModalStateProps {
        activatedModal: ActivatedModalType;
        memberUsername: string; // dlwlrma
        memberImageUrl: string;
        postId: number | null;
        commentId: number | null;
        miniProfile: MiniProfileStateProps | null;
        isFollowing: boolean | null;
        isOnMiniProfile: boolean;
        isArticleAloneModalOn: boolean;
        articleAloneModalPostId: number | null;
    }
}

declare module UploadType {
    interface GrabbedPositionProps {
        x: number;
        y: number;
    }

    // 퍼센트 값으로 변경
    interface TranslateProps {
        translateX: number;
        translateY: number;
    }
    interface FileDragAndDropProps {
        imageRatio: number;
        width: number;
        height: number;
        url: string;
    }
    interface FileCutProps extends TranslateProps {
        grabbedPosition: GrabbedPositionProps;
        scale: number;
    }

    interface EditType {
        brightness: number;
        contrast: number;
        saturate: number;
        // 온도
        blur: number;
        // backgroundBlur
    }

    interface HashtagType {
        tagX: number;
        tagY: number;
        username: string;
    }
    interface ContentType {
        newUrl: string;
        alternativeText: string;
        hashtags: HashtagType[];
        blob: Blob | null;
    }
    interface FileProps
        extends FileDragAndDropProps,
            FileCutProps,
            EditType,
            ContentType {}
    // type FileProps = FileDragAndDropProps & FileCutProps;

    type RatioType = "original" | "square" | "thin" | "fat";
    type StepType =
        | "dragAndDrop"
        | "cut"
        | "edit"
        | "content"
        | "uploading"
        | "complete";
    type AdjustInputTextType = "밝기" | "대비" | "채도" | "흐리게";

    type PurposeOfWarningModalType = "toDragAndDrop" | "cancelUpload";
    interface UploadStateProps {
        isUploading: boolean;
        isGrabbing: boolean;
        isWarningModalOn: boolean;
        purposeOfWarningModal: PurposeOfWarningModalType;
        step: StepType;
        ratioMode: RatioType;
        files: FileProps[];
        currentIndex: number;
        grabbedGalleryImgIndex: number | null;
        grabbedGalleryImgNewIndex: number | null;
        textareaValue: string;
        isLikesAndViewsHidden: boolean;
        isCommentBlocked: boolean;
    }
}

declare module CommonType {
    interface FooterTextProps {
        text: string;
        url?: string;
    }
    interface ImageProps {
        width: number;
        height: number;
        position: string;
        url: string;
        size?: string; // background-size for retina display
    }

    interface ImageInfo {
        imageUrl: string;
        imageType: string;
        imageName: string;
        imageUUID: string;
    }

    interface memberType {
        id: number;
        username: string;
        name: string;
        image: ImageInfo;
        hasStory: boolean;
    }

    interface searchResultType {
        dtype: "MEMBER" | "HASHTAG";

        // MEMBER
        follwer?: boolean;
        following?: boolean;
        followingMemberFollow?: { memberUsername: string }[];
        member?: memberType;

        // HASHTAG
        name?: string;
        postCount?: number;
    }
    interface PostImageDTOProps {
        id: number;
        postImageUrl: string;
        postTags: PostImgTagDTOProps[];
        altText: string;
        // 받아온 후 처리
    }
}

declare module Profile {
    interface MemberProfileProps {
        memberUsername: string;
        memberName: string;
        memberWebsite: string | null;
        memberImage: CommonType.ImageInfo;
        memberIntroduce: string | null;
        memberPostsCount: number;
        memberFollowingsCount: number;
        memberFollowersCount: number;
        followingMemberFollow: null;
        blocking: boolean;
        following: boolean;
        follower: boolean;
        blocked: boolean;
        me: boolean;
    }

    interface PostType {
        postId: number;
        postImage: CommonType.PostImageDTOProps;
        hasManyPostImages: boolean;
        postCommentsCount: number;
        postLikesCount: number;
    }

    interface personType {
        // 팔로잉 팔로워 한명을 나타내는 타입입니다.
        member: CommonType.memberType;
        following: boolean;
        follower: boolean;
        me: boolean;
    }

    type modalType =
        | "userAction"
        | "setting"
        | "follower"
        | "unFollow"
        | "cut"
        | "block"
        | null;
    type currentCategoryType = "uploaded" | "tagged" | "saved";
}

declare module EditType {
    interface editItemType {
        memberUsername: string;
        memberName: string;
        memberWebsite: string | null;
        memberIntroduce: string | null;
        memberEmail: string | null;
        memberPhone: string | null;
        memberGender: string;
    }

    type editItemKeyType =
        | "memberUsername"
        | "memberName"
        | "memberWebsite"
        | "memberIntroduce"
        | "memberEmail"
        | "memberPhone"
        | "memberGender";

    type menuType =
        | "프로필 편집"
        | "비밀번호 변경"
        | "앱 및 웹사이트"
        | "이메일 및 SMS"
        | "푸시 알림"
        | "연락처 관리"
        | "개인정보 및 보안"
        | "로그인 활동"
        | "Instagram에서 보낸 이메일"
        | "도움말";

    type modalType = "image" | "gender" | null;
}

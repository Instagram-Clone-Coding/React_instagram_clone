declare module Direct {


    interface ChatItem {
        id: number;
        avatarImg: string;
        // 아이디
        memberUsername: string;
        //실제이름
        memberName:string;
        lastChatDate: string;
        lastMessage: string;
        isImLast: boolean;
        isRead:boolean;
    }
    type modalType = "deleteChat" | "block" | "report" | "newChat" | "convertAccount" |  null;
    type currentSectionViewType = "inbox" | "detail" | "chat" | "requests" | "requestsChat"

}

declare module UI {
    interface ButtonProps {
        bgColor?: string;
        radius?: number;
        color?: string;
    }
}

declare module Login {
    interface FooterTextProps {
        text: string;
        url?: string;
    }



    interface InputProps {
        inputName: "email" | "name" | "username" | "password" | "id";
        innerText: string;
        value: string;
        type: "text" | "password";
        onUserDataUpdater: Function;
        validator?: Function;
    }

    interface NewCardProps {
        padding: string;
        margin: string;
    }
}

declare module HomeType {
    export type StoriesScrollPositionType = "left" | "right" | "center";

    export type ActivatedModalType =
        | "hover"
        | "unfollowing"
        | "report"
        | "articleMenu"
        | "shareWith"
        | null;

    export interface PostImgTagDTOProps {
        id: number;
        tag: {
            username: string;
            x: number;
            y: number;
        };
    }

    export interface PostImageDTOProps {
        id: number;
        postImageUrl: string;
        postTagDTOs: PostImgTagDTOProps[];
        // 받아온 후 처리
    }

    interface ArticleProps {
        followingMemberUsernameLikedPost: null | string; // 내가 팔로우한 사람 중에서 이 글을 좋아한 사람 있으면 보내줌
        memberImageUrl: string;
        memberNickname: string;
        memberUsername: string;
        postBookmarkFlag: boolean; // 내가 북마크 했는지
        postCommentsCount: number;
        postContent: string;
        postId: number;
        postImageDTOs: PostImageDTOProps[];
        postLikeFlag: boolean; // 내가 좋아요 했는지
        postLikesCount: number;
        postUploadDate: string;
        // comment 몇 개 가져오기
    }

    export interface homeModalProps {
        activatedModal: activatedModalType;
        handledObj: null;
    }

    export interface homeStateProps {
        storiesScrollPosition: storiesScrollPositionType;
        articles: ArticleProps[];
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
        homeModal: homeModalProps;
    }
}

declare module Common {
    interface ImageProps {
        width: number;
        height: number;
        position: string;
        url:string;
    }
}
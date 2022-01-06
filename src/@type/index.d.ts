// 여기에 쓰는건 어때요?
export declare module globalType {
    //
    export interface asd {}
}

export declare module Direct {
    export interface ChatItem {
        id: number;
        avatarImg: string;
        userName: string;
        lastLoggedIn: string;
        lastMessage: string;
        isImLast: boolean;
    }
}

declare module HomeType {
    export type storiesScrollPositionType = "left" | "right" | "center";

    export type activatedModalType =
        | "hover"
        | "unfollowing"
        | "report"
        | "articleMenu"
        | "shareWith"
        | null;

    export interface homeModalProps {
        activatedModal: activatedModalType;
        handledObj: null;
    }
    export interface homeStateProps {
        storiesScrollPosition: storiesScrollPositionType;
        articles: {
            imgs: string[];
            location: string;
            hashtags: string[];
            text: string;
            owner: {
                username: string;
                avatarUrl: string;
            };
            likes: string[];
            comments: {
                username: string;
                comment: string;
            }[];
            createdAt: number;
        }[]; // 백엔드에서 댓글과 이 게시물에 내가 좋아요를 눌렀는지까지 보내주는지 등등
        // request와 response에 대해 소통 필요
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

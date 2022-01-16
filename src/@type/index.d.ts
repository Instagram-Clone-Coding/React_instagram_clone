// 여기에 쓰는건 어때요?
export declare module globalType {
    //
    export interface asd {}
}

// export 제거해도 동작** export 제거하기
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

declare module UI {
    interface ButtonProps {
        bgColor?: string;
        radius?: number;
        color?: string;
    }

    interface CardProps {
        isNav?: boolean;
        radius?: number;
    }
}

export declare module Login {
    export interface FooterTextProps {
        text: string;
        url?: string;
    }

    export interface ImageProps {
        width: number;
        height: number;
        position: string;
    }

    export interface InputProps {
        innerText: string;
        inputName: string;
        setUserData: Function;
    }

    export interface NewCardProps {
        padding: string;
        margin: string;
    }
}

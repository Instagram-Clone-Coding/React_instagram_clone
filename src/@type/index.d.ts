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

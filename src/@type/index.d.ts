declare module Direct {
    interface ChatItem {
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

declare module Login {
    interface FooterTextProps {
        text: string;
        url?: string;
    }

    interface ImageProps {
        width: number;
        height: number;
        position: string;
    }

    interface InputProps {
        inputName: "email" | "name" | "username" | "password" | "id";
        innerText: string;
        onUserDataUpdater: Function;
        type: "text" | "password";
        value: string;
    }

    interface NewCardProps {
        padding: string;
        margin: string;
    }
}

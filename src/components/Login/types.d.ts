import { Interface } from "readline";

// image
interface imageProps {
    width: number;
    height: number;
    position: string;
}

// text
interface LoginInputProps {
    innerText: string;
    inputName: string;
    setUserData: Function;
}

interface footerTextProps {
    text: string;
    url?: string;
}

interface footerContentProps {
    content: Array<footerTextProps>;
}

// style
interface NewCardProps {
    padding: string;
    margin: string;
}

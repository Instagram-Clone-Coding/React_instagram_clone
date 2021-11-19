// image
export interface imageProps {
    width: number;
    height: number;
    position: string;
}

// text
export interface textProps {
    innerText: string;
}

export interface footerTextProps {
    text: string;
    url?: string;
}

export interface footerContentProps {
    content: Array<footerTextProps>;
}

// style
export interface NewCardProps {
    padding: string;
    margin: string;
}

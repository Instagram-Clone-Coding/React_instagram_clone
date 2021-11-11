import sprite2 from "../../img/sprite2.png";
import styled, { DefaultTheme } from "styled-components";

interface StyledStoryCircleProps {
    scale: number;
    type: "unread" | "read" | "default";
}

const handleBackground = (
    type: "unread" | "read" | "default",
    theme: DefaultTheme
) => {
    switch (type) {
        case "unread":
            return `url(${sprite2}) no-repeat 17.287% 64.265%`;
        case "read":
            return theme.color.bd_gray;
        case "default":
            return "";
    }
};

const handleBackgroundWidth = (
    type: "unread" | "read" | "default",
    scale: number
) => {
    switch (type) {
        case "unread":
            return `${64 * scale}px`;
        case "read":
            return `${64 * scale - 2}px`;
        case "default":
            return `${64 * scale}px`;
    }
};

const StyledStoryCircle = styled.div<StyledStoryCircleProps>`
    background: ${(props) => handleBackground(props.type, props.theme)};
    background-size: ${(props) =>
        `${440 * props.scale}px ${411 * props.scale}px`};
    width: ${(props) => handleBackgroundWidth(props.type, props.scale)};
    height: ${(props) => handleBackgroundWidth(props.type, props.scale)};
    border-radius: ${(props) => props.type === "read" && `50%`};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: ${(props) =>
            props.type !== "default"
                ? `${64 * props.scale - 10}px`
                : `${64 * props.scale}px`};
        height: ${(props) =>
            props.type !== "default"
                ? `${64 * props.scale - 10}px`
                : `${64 * props.scale}px`};
        border: ${(props) => props.type === "read" && `2px solid white`};
        box-sizing: ${(props) => props.type === "read" && "content-box"};
        border-radius: 50%;
        z-index: 0;
    }
`;

interface StoryCircleProps {
    type: "unread" | "read" | "default";
    src: string;
    username: string;
    scale: number;
    onMouseEnter?: (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>
    ) => void;
    onMouseLeave?: () => void;
}

const StoryCircle = ({
    type = "unread",
    src,
    username,
    scale,
    onMouseEnter,
    onMouseLeave,
}: StoryCircleProps) => {
    return (
        <StyledStoryCircle
            type={type}
            scale={scale}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <img src={src} alt={username} />
        </StyledStoryCircle>
    );
};

export default StoryCircle;

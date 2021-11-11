import sprite2 from "../../img/sprite2.png";
import styled from "styled-components";

interface CircleScaleProp {
    scale: number;
}

const StyledStoryCircle = styled.div<CircleScaleProp>`
    background: url(${sprite2}) no-repeat 17.287% 64.265%;
    background-size: 440px 411px;
    background-size: ${(props) =>
        `${440 * props.scale}px ${411 * props.scale}px`};
    width: ${(props) => `${64 * props.scale}px`};
    height: ${(props) => `${64 * props.scale}px`};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: ${(props) => `${64 * props.scale - 10}px`};
        height: ${(props) => `${64 * props.scale - 10}px`};
        border-radius: 50%;
        z-index: 0;
    }
    // 읽었을 경우
    &.read {
        background: ${(props) => props.theme.color.bd_gray};
        width: ${(props) => `${64 * props.scale - 2}px`};
        height: ${(props) => `${64 * props.scale - 2}px`};
    }
`;

interface StoryCircleProps {
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
    src,
    username,
    scale,
    onMouseEnter,
    onMouseLeave,
}: StoryCircleProps) => {
    return (
        <StyledStoryCircle
            scale={scale}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <img src={src} alt={username} />
        </StyledStoryCircle>
    );
};

export default StoryCircle;

import styled from "styled-components";

interface CircleWidthProps {
    width: number;
}

const StyledStoryCircle = styled.div<CircleWidthProps>`
    width: ${(props) => props.width + "px"};
    height: ${(props) => props.width + "px"};
    border-radius: 50%;
    background: radial-gradient(circle at bottom left, #f58529 20%, #c42d91);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: ${(props) => props.width - 10 + "px"};
        height: ${(props) => props.width - 10 + "px"};
        border-radius: 50%;
        border: 2px solid white;
        box-sizing: content-box;
        z-index: 0;
    }
    // 읽었을 경우
    &.read {
        background: ${(props) => props.theme.color.bd_gray};
        width: ${(props) => props.width - 2 + "px"};
        height: ${(props) => props.width - 2 + "px"};
    }
`;

interface StoryCircleProps {
    src: string;
    username: string;
    width: number;
}

const StoryCircle = ({ src, username, width }: StoryCircleProps) => {
    return (
        <StyledStoryCircle width={width}>
            <img src={src} alt={username} />
        </StyledStoryCircle>
    );
};

export default StoryCircle;

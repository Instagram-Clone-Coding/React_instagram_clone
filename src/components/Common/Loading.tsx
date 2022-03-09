import { ReactComponent as LoadingCircle } from "assets/Svgs/loadingCircle.svg";
import styled from "styled-components";

const StyledLoading = styled.div`
    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg {
        -webkit-animation: rotating 1.2s steps(12) infinite;
        -moz-animation: rotating 1.2s steps(12) infinite;
        -ms-animation: rotating 1.2s steps(12) infinite;
        -o-animation: rotating 1.2s steps(12) infinite;
        animation: rotating 1.2s steps(12) infinite;
    }
`;

interface LoadingProps {
    size: number;
    isInButton?: boolean;
}

const Loading = ({ size, isInButton = false }: LoadingProps) => {
    return (
        <StyledLoading>
            <LoadingCircle
                width={size}
                height={size}
                fill={isInButton ? "#fff" : "#555555"}
            />
        </StyledLoading>
    );
};

export default Loading;

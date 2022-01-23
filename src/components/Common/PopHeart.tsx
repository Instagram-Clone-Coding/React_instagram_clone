import styled from "styled-components";
import { ReactComponent as RedHeart } from "../../assets/Svgs/redHeart.svg";
import { ReactComponent as EmptyHeart } from "../../assets/Svgs/emptyHeart.svg";
import { useState } from "react";

const HeartBox = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    svg.pop {
        animation: pop 0.3s forwards;
        @-webkit-keyframes pop {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: none;
            }
        }
        @keyframes pop {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: none;
            }
        }
    }
    .not:hover {
        opacity: 0.6;
    }
`;

interface PopHeartProps {
    className?: string;
    size: number;
    isLiked: boolean;
    onToggleLike: () => void;
}

const PopHeart = ({
    className,
    size,
    isLiked,
    onToggleLike,
}: PopHeartProps) => {
    const [isFirst, setIsFirst] = useState(true);

    const checkFirstRenderingHandler = () => {
        isFirst && setIsFirst(false);
        onToggleLike();
    };

    return (
        <HeartBox onClick={checkFirstRenderingHandler} className={className}>
            {isLiked ? (
                <RedHeart
                    className={isLiked && !isFirst ? "pop" : ""}
                    height={size}
                    width={size}
                />
            ) : (
                <EmptyHeart
                    className={!isLiked && !isFirst ? "pop not" : "not"}
                    height={size}
                    width={size}
                />
            )}
        </HeartBox>
    );
};

export default PopHeart;

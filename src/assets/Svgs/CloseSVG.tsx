interface CloseSVGProps {
    color: string;
    size: string;
    onClick?: () => void;
}

const CloseSVG = ({ color, size, onClick }: CloseSVGProps) => {
    return (
        <svg
            onClick={onClick}
            aria-label="닫기"
            color={color}
            fill={color}
            height={size}
            role="img"
            viewBox="0 0 24 24"
            width={size}
        >
            <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin={"round"}
                strokeWidth="3"
            />
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
            />
        </svg>
    );
};

export default CloseSVG;

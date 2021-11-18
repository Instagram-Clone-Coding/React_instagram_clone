import styled from "styled-components";

const StyledModalHeader = styled.div`
    height: 43px;
    display: flex;
    align-items: center;
    border-bottom: ${(props) => props.theme.color.bd_gray} 1px solid;
    & > h1 {
        flex: 1;
        text-align: center;
        font-size: 16px;
        font-weight: ${(props) => props.theme.font.bold};
    }
    & > div,
    & > button {
        min-width: 48px;
    }
`;

interface ModalHeaderProps {
    title: string;
    onModalOff: () => void;
}

const ModalHeader = ({ title, onModalOff }: ModalHeaderProps) => {
    return (
        <StyledModalHeader>
            <div></div>
            <h1>{title}</h1>
            <button onClick={onModalOff}>
                <svg
                    aria-label="닫기"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 48 48"
                    width="24"
                >
                    <path
                        clipRule="evenodd"
                        d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z"
                        fillRule="evenodd"
                    ></path>
                </svg>
            </button>
        </StyledModalHeader>
    );
};

export default ModalHeader;

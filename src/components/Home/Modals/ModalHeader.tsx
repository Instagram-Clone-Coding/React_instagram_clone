import styled from "styled-components";
import CloseSVG from "assets/Svgs/CloseSVG";

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
                <CloseSVG color={"#262626"} size={"18"}/>
            </button>
        </StyledModalHeader>
    );
};

export default ModalHeader;

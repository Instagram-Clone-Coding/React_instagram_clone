import Button from "styles/UI/Button/Button";
import styled from "styled-components";

const SubmitButton = styled(Button)`
    margin: 8px 40px;
    opacity: 1;
    border: 1px solid transparent;
    &:disabled {
        opacity: 0.3;
        pointer-events: none;
    }
`;

export default SubmitButton;

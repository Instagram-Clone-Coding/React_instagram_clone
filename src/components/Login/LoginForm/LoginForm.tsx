import styled from "styled-components";
import Forms from "./Forms";
import Suggest from "../../common/Suggest";
import ContentBox from "components/common/ContentBox";
import Appdownload from "components/common/AppDownload";
import { NewCardProps } from "../types";

export function LoginForm() {
    return (
        <FormContainer>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Forms />
            </ContentBox>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Suggest />
            </ContentBox>
            <Appdownload />
        </FormContainer>
    );
}

// Props
const Props: NewCardProps = {
    padding: `10px 0`,
    margin: `0 0 10px`,
};

// style
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 12px;
    max-width: 350px;
    flex-grow: 1;
`;

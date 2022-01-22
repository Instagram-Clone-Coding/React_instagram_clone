import styled from "styled-components";
import Forms from "./Forms";
import Suggest from "../../Common/Suggest";
import ContentBox from "components/Common/ContentBox";
import Appdownload from "components/Common/AppDownload";

export function LoginForm() {
    return (
        <FormContainer>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Forms />
            </ContentBox>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Suggest currentRouter="signin" />
            </ContentBox>
            <Appdownload />
        </FormContainer>
    );
}

// Props
const Props: Login.NewCardProps = {
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

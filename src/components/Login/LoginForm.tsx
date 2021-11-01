import styled, { css } from "styled-components";
import Card from "UI/Card/Card";
import { Forms } from "./Forms";
import { Suggest } from "./Suggest";

export function LoginForm() {
    return (
        <FormContainer>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Forms />
            </ContentBox>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Suggest />
            </ContentBox>
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

interface NewCardProps {
    padding: string;
    margin: string;
}

const ContentBox = styled(Card)<NewCardProps>`
    display: flex;
    justify-content: center;
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border-radius: 1px;
`;

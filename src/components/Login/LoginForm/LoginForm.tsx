import styled from "styled-components";
import { Forms } from "./Forms";
import { Suggest } from "../../common/Suggest";
import apple from "images/Login/appStore.png";
import android from "images/Login/googlePlay.png";
import { NewCardProps } from "../types";
import ContentBox from "components/common/ContentBox";

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

// component
function Appdownload() {
    const app = [apple, android];
    return (
        <DownloadStyle>
            <p>앱을 다운로드하세요.</p>
            <div>
                {app.map((url) => {
                    return <img src={url} alt="앱 다운로드받는 곳" />;
                })}
            </div>
        </DownloadStyle>
    );
}

// style
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 12px;
    max-width: 350px;
    flex-grow: 1;
`;

const DownloadStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 20px;
    & > div {
        flex-direction: row;
        margin: 10px 0;
        & > img {
            height: 40px;
        }
    }
`;

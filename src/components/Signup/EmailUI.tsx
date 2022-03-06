import styled from "styled-components";
import { useAppSelector } from "app/store/Hooks";
import emailLogo from "assets/Images/emailLogo.png";
import EmailFooter from "components/Signup/EmailFooter";

const Container = styled.div`
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana,
        arial, sans-serif;
    padding-left: 62px;

    .info-box {
        padding-top: 21px;
        padding-bottom: 52px;
        width: 420px;
    }

    header {
        display: flex;
        justify-content: flex-start;
        padding-bottom: 15px;
        img {
            height: 33px;
        }
    }

    .message {
        width: 420px;
        p {
            margin: 10px 0px;
            color: rgb(86, 90, 92) !important;
            font-size: 18px;
        }
    }

    .code {
        padding: 10px;
        color: #565a5c;
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        padding-bottom: 25px;
    }
`;

export default function EmailUI() {
    const userEmail =
        useAppSelector((state) => state.auth.signUpUserData?.email) ||
        "hansuhwa2005@gmail.com"; // default값, 수정해야함 **

    return (
        <Container>
            <div className="info-box">
                <header>
                    <img src={emailLogo} alt="instagram_logo" />
                </header>
                <main className="message">
                    <p>Hi,</p>
                    <p>
                        Someone tried to sign up for an Instagram account with{" "}
                        {userEmail}. If it was you, enter this confirmation code
                        in the app:
                    </p>
                    <div className="code">
                        {/* 인증코드 넣는 곳(임시값 넣어둠) */}132560
                    </div>
                </main>
                <EmailFooter
                    sentence={[`This message was sent to ${userEmail}`]}
                />
            </div>
        </Container>
    );
}

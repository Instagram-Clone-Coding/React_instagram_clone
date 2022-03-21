import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ContentBox from "components/Common/ContentBox";
import styled from "styled-components";
import Button from "styles/UI/Button";
import { authAction } from "app/store/ducks/auth/authSlice";
import { useEffect } from "react";

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 92%;

    main {
        max-width: 360px;
        text-align: center;
        margin: 60px auto 0;

        h4 {
            margin: 32px 40px 18px 40px;
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
        }

        .description {
            margin: -3px 40px 20px 40px;
            font-size: 14px;
            line-height: 18px;
            font-weight: 400;
            color: ${(props) => props.theme.font.gray};
            .user-email {
                font-weight: 600;
                color: black;
            }
        }

        .confirm-button {
            margin: 0 40px 32px 40px;
            button {
                padding: 0;
            }
        }
    }
`;

const getProcessedUserEmail = (userEmail: string): string => {
    let [userData, emailAddress] = userEmail.split("@");

    userData =
        userData[0] +
        "*".repeat(userData.length - 2) +
        userData[userData.length - 1];
    emailAddress = emailAddress.replace(/\w*(?=\.)/, (target) =>
        "*".repeat(target.length),
    );
    return userData + "@" + emailAddress;
};

export default function InformSentEmail() {
    const userEmail = useAppSelector((state) => state.auth.resetPassword.email);
    const processedUserEmail = userEmail && getProcessedUserEmail(userEmail);
    const dispatch = useAppDispatch();

    const returnResetPasswordHandler = () => {
        dispatch(authAction.resetUserEmail());
    };

    useEffect(() => {
        return () => {
            returnResetPasswordHandler();
        };
    });

    return (
        <Container>
            <main>
                <ContentBox margin="" padding="">
                    <h4>이메일 전송됨</h4>
                    <div className="description">
                        계정에 다시 로그인할 수 있는 링크가 포함된 이메일을{" "}
                        <span className="user-email">{processedUserEmail}</span>{" "}
                        주소로 보내드렸습니다.
                    </div>
                    <div className="confirm-button">
                        <Button
                            bgColor="#ffffff"
                            color="#0095F6"
                            onClick={returnResetPasswordHandler}
                        >
                            확인
                        </Button>
                    </div>
                </ContentBox>
            </main>
        </Container>
    );
}

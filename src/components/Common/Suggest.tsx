import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Suggest() {
    const { pathname } = useLocation();
    const [stateKey, setStateKey] = useState("");
    const [stateLink, setStateLink] = useState("");

    useEffect(() => {
        for (let key of Object.keys(MessageState)) {
            if (pathname.includes(key) && stateKey !== undefined) {
                setStateKey(key);
            } else {
                setStateLink(key);
            }
        }
    }, [pathname, stateKey]);

    const [question, suggest] = stateKey && MessageState[stateKey];

    return (
        <SentenceContainer>
            <p>
                {question}
                <Link to={`/accounts/${stateLink}`}>{suggest}</Link>
            </p>
        </SentenceContainer>
    );
}

type MessageStateType = {
    emailsignup: string[];
    signin: string[];
    [stateKey: string]: string[];
};

const MessageState: MessageStateType = {
    signin: ["계정이 없으신가요? ", "가입하기"],
    emailsignup: ["계정이 있으신가요? ", "로그인"],
};

const SentenceContainer = styled.div`
    font-size: 14px;
    line-height: 18px;
    margin: -3px 0 -4px;
    p {
        margin: 15px;
        a {
            text-decoration: none;
            font-weight: 600;
            color: ${(props) => props.theme.color.blue};
        }
    }
`;

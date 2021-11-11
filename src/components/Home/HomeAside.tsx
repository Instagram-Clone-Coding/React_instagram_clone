import StoryCircle from "components/Common/StoryCircle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Username from "./Username";

interface RightMarginProp {
    rightMargin: number;
}

const StyledAside = styled.aside<RightMarginProp>`
    max-width: 293px;
    width: 100%;
    height: 56px;
    margin-bottom: 10px;
    margin-top: 18px;
    @media (max-width: 1000px) {
        display: none;
    }
    display: flex;
    align-items: center;

    position: fixed;
    right: ${(props) => props.rightMargin + "px"};
    top: 88px; // header 추가하면 똑같음
    .aside-imgLink {
        width: 56px;
        height: 56px;
        margin-right: 12px;
        & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .aside-userInfo {
        flex: 1;
        & > * {
            margin-left: 12px;
        }
        .aside-username {
            text-decoration: none;
        }
        .aside-realName {
            margin-top: 1px;
            color: ${(props) => props.theme.font.gray};
        }
    }
    button {
        color: ${(props) => props.theme.color.blue};
        font-size: 12px;
    }
`;
const DUMMY_USER = {
    img: "sdfsdf",
    username: "yeongyinkim",
    name: "김영인",
    src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
};

const HOME_CONTENT_WIDTH = 935;

const HomeAside = () => {
    const [rightMargin, setRightMargin] = useState(
        (window.innerWidth - HOME_CONTENT_WIDTH) / 2
    );

    useEffect(() => {
        const resizeHandler = () => {
            setRightMargin((window.innerWidth - HOME_CONTENT_WIDTH) / 2);
        };
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <StyledAside rightMargin={rightMargin}>
            <Link to={`/${DUMMY_USER.username}`} className="aside-imgLink">
                {/* <img src={DUMMY_USER.src} alt={DUMMY_USER.username} /> */}
                <StoryCircle
                    type="default"
                    src={DUMMY_USER.src}
                    username={DUMMY_USER.username}
                    scale={1}
                />
            </Link>
            <div className="aside-userInfo">
                <Username
                    // href={`/${DUMMY_USER.username}`}
                    className="aside-username"
                >
                    {DUMMY_USER.username}
                </Username>
                <div className="aside-realName">김영인</div>
            </div>
            <button>전환</button>
        </StyledAside>
    );
};

export default HomeAside;

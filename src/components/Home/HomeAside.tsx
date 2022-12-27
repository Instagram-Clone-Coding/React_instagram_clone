import { useAppSelector } from "app/store/Hooks";
import StoryCircle from "components/Common/StoryCircle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Username from "../Common/Username";

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
        .aside-username > a {
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

const HOME_CONTENT_WIDTH = 935;

const HomeAside = () => {
    const [rightMargin, setRightMargin] = useState(
        (window.innerWidth - HOME_CONTENT_WIDTH) / 2,
    );
    const userInfo = useAppSelector(({ auth }) => auth.userInfo);

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
            {userInfo && (
                <>
                    <Link
                        to={`/profile/${userInfo.memberUsername}`}
                        className="aside-imgLink"
                    >
                        <StoryCircle
                            type="default"
                            avatarUrl={userInfo.memberImageUrl}
                            username={userInfo.memberUsername}
                            scale={1}
                        />
                    </Link>
                    <div className="aside-userInfo">
                        <Username className="aside-username">
                            <Link to={`/profile/${userInfo.memberUsername}`}>
                                {userInfo.memberUsername}
                            </Link>
                        </Username>
                        <div className="aside-realName">
                            {userInfo.memberName}
                        </div>
                    </div>
                    {/* <button>전환</button> */}
                </>
            )}
        </StyledAside>
    );
};

export default HomeAside;

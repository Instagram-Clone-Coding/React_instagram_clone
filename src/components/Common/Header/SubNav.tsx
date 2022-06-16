import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "app/store/Hooks";
import { logout } from "app/store/ducks/auth/authThunk";
import { ReactComponent as Profile } from "assets/Svgs/header-nav-bar/profile.svg";
import { ReactComponent as Store } from "assets/Svgs/header-nav-bar/store.svg";
import { ReactComponent as Setting } from "assets/Svgs/header-nav-bar/setting.svg";
import { ReactComponent as Change } from "assets/Svgs/header-nav-bar/change.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
    .pointer {
        background: #fff;
        border: 1px solid #fff;
        box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
        height: 14px;
        transform: rotate(45deg);
        width: 14px;
        position: relative;
        top: 5px;
        left: 5px;
    }

    span {
        font-size: 14px;
        line-height: 18px;
        font-weight: 400;
    }

    hr {
        border: 0;
        height: 1px;
        margin: 0;
        width: 100%;
        background-color: ${(props) => props.theme.color.bd_gray};
    }

    a {
        text-decoration: none;
    }

    .settings {
        display: flex;
        flex-direction: column;
        width: 14.375rem;
        z-index: 200;
        position: relative;
        right: 130px;
        top: -3px;
        box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);

        .option {
            display: flex;
            padding: 0.5rem 1rem;
            background-color: white;
            cursor: pointer;

            :hover {
                background-color: ${(props) => props.theme.color.bg_gray};
            }

            .svg {
                margin-right: 12px;
            }
        }
    }
`;

export default function SubNav({
    username,
    containerRef,
}: {
    username?: string;
    containerRef: React.RefObject<HTMLDivElement>;
}) {
    const dispatch = useAppDispatch();

    const logoutClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(logout());
    };

    return (
        <Container>
            <div className="pointer"></div>
            <div className="settings" ref={containerRef}>
                <Link to={`/profile/${username}`}>
                    <div className="option">
                        <div className="svg">
                            <Profile />
                        </div>
                        <span>프로필</span>
                    </div>
                </Link>
                <div className="option">
                    <div className="svg">
                        <Store />
                    </div>
                    <span>저장됨</span>
                </div>
                <Link to={`account/edit`}>
                    <div className="option">
                        <div className="svg">
                            <Setting />
                        </div>
                        <span>설정</span>
                    </div>
                </Link>
                <div className="option">
                    <div className="svg">
                        <Change />
                    </div>
                    <span>계정전환</span>
                </div>
                <hr />
                <span className="option" onClick={logoutClickHandler}>
                    로그아웃
                </span>
            </div>
        </Container>
    );
}

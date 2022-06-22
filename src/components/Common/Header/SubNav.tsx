import React, { Component } from "react";
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

type optionType = {
    linkTo?: string;
    text: string;
    svg: JSX.Element;
}; // 여기에만 쓰면, 컴포넌트에 타입 선언?

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

    const optionData: optionType[] = [
        { linkTo: `/profile/${username}`, text: `프로필`, svg: <Profile /> },
        { text: `저장됨`, svg: <Store /> },
        { linkTo: `/accounts/edit`, text: `설정`, svg: <Setting /> },
        { text: `계정전환`, svg: <Change /> },
    ]; // unique key 만드는 함수, utils에 만들어놓고 이용하는거 어때요? -> 어떤식으로 만들까요?

    return (
        <Container>
            <div className="pointer"></div>
            <div className="settings" ref={containerRef}>
                {optionData.map(({ linkTo, text, svg }) => {
                    return (
                        <>
                            {linkTo ? (
                                <Link to={linkTo}>
                                    <div className="option">
                                        <div className="svg">{svg}</div>
                                        <span>{text}</span>
                                    </div>
                                </Link>
                            ) : (
                                <div className="option">
                                    <div className="svg">{svg}</div>
                                    <span>{text}</span>
                                </div>
                            )}
                        </>
                    );
                })}
                <hr />
                <span className="option" onClick={logoutClickHandler}>
                    로그아웃
                </span>
            </div>
        </Container>
    );
}

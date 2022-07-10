import styled from "styled-components";
import { ReactComponent as Home } from "assets/Svgs/home.svg";
import { ReactComponent as HomeActive } from "assets/Svgs/home-active.svg";

import { ReactComponent as Direct } from "assets/Svgs/direct.svg";
import { ReactComponent as DirectActive } from "assets/Svgs/direct-active.svg";

import { ReactComponent as NewArticle } from "assets/Svgs/new-article.svg";
import { ReactComponent as NewArticleActive } from "assets/Svgs/new-article-active.svg";

import { ReactComponent as Map } from "assets/Svgs/map.svg";
import { ReactComponent as MapActive } from "assets/Svgs/map-active.svg";

import { ReactComponent as Heart } from "assets/Svgs/heart.svg";
import { ReactComponent as HeartActive } from "assets/Svgs/heart-active.svg";

import { NavLink, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { selectView } from "app/store/ducks/direct/DirectSlice";
import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import Upload from "components/Common/Header/Upload";
import SubNav from "./SubNav";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";

const Container = styled.div`
    flex: 1 0 0%;
    display: flex;
    justify-content: flex-end;
`;

const NavLitemContainer = styled.div`
    display: flex;
    padding-left: 24px;
`;

const NavItemWrapper = styled.div`
    display: inline-flex;
    align-items: center;

    & + & {
        margin-left: 22px;
    }
    & > div {
        cursor: pointer;
    }
`;

const AvatarWrapper = styled(NavItemWrapper)<{ isSubnavModalOn: boolean }>`
    .profile {
        cursor: pointer;
    }

    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border: ${(props) =>
            props.isSubnavModalOn ? `1px solid #262626` : `none`};
        border-radius: 50%;

        img {
            border-radius: 50%;
            width: 24px;
            height: 24px;
        }
    }
`;

const NavItems = () => {
    const [isSubnavModalOn, setIsSubnavMoalOn] = useState(false);
    const dispatch = useAppDispatch();
    const isUploading = useAppSelector(({ upload }) => upload.isUploading);
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    const navContainerRef = useRef<HTMLDivElement | null>(null);
    const subModalControllerRef = useRef<HTMLDivElement | null>(null);
    useOutsideClick(navContainerRef, setIsSubnavMoalOn, subModalControllerRef);

    const navItems = [
        {
            id: "홈",
            path: "/",
            component: <Home />,
            activeComponent: <HomeActive />,
        },
        {
            id: "메세지",
            path: "/direct",
            component: (
                <Direct
                    onClick={() => {
                        dispatch(selectView("inbox"));
                    }}
                />
            ),
            activeComponent: (
                <DirectActive
                    onClick={() => {
                        dispatch(selectView("inbox"));
                    }}
                />
            ),
        },
        {
            id: "새 글 작성",
            path: "/",
            component: (
                <NewArticle
                    onClick={() => dispatch(uploadActions.startUpload())}
                />
            ),
            activeComponent: (
                <NewArticleActive
                    onClick={() => dispatch(uploadActions.startUpload())}
                />
            ),
        },
        // {
        //     id: "사람 찾기",
        //     path: "/",
        //     component: <Map />,
        //     activeComponent: <MapActive />,
        // },
        {
            id: "피드 활동",
            path: "/",
            component: <Heart />,
            activeComponent: <HeartActive />,
        },
    ];

    return (
        <Container>
            <NavLitemContainer>
                {isUploading && <Upload />}
                {navItems.map((navItem) => (
                    <NavItemWrapper key={navItem.id}>
                        {navItem.id === "새 글 작성" ? (
                            <div>
                                {isUploading
                                    ? navItem.activeComponent
                                    : navItem.component}
                            </div>
                        ) : (
                            <NavLink to={navItem.path}>
                                {navItem.component}
                            </NavLink>
                        )}
                    </NavItemWrapper>
                ))}

                <AvatarWrapper isSubnavModalOn={isSubnavModalOn}>
                    <div
                        ref={subModalControllerRef}
                        onClick={() => {
                            setIsSubnavMoalOn(!isSubnavModalOn);
                        }}
                        className="profile"
                    >
                        <div className="img-container">
                            <img
                                alt="minsoo_web님의 프로필 사진"
                                data-testid="user-avatar"
                                draggable="false"
                                src={userInfo?.memberImageUrl}
                            />
                        </div>
                        {isSubnavModalOn && (
                            <SubNav
                                username={userInfo?.memberUsername}
                                containerRef={navContainerRef}
                            />
                        )}
                    </div>
                </AvatarWrapper>
            </NavLitemContainer>
        </Container>
    );
};

export default NavItems;

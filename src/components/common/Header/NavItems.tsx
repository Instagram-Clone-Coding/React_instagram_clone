import styled from "styled-components";
import { ReactComponent as Home } from "assets/svgs/home.svg";
import { ReactComponent as Direct } from "assets/svgs/direct.svg";
import { ReactComponent as NewArticle } from "assets/svgs/new-article.svg";
import { ReactComponent as Map } from "assets/svgs/map.svg";
import { ReactComponent as Heart } from "assets/svgs/heart.svg";

import { Link } from "react-router-dom";

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
`;

const AvatarWrapper = styled(NavItemWrapper)`
    & > img {
        border-radius: 50%;
    }
`;

const navItems = [
    {
        id: "홈",
        path: "/",
        component: <Home />,
    },
    {
        id: "메세지",
        path: "/direct",
        component: <Direct />,
    },
    {
        id: "새 글 작성",
        path: "/",
        component: <NewArticle />,
    },
    {
        id: "사람 찾기",
        path: "/",
        component: <Map />,
    },
    {
        id: "피드 활동",
        path: "/",
        component: <Heart />,
    },
];

const NavItems = () => {
    return (
        <Container>
            <NavLitemContainer>
                {navItems.map((navItem) => (
                    <NavItemWrapper key={navItem.id}>
                        <Link to={navItem.path}>{navItem.component}</Link>
                    </NavItemWrapper>
                ))}

                <AvatarWrapper>
                    <img
                        alt="minsoo_web님의 프로필 사진"
                        data-testid="user-avatar"
                        draggable="false"
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=22"
                    />
                </AvatarWrapper>
            </NavLitemContainer>
        </Container>
    );
};

export default NavItems;

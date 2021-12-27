import styled from "styled-components";
import { ReactComponent as ArrowUp } from "assets/Svgs/arrow-up.svg";
import { ReactComponent as DmWrite } from "assets/Svgs/dm-write.svg";
import theme from "styles/theme";
import { NavLink } from "react-router-dom";

const Container = styled.header``;

const HeaderTop = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px solid ${theme.color.bd_gray};
`;

const NickWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;

    & > p {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba(var(--i1d, 38, 38, 38), 1);
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
    }
`;

const Rotate = styled.span`
    display: inline-block;
    transform: rotate(180deg);
    padding: 8px;
`;

const HeaderTab = styled.div`
    display: flex;
    & > nav {
        display: flex;
        width: 60%;
    }
`;

const TabLink = styled(NavLink)`
    flex: 1;

    display: inline-block;
    padding: 12px 0;

    font-weight: 600;
    text-align: center;
    text-decoration: none;
    opacity: 1;
    z-index: 1;
    color: ${theme.color.bd_gray};

    border-bottom: 1px solid ${theme.color.bd_gray};

    &.active {
        color: rgba(var(--i1d, 38, 38, 38), 1);
        border-color: rgba(var(--i1d, 38, 38, 38), 1);
    }
`;

const BlankLink = styled.div`
    flex: 1;
    border-bottom: 1px solid ${theme.color.bd_gray};
`;

const AsideHeader = () => {
    return (
        <Container>
            <HeaderTop>
                <NickWrapper>
                    <p>minsoo_web</p>
                    <Rotate>
                        <ArrowUp />
                    </Rotate>
                </NickWrapper>
                <DmWrite />
            </HeaderTop>

            {/*  */}
            <HeaderTab>
                <nav>
                    <TabLink exact to="/direct">
                        주요
                    </TabLink>
                    <TabLink exact to="/direct/general">
                        일반
                    </TabLink>
                </nav>
                <BlankLink />
            </HeaderTab>
        </Container>
    );
};

export default AsideHeader;

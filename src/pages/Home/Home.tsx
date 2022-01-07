import styled from "styled-components";
import HomeAside from "components/Home/HomeAside";
import HomeStories from "components/Home/HomeStories";
import HomeSection from "components/Home/HomeSection";
import Notification from "styles/UI/Notification";
import { useAppSelector } from "app/store/hooks";

const Layout = styled.div`
    padding-top: 30px;
    width: 100%;
    max-width: 935px;
    margin: 0 auto;
    display: flex;
    main {
        width: 100%;
        max-width: 614px;
        margin-right: 28px;
        display: flex;
        flex-direction: column;
    }
    @media (max-width: 1000px) {
        max-width: 600px;

        main {
            margin-right: 0;
        }
    }
`;

const Home = () => {
    const isCopiedNotification = useAppSelector(
        (state) => state.home.isCopiedNotification,
    );

    return (
        <Layout>
            <main>
                <HomeStories />
                <HomeSection />
            </main>
            <HomeAside />
            {isCopiedNotification && (
                <Notification text="링크를 클립보드에 복사했습니다." />
            )}
        </Layout>
    );
};

export default Home;

import styled from "styled-components";
import HomeAside from "./components/HomeAside";
import HomeStories from "./components/HomeStories";
import HomeSection from "./components/HomeSection";

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
    return (
        <Layout>
            <main>
                <HomeStories />
                <HomeSection />
            </main>
            <HomeAside />
        </Layout>
    );
};

export default Home;

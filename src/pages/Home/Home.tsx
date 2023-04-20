import styled from "styled-components";
import HomeAside from "components/Home/HomeAside";
import HomeStories from "components/Home/HomeStories";
import HomeSection from "components/Home/HomeSection";
import { useEffect } from "react";
import { useAppDispatch } from "app/store/Hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";

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
    const dispatch = useAppDispatch();
    useEffect(() => {
        return () => {
            dispatch(modalActions.resetModal());
        };
    }, [dispatch]);

    return (
        <Layout>
            <main>
                {/* <HomeStories /> */}
                <HomeSection />
            </main>
            <HomeAside />
        </Layout>
    );
};

export default Home;

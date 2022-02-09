import styled from "styled-components";
import HomeAside from "components/Home/HomeAside";
import HomeStories from "components/Home/HomeStories";
import HomeSection from "components/Home/HomeSection";
import Notification from "styles/UI/Notification";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import HoverModal from "components/Home/Modals/HoverModal";
import FollowingModal from "components/Home/Modals/FollowingModal";
import ArticleMenuModal from "components/Home/Modals/ArticleMenuModal";
import ReportModal from "components/Home/Modals/ReportModal";
import ShareWithModal from "components/Home/Modals/SharerWithModal";
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
    const {
        home: { isCopiedNotification },
        modal: { activatedModal, memberNickname, postId, miniProfile },
    } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    const hoverModalMouseEnterHandler = () => {
        dispatch(modalActions.mouseOnHoverModal());
    };
    const hoverModalMouseLeaveHandler = () => {
        dispatch(modalActions.mouseNotOnHoverModal());
        setTimeout(() => dispatch(modalActions.checkMouseOnHoverModal()), 500);
    };

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
            {miniProfile && (
                <HoverModal
                    onMouseEnter={hoverModalMouseEnterHandler}
                    onMouseLeave={hoverModalMouseLeaveHandler}
                    miniProfile={miniProfile}
                />
            )}
            {activatedModal === "unfollowing" && (
                <FollowingModal
                    onModalOn={() => {
                        dispatch(modalActions.maintainModalon("unfollowing"));
                    }}
                    onModalOff={() =>
                        dispatch(modalActions.changeActivatedModal(null))
                    }
                />
            )}
            {activatedModal === "articleMenu" && memberNickname && postId && (
                <ArticleMenuModal
                    onModalOn={() =>
                        dispatch(modalActions.maintainModalon("articleMenu"))
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                />
            )}
            {/* 아래 두 모달은 이전 모달을 거쳐야 하므로 필요없는 data는 action에 담지 않음 */}
            {activatedModal === "report" && (
                <ReportModal
                    onModalOn={() =>
                        dispatch(modalActions.maintainModalon("report"))
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                />
            )}
            {activatedModal === "shareWith" && (
                <ShareWithModal
                    onModalOn={() =>
                        dispatch(modalActions.maintainModalon("shareWith"))
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                />
            )}
        </Layout>
    );
};

export default Home;

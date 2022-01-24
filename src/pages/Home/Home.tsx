import styled from "styled-components";
import HomeAside from "components/Home/HomeAside";
import HomeStories from "components/Home/HomeStories";
import HomeSection from "components/Home/HomeSection";
import Notification from "styles/UI/Notification";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
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
        modal: {
            activatedModal,
            modalPosition,
            memberNickname,
            memberImageUrl,
            postId,
        },
    } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    // const mouseEnterHandler = (
    //     event:
    //         | React.MouseEvent<HTMLSpanElement>
    //         | React.MouseEvent<HTMLDivElement>,
    // ) => {
    //     setModalPositionObj(event?.currentTarget.getBoundingClientRect());
    //     setIsHoverModalActivated(true);
    // };

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
            {activatedModal === "hover" && (
                <HoverModal
                    // isFollowing={isFollowing}
                    // onFollowChange={(a: boolean) => setIsFollowing(a)}
                    // username={memberNickname}
                    // modalPosition={modalPositionObj}
                    onMouseEnter={() =>
                        dispatch(
                            modalActions.startModal({
                                activatedModal: "hover",
                                memberNickname,
                                modalPosition,
                            }),
                        )
                    }
                    onMouseLeave={() => dispatch(modalActions.resetModal())}
                    onFollowingModalOn={() =>
                        dispatch(
                            modalActions.startModal({
                                activatedModal: "unfollowing",
                                memberImageUrl,
                            }),
                        )
                    }
                />
            )}
            {activatedModal === "unfollowing" &&
                memberNickname &&
                memberImageUrl && (
                    <FollowingModal
                        // onUnfollow={() => setIsFollowing(false)}
                        onModalOn={() =>
                            dispatch(
                                modalActions.startModal({
                                    activatedModal: "unfollowing",
                                    memberNickname,
                                    memberImageUrl,
                                }),
                            )
                        }
                        onModalOff={() => dispatch(modalActions.resetModal())}
                        username={memberNickname}
                        avatarUrl={memberImageUrl}
                    />
                )}
            {activatedModal === "articleMenu" && memberNickname && postId && (
                <ArticleMenuModal
                    // isFollowing={isFollowing} 팔로우한 사람의 게시물만 보니까 당연히 처음엔 true
                    // onUnfollow={unfollowHandler}
                    onModalOn={() =>
                        dispatch(
                            modalActions.startModal({
                                activatedModal: "articleMenu",
                                memberNickname,
                                postId,
                            }),
                        )
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                />
            )}
            {/* 아래 두 모달은 이전 모달을 거쳐야 하므로 필요없는 data는 action에 담지 않음 */}
            {activatedModal === "report" && (
                <ReportModal
                    onModalOn={() =>
                        dispatch(
                            modalActions.startModal({
                                activatedModal: "report",
                            }),
                        )
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                />
            )}
            {activatedModal === "shareWith" && (
                <ShareWithModal
                    onModalOn={() =>
                        dispatch(
                            modalActions.startModal({
                                activatedModal: "shareWith",
                            }),
                        )
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                />
            )}
        </Layout>
    );
};

export default Home;

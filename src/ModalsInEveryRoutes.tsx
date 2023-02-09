import React from "react";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import Notification from "styles/UI/Notification";
import HoverModal from "components/Home/Modals/HoverModal";
import FollowingModal from "components/Home/Modals/FollowingModal";
import ArticleMenuModal from "components/Home/Modals/ArticleMenuModal";
import ReportModal from "components/Home/Modals/ReportModal";
import ShareWithModal from "components/Home/Modals/SharerWithModal";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ArticleAloneModal from "components/Common/Article/ArticleAlone/ArticleAloneModal";

const ModalsInEveryRoutes = () => {
    const {
        home: { isCopiedNotification },
        modal: {
            activatedModal,
            memberNickname,
            postId,
            miniProfile,
            memberImageUrl,
            isArticleAloneModalOn,
        },
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
        <>
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
                    memberImageUrl={memberImageUrl}
                    memberNickname={memberNickname}
                />
            )}
            {activatedModal === "articleMenu" && memberNickname && postId && (
                <ArticleMenuModal
                    onModalOn={() =>
                        dispatch(modalActions.maintainModalon("articleMenu"))
                    }
                    onModalOff={() => dispatch(modalActions.resetModal())}
                    postId={postId}
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
            {isArticleAloneModalOn && (
                <ArticleAloneModal
                    onModalOn={() =>
                        dispatch(modalActions.maintainArticleAloneModal())
                    }
                    onModalOff={() =>
                        dispatch(modalActions.stopArticleAloneModal())
                    }
                />
            )}
        </>
    );
};

export default ModalsInEveryRoutes;

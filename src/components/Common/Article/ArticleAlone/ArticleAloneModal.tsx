import { modalActions } from "app/store/ducks/modal/modalSlice";
import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ArticleAlone from "components/Common/Article/ArticleAlone/ArticleAlone";
import Loading from "components/Common/Loading";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useState } from "react";
import ModalCard from "styles/UI/ModalCard";

interface ArticleAloneModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

interface OnlyArticleDataType {
    data: PostType.ArticleProps;
}

const ArticleAloneModal = ({
    onModalOn,
    onModalOff,
}: ArticleAloneModalProps) => {
    const [isDataFetching, setIsDataFetching] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const postId = useAppSelector(
        (state) => state.modal.articleAloneModalPostId,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getArticleData = async () => {
            try {
                const {
                    data: { data },
                } = await authorizedCustomAxios.get<OnlyArticleDataType>(
                    `/posts/${postId}`,
                );
                dispatch(paragraphActions.setArticle(data));
                setIsDataFetching(false);
            } catch (error) {
                dispatch(modalActions.stopArticleAloneModal());
            }
        };
        getArticleData();
        const resizeEventHandler = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", resizeEventHandler);

        return () => {
            window.removeEventListener("resize", resizeEventHandler);
        };
    }, [dispatch, postId]);

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
            isWithCancelBtn={true}
            isArticle={true}
            width={windowWidth - 128}
        >
            {isDataFetching ? (
                <Loading size={14} />
            ) : (
                <ArticleAlone isModal={true} />
            )}
        </ModalCard>
    );
};

export default ArticleAloneModal;

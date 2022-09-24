import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ArticleAlone from "components/Common/Article/ArticleAlone";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useHistory } from "react-router";
interface ArticleProps {
    data: PostType.ArticleProps;
}

const Paragraph = () => {
    const isDataFetching = useAppSelector(
        (state) => state.paragraph.isDataFetching,
    );
    const dispatch = useAppDispatch();
    const { postId: postIdStr } = useParams<{ postId: string }>();
    const history = useHistory();
    const postId = useMemo(() => +postIdStr, [postIdStr]);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const {
                    data: { data },
                    status,
                } = await authorizedCustomAxios.get<ArticleProps>(
                    `/posts/${postId}`,
                );
                console.log("게시글 데이터", data);
                if (status !== 200) history.goBack(); // 에러 발생 시 뒤로 이동
                dispatch(paragraphActions.setArticle(data));
            } catch (error) {
                console.log(error);
            }
        };
        getArticle();
    }, [postId, dispatch, history]);
    return <div>{isDataFetching || <ArticleAlone />}</div>;
};

export default Paragraph;

import OnlyArticlePage from "components/Common/Article/OnlyArticlePage";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
interface ArticleProps {
    data: HomeType.ArticleProps;
    status: number;
}

const Paragraph = () => {
    const { postId: postIdStr } = useParams<{ postId: string }>();
    const [isFetching, setIsFetching] = useState(true);
    const postId = useMemo(() => +postIdStr, [postIdStr]);
    useEffect(() => {
        const getArticle = async () => {
            try {
                const {
                    data: { data, status },
                } = await authorizedCustomAxios.get<ArticleProps>(
                    `/posts/${postId}`,
                );
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };
        getArticle();
    }, [postId]);
    return <div>{isFetching || <OnlyArticlePage />}</div>;
};

export default Paragraph;

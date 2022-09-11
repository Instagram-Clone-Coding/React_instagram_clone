import OnlyArticlePage from "components/Common/Article/OnlyArticlePage";
import React, { useMemo } from "react";
import { useParams } from "react-router";

const Paragraph = () => {
    const { postId: postIdStr } = useParams<{ postId: string }>();
    const postId = useMemo(() => +postIdStr, [postIdStr]);

    return (
        <div>
            <OnlyArticlePage />
        </div>
    );
};

export default Paragraph;

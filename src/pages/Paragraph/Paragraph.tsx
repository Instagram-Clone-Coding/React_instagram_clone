import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ArticleAlone from "components/Common/Article/ArticleAlone/ArticleAlone";
import { authorizedCustomAxios } from "customAxios";
import { useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

const StyledParagraph = styled.main`
    padding: calc(4vh) 20px 0;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    max-width: 975px;
    margin: 0 auto;
    margin-bottom: 16px;
    & > .paragraph__articleLayout {
        width: calc(100% - 40px);
        max-width: 815px;
        margin: 0 auto;
        & > .paragraph__bottomBorder {
            margin-top: 48px;
            border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};
        }
    }
`;
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
                if (status !== 200) history.goBack(); // 에러 발생 시 뒤로 이동
                dispatch(paragraphActions.setArticle(data));
            } catch (error) {
                history.goBack();
            }
        };
        getArticle();
    }, [postId, dispatch, history]);
    return (
        <StyledParagraph>
            {isDataFetching || (
                <>
                    <div className="paragraph__articleLayout">
                        <ArticleAlone />
                        <div className="paragraph__bottomBorder"></div>
                    </div>
                </>
            )}
        </StyledParagraph>
    );
};

export default Paragraph;

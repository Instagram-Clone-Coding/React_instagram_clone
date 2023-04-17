import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import ArticleAlone from "components/Common/Article/ArticleAlone/ArticleAlone";
import SingleRow from "components/Profile/Article/SingleRow";
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
        & > .paragraph__username {
            padding-top: calc(6vh);
            margin-bottom: 20px;
            & > span {
                color: ${(props) => props.theme.font.gray};
            }
        }
    }
    @media (max-width: 735px) {
        padding: calc(4vh) 0 0;
        width: 100%;
        max-width: none;
        & > .paragraph__articleLayout {
            width: 100%;
            max-width: none;
            margin: 0;
        }
    }
`;
interface OnlyArticleDataType {
    data: PostType.ArticleProps;
}

interface RecentArticleDataType {
    data: Profile.PostType[];
}

const Paragraph = () => {
    const {
        isDataFetching,
        recentPosts,
        articleObj: {
            member: { username },
        },
    } = useAppSelector((state) => state.paragraph);
    const dispatch = useAppDispatch();
    const { postId: postIdStr } = useParams<{ postId: string }>();
    const history = useHistory();
    const postId = useMemo(() => +postIdStr, [postIdStr]);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const {
                    data: { data: onlyArticleData },
                    status: onlyArticleStatus,
                } = await authorizedCustomAxios.get<OnlyArticleDataType>(
                    `/posts/${postId}`,
                );
                const {
                    data: { data: recentArticle },
                    status: recentArticleStatus,
                } = await authorizedCustomAxios.get<RecentArticleDataType>(
                    `accounts/${onlyArticleData.member.username}/posts/recent/post`,
                );
                if (onlyArticleStatus !== 200 || recentArticleStatus !== 200)
                    history.goBack(); // 에러 발생 시 뒤로 이동
                dispatch(paragraphActions.setArticle(onlyArticleData));
                dispatch(
                    paragraphActions.setRecentPosts(
                        recentArticle.filter((post) => post.postId !== postId),
                    ),
                );
            } catch (error) {
                history.goBack();
            }
        };
        getArticle();
        return () => {
            dispatch(paragraphActions.resetParagraph());
        };
    }, [postId, dispatch, history]);
    return (
        <StyledParagraph>
            {isDataFetching || (
                <>
                    <div className="paragraph__articleLayout">
                        <ArticleAlone />
                        {recentPosts.length > 0 && username !== "" && (
                            <>
                                <div className="paragraph__bottomBorder"></div>
                                {username && (
                                    <div className="paragraph__username">
                                        {username}
                                        <span>님의 게시글 더보기</span>
                                    </div>
                                )}
                                {[
                                    ...Array(Math.ceil(recentPosts.length / 3)),
                                ].map((a, index) => (
                                    <SingleRow
                                        key={index}
                                        posts={[
                                            recentPosts[index * 3],
                                            recentPosts[index * 3 + 1],
                                            recentPosts[index * 3 + 2],
                                        ]}
                                        isObserving={false}
                                        isLinkToParagraph={true}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </StyledParagraph>
    );
};

export default Paragraph;

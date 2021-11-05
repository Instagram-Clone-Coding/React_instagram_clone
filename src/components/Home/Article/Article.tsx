import styled from "styled-components";
import Card from "UI/Card/Card";
import { useEffect, useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleImgSlider from "./ArticleImgSlider";
import ArticleMainIcons from "./ArticleMainIcons";
import ArticleMain from "./ArticleMain";
import CommentForm from "./CommentForm";

const ArticleCard = styled(Card)`
    margin-bottom: 24px;
    .article-likeInfo {
        padding: 0 16px;
        margin-bottom: 8px;
        span {
            font-weight: ${(props) => props.theme.font.bold};
        }
    }
    .article-createdAt {
        padding-left: 16px;
        margin-bottom: 16px;
        color: ${(props) => props.theme.font.gray};
        font-size: 10px;
    }
    .article-form-layout {
        padding: 6px 16px;
        display: flex;
        align-items: center;
        border-top: 1px solid #efefef;
        form {
            width: 100%;
        }
    }
`;

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({ article }: ArticleProps) => {
    // data state
    const [myFollowersLiked, setMyFollowersLiked] = useState<string[]>([]);
    const [isMyFollowerLiked, setIsMyFollowerLiked] = useState(false);
    // like state
    const [isLiked, setIsliked] = useState(false);
    useEffect(() => {
        // toggle likes
        // 내 팔로워 중 한 명이 좋아요 눌렀는지 확인(여기서 일단 내 팔로워가 like2라 가정)
        const getMyFollowerLiked = article.likes.filter(
            (username: string) => username === "like2"
        );
        setMyFollowersLiked(getMyFollowerLiked);
        setIsMyFollowerLiked(getMyFollowerLiked !== []);
    }, [article]);

    const toggleLikeHandler = (): void => setIsliked((prev: boolean) => !prev);

    const changeToLikeHandler = (): undefined => {
        if (isLiked) return;
        setIsliked(true);
    };

    const calculateTerm = (createdAt: number): string => {
        const gap = Date.now() - createdAt;
        if (gap >= 604800000) {
            return `${Math.floor(gap / 604800000)}주 전`;
        } else if (gap >= 86400000) {
            return `${Math.floor(gap / 86400000)}일 전`;
        } else if (gap >= 3600000) {
            return `${Math.floor(gap / 3600000)}시간 전`;
        } else if (gap >= 60000) {
            return `${Math.floor(gap / 60000)}분 전`;
        } else {
            return "방금 전";
        }
    };

    return (
        <ArticleCard as="article">
            <ArticleHeader article={article} />
            <ArticleImgSlider
                imgs={article.imgs}
                onLike={changeToLikeHandler}
            />
            <ArticleMainIcons
                isLiked={isLiked}
                onToggleLike={toggleLikeHandler}
            />
            <div className="article-likeInfo">
                {isMyFollowerLiked ? (
                    <div>
                        {/* 임의로 첫 번째 인덱스 선택 */}
                        <span>{myFollowersLiked[0]}</span>님 외
                        <span>{article.likes.length - 1}명</span>이 좋아합니다
                    </div>
                ) : (
                    <span>좋아요 {article.likes.length}개</span>
                )}
            </div>
            <ArticleMain
                owner={article.owner}
                text={article.text}
                comments={article.comments}
            />
            <div className="article-createdAt">
                {calculateTerm(article.createdAt)}
            </div>
            <div className="article-form-layout">
                <CommentForm />
            </div>
        </ArticleCard>
    );
};

export default Article;

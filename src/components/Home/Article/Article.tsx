import styled from "styled-components";
import Card from "UI/Card/Card";
import { useEffect, useState } from "react";
import ArticleMainIcons from "./ArticleMainIcons";
import ArticleHeader from "./ArticleHeader";
import ArticleImgSlider from "./ArticleImgSlider";
import ArticleMain from "./ArticleMain";

const ArticleCard = styled(Card)`
    margin-bottom: 24px;

    .article-likeInfo {
        padding: 0 16px;
        margin-bottom: 8px;
    }

    .article-createdAt {
        padding-left: 16px;
        margin-bottom: 4px;
    }
    .article-write {
        padding: 0 16px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        border-top: 1px solid #efefef;
        min-height: 56px;
        form {
            width: 100%;
        }
    }
`;

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({ article }: any) => {
    // data state
    const [myFollowersLiked, setMyFollowersLiked] = useState([]);
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

    const toggleLike = () => setIsliked((prev: boolean) => !prev);

    const changeToLike = () => {
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
            <ArticleImgSlider imgs={article.imgs} onLike={changeToLike} />
            <ArticleMainIcons isLiked={isLiked} onToggleLike={toggleLike} />
            <div className="article-likeInfo">
                {isMyFollowerLiked ? (
                    <div>
                        {/* 임의로 첫 번째 인덱스 선택 */}
                        {myFollowersLiked[0]}님 외{" "}
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
            <div className="article-write">
                <form>
                    <button>
                        <svg
                            aria-label="이모티콘"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                            <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                        </svg>
                    </button>
                    <input type="text" placeholder="댓글 달기" />
                    <button type="submit"></button>
                </form>
            </div>
        </ArticleCard>
    );
};

export default Article;

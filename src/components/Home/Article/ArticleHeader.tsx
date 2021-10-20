import styled from "styled-components";
import Username from "../Username";

const StyledArticleHeader = styled.header`
    height: 60px;
    padding: 16px;
    display: flex;
    position: relative;
    img {
        min-width: 32px;
        min-height: 32px;
        border-radius: 50%;
        cursor: pointer;
    }
    .header-content {
        margin-left: 14px;
        flex: 1;
        div:nth-child(2) {
            font-size: 12px;
            line-height: 15px;
            cursor: pointer;
        }
    }
    .header-dots {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

const ArticleHeader = ({ article }: any) => {
    return (
        <StyledArticleHeader>
            <img src={article.owner.avatarUrl} alt={article.owner.username} />
            <div className="header-content">
                <Username>{article.owner.username}</Username>
                <div>{article.location}</div>
            </div>
            <div className="header-dots">
                <svg
                    aria-label="옵션 더 보기"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6.5" cy="12" r="1.5"></circle>
                    <circle cx="17.5" cy="12" r="1.5"></circle>
                </svg>
            </div>
        </StyledArticleHeader>
    );
};

export default ArticleHeader;

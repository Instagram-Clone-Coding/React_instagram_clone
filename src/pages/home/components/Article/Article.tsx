import styled from "styled-components";
import Card from "UI/Card/Card";
import Username from "../Username";
import sprite2 from "../../../../img/sprite2.png";

const ArticleCard = styled(Card)`
    margin-bottom: 24px;
    header {
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
            div {
                background: url(${sprite2}) no-repeat -524px -483px;
                width: 15px;
                height: 3px;
                transform: scale(0.8);
            }
        }
    }
    .img-wrap {
        width: 100%;
        display: flex;
        align-items: center;
        overflow-x: hidden;
        position: relative;
        .img-slider {
            display: flex;
            align-items: center;
            img {
                width: 100%;
            }
        }
        .leftArrow {
            left: 8px;
            background: url(${sprite2}) no-repeat;
            background-position: -129px -97px;
        }

        .rightArrow {
            right: 8px;
            background: url(${sprite2}) no-repeat;
            background-position: -160px -97px;
        }
        .leftArrow,
        .rightArrow {
            width: 30px;
            height: 30px;
            position: absolute;
            background-size: 440px 411px;
            cursor: pointer;
        }
    }
`;

const Article = ({ article }: any) => {
    const arrowClickHandler = (event: any) => {
        const {
            target: {
                className,
                parentNode: { childNodes },
            },
        } = event;
        const slider = childNodes[0];
        if (className === "leftArrow") {
        } else if (className === "rightArrow") {
            console.log("rightArrow");
        }
    };

    return (
        <ArticleCard as="article">
            <header>
                <img
                    src={article.owner.avatarUrl}
                    alt={article.owner.username}
                />
                <div className="header-content">
                    <Username>{article.owner.username}</Username>
                    <div>{article.location}</div>
                </div>
                <div className="header-dots">
                    <div></div>
                </div>
            </header>
            <div className="img-wrap">
                <div className="img-slider">
                    {article.imgs.map((url: string, index: string) => (
                        <img key={index} src={url} alt={index} />
                    ))}
                </div>
                <div className="leftArrow" onClick={arrowClickHandler}></div>
                <div className="rightArrow" onClick={arrowClickHandler}></div>
            </div>
        </ArticleCard>
    );
};

export default Article;

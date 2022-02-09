// fetched data type
export interface RecentArticlesProps {
    data: {
        data: HomeType.ArticleProps[];
    };
}

export interface ExtraArticleProps {
    data: {
        data: {
            content: [HomeType.ArticleProps];
            empty: boolean;
        };
    };
}

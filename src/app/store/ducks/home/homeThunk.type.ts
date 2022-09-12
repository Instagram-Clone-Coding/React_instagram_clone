// fetched data type
export interface RecentArticlesProps {
    data: {
        data: PostType.ArticleProps[];
    };
}

export interface ExtraArticleProps {
    data: {
        data: {
            content: [PostType.ArticleProps];
            empty: boolean;
        };
    };
}

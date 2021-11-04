export default interface ArticleProps {
    article: {
        imgs: string[];
        location: string;
        hashtags: string[];
        text: string;
        owner: {
            username: string;
            avatarUrl: string;
        };
        likes: string[];
        comments: CommentProps[];
        createdAt: number;
    };
}

interface CommentProps {
    username: string;
    comment: string;
}

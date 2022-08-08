export interface AlarmItem {
    id: number;
    type: string;
    message: string;
    agent: {
        id: number;
        username: string;
        name: string;
        image: {
            imageUrl: string;
            imageType: string;
            imageName: string;
            imageUUID: string;
        };
        hasStory: false;
    };
    createdDate: string;
    postId: number;
    postImageUrl: string;
    content: string;
}

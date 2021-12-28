import StoryCircle from "components/Common/StoryCircle";
import styled from "styled-components";

const ListLayout = styled.li`
    min-width: 80px;
    height: 100%;
    padding: 0 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    span {
        margin-top: 2px;
        font-size: 12px;
        line-height: 14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
`;

interface StoryProps {
    src: string;
    username: string;
}

const Story = ({ src, username }: StoryProps) => {
    return (
        <ListLayout>
            <StoryCircle
                type="unread" // 백엔드 소통 후 읽었는지 여부 확인
                avatarUrl={src}
                username={username}
                scale={1}
            />
            <span>{username}</span>
        </ListLayout>
    );
};

export default Story;

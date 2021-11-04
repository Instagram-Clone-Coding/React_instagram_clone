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
    .imgBox {
        width: 66px;
        height: 66px;
        margin-bottom: 2px;
        border-radius: 50%;
        background: radial-gradient(
            circle at bottom left,
            #f58529 20%,
            #c42d91
        );
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 2px solid white;
            box-sizing: content-box;
            z-index: 0;
        }
    }
    // 읽었을 경우
    .imgBox.read {
        background: ${(props) => props.theme.color.bd_gray};
        width: 64px;
        height: 64px;
    }
    span {
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
            <div className="imgBox">
                <img src={src} alt={username} />
            </div>
            <span>{username}</span>
        </ListLayout>
    );
};

export default Story;

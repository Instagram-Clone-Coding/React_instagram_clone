import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    img {
        height: 44px;
        width: 44px;
        border-radius: 50%;
    }
`;

export default function AlarmProfile({
    agent,
}: Pick<AlarmType.AlarmContent, "agent">) {
    return (
        <Container>
            <Link to={`/profile/${agent.username}`}>
                <img
                    src={agent.image.imageUrl}
                    alt={`${agent.username}님의 이미지`}
                ></img>
            </Link>
        </Container>
    );
}

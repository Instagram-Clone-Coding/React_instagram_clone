import React from "react";
import styled from "styled-components";
import AlarmProfile from "components/Common/Header/alarm/alarm_profile";
import { Link } from "react-router-dom";
import useGapText from "hooks/useGapText";

const Container = styled.div`
    display: flex;

    .alarm {
        margin: 0 12px;

        a {
            text-decoration: none;

            .username {
                font-weight: 700;
            }
        }

        .create-date {
            color: ${(props) => props.theme.font.gray};
        }
    }

    .relative-image {
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
            height: 40px;
        }
    }
`;

const removeRefer = (message: string) => {
    return message.replace(/\{[a-z.]+\}/g, "");
};

export default function AlarmItem({ alarm }: { alarm: Alarm.AlarmItem }) {
    const alarmMessage = removeRefer(alarm.message);
    // content -> @username, #search -> 파란색으로 스타일링..! -> 검색가능해야하는데..? -> #search 프로필페이지 만들어야함

    // 무한스크롤
    // 컴포넌트 언마운트 -> alarm창 닫도록

    return (
        <Container>
            <AlarmProfile agent={alarm.agent} />
            <div className="alarm">
                <Link to={`/profile/${alarm.agent.username}`}>
                    <span className="username">{alarm.agent.username}</span>
                </Link>
                {alarmMessage}
                {alarm.content}{" "}
                <span className="create-date">
                    {useGapText(alarm.createdDate)}
                </span>
            </div>
            <div className="relative-image">
                <Link to={`/p/${alarm.postId}`}>
                    <img src={alarm.postImageUrl} alt={"이미지 썸네일"}></img>
                </Link>
            </div>
        </Container>
    );
}

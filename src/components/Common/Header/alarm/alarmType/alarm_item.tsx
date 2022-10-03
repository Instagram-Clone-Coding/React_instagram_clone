import React from "react";
import styled from "styled-components";
import AlarmProfile from "components/Common/Header/alarm/alarm_profile";
import { Link } from "react-router-dom";
import useGapText from "hooks/useGapText";
import { removeRefer } from "components/Common/Header/alarm/utils";
import StringFragmentWithMentionOrHashtagLink from "components/Common/StringFragmentWithMentionOrHashtagLink";

const Container = styled.div`
    display: flex;
    flex: 1;

    .alarm {
        margin: 0 12px;
        flex: 1;

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
            width: 40px;
        }
    }
`;

export default function AlarmItem({ alarm }: { alarm: Alarm.PostAlarm }) {
    const alarmMessage = removeRefer(alarm.message);
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
                <StringFragmentWithMentionOrHashtagLink
                    str={alarm.content}
                    mentions={alarm.mentionsOfContent}
                    hashtags={alarm.hashtagsOfContent}
                />{" "}
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

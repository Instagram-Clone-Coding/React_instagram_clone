import AlarmProfile from "components/Common/Header/alarm/alarm_profile";
import { removeRefer } from "components/Common/Header/alarm/utils";
import FollowingModal from "components/Home/Modals/FollowingModal";
import useGapText from "hooks/useGapText";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
`;

export default function FollowAlarm({ alarm }: { alarm: Alarm.FollowAlarm }) {
    const alarmMessage = removeRefer(alarm.message);

    return (
        <Container>
            <AlarmProfile agent={alarm.agent} />
            <div className="alarm">
                <Link to={`/profile/${alarm.agent.username}`}>
                    <span className="username">{alarm.agent.username}</span>
                </Link>
                {alarmMessage}{" "}
                <span className="create-date">
                    {useGapText(alarm.createdDate)}
                </span>
            </div>
            {/* <button> */}
            {alarm.following ? "팔로잉" : "팔로우"}
            {/* {alarm.following ? <FollowingModal /> : <button>hi</button>} */}
            {/* </button> */}
        </Container>
    );
}

import { postFollow } from "app/store/ducks/home/homThunk";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { useAppDispatch } from "app/store/Hooks";
import AlarmProfile from "components/Common/Header/alarm/AlarmProfile";
import { removeRefer } from "components/Common/Header/alarm/utils";
import useGapText from "hooks/useGapText";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import Button from "styles/UI/Button";

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

export default function FollowAlarm({
    alarm,
}: {
    alarm: AlarmType.FollowAlarm;
}) {
    const alarmMessage = removeRefer(alarm.message);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const [isFollowing, setIsFollowing] = useState(alarm.following);

    const followHandler = () => {
        dispatch(postFollow({ username: alarm.agent.username })) //
            .then(() => {
                setIsFollowing(!isFollowing);
            });
    };

    const showUnfollowingModalHandler = () => {
        // 모달에 들어갈 유저 정보 세팅
        dispatch(
            modalActions.setModalUsernameAndImageUrl({
                nickname: alarm.agent.username,
                imageUrl: alarm.agent.image.imageUrl,
            }),
        );
        // 모달 켜기
        dispatch(modalActions.changeActivatedModal("alarmUnfollowing"));
    };

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
            {isFollowing ? (
                <Button
                    bgColor={theme.color.bg_gray}
                    color="black"
                    style={{
                        border: `1px solid ${theme.color.bd_gray}`,
                        height: "30px",
                    }}
                    onClick={showUnfollowingModalHandler}
                >
                    팔로잉
                </Button>
            ) : (
                <Button onClick={followHandler} style={{ height: "30px" }}>
                    팔로우
                </Button>
            )}
        </Container>
    );
}

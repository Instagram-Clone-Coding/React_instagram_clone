import AlarmItem from "components/Common/Header/alarm/alarmType/alarm_item";
import FollowAlarm from "components/Common/Header/alarm/alarmType/follow_alarm";
import useOnView from "hooks/useOnView";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.ul`
    display: flex;
    flex-direction: column;

    .alarm-item {
        padding: 12px 16px;
    }
`;

export default function AlarmList({
    alarmList,
    onLoadExtraAlarm,
}: {
    alarmList: Alarm.AlarmContent[];
    onLoadExtraAlarm: () => void;
}) {
    const lastAlarmItemRef = useRef<HTMLLIElement>(null);
    const isVisible = useOnView(lastAlarmItemRef);

    useEffect(() => {
        isVisible && onLoadExtraAlarm();
    }, [isVisible]);

    return (
        <Container>
            {alarmList.map((alarm, index) => (
                <li
                    className="alarm-item"
                    key={alarm.id}
                    ref={
                        index === alarmList.length - 4 ? lastAlarmItemRef : null
                    }
                >
                    {alarm.type === "FOLLOW" ? (
                        <FollowAlarm alarm={alarm} />
                    ) : (
                        <AlarmItem alarm={alarm} />
                    )}
                </li>
            ))}
        </Container>
    );
}

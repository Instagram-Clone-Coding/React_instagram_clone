import { loadAlarmList } from "app/store/ducks/alarm/alarmThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import AlarmProfile from "components/Common/Header/alarm/alarm_profile";
import Comment from "components/Common/Header/alarm/alarm_type/comment";
import Like from "components/Common/Header/alarm/alarm_type/like";
import Mention from "components/Common/Header/alarm/alarm_type/mention";
import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 1px;

    .pointer {
        background-color: #fff;
        border: 1px solid #fff;
        height: 14px;
        transform: rotate(45deg);
        box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
        width: 14px;
        position: relative;
        top: 5px;
        left: 5px;
    }

    .alarm-container {
        display: flex;
        flex-direction: column;
        width: 485px;
        z-index: 200;
        position: absolute;
        right: -26px;
        top: 8px;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
        border-radius: 6px;
        max-height: 440px;
        overflow: auto;

        .title {
            font-weight: 700;
            padding: 4px;
            display: flex;
            justify-content: flex-start;
            margin: 8px 0 0 8px;
        }

        .alarm-list {
            .alarm-item {
                display: flex;
                padding: 12px 16px;
            }
        }
    }
`;

export default function Alarm({
    alarmContainerRef,
}: {
    alarmContainerRef: React.RefObject<HTMLDivElement>;
}) {
    // alarm list 가져오기 <- api 호출
    const dispatch = useAppDispatch();
    const { alarmList } = useAppSelector((state) => state.alarm);

    useEffect(() => {
        dispatch(loadAlarmList());
    }, []);

    // const matchComponentAtAlarmType = {
    //     COMMENT: <Comment />,
    //     LIKE_POST: <Like />,
    //     MENTION_POST: <Mention />,
    // };

    return (
        <Container>
            <div className="pointer" />
            <div className="alarm-container" ref={alarmContainerRef}>
                <div className="title">
                    <div>이전 활동</div>
                </div>
                <div className="alarm-list">
                    {alarmList
                        ? alarmList.map((alarm) => {
                              return (
                                  <div className="alarm-item">
                                      <AlarmProfile agent={alarm.agent} />
                                      {alarm.type === "COMMENT" ? (
                                          <Comment alarm={alarm} />
                                      ) : alarm.type === "LIKE_POST" ? (
                                          <Like alarm={alarm} />
                                      ) : (
                                          <Mention alarm={alarm} />
                                      )}
                                  </div>
                              );
                          })
                        : `알람이 없습니다.`}
                </div>
            </div>
        </Container>
    );
}

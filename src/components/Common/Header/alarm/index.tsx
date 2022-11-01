import { alarmAction } from "app/store/ducks/alarm/alarmSlice";
import { loadAlarmList } from "app/store/ducks/alarm/alarmThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import AlarmList from "components/Common/Header/alarm/alarm_list";
import ImageSprite from "components/Common/ImageSprite";
import Loading from "components/Common/Loading";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sprite from "assets/Images/sprite.png";

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
        min-height: 200px;
        overflow: auto;

        .title {
            font-weight: 700;
            padding: 4px;
            display: flex;
            justify-content: flex-start;
            margin: 8px 0 0 8px;
        }

        .empty-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 50px;
            font-size: 15px;

            span {
                padding: 10px 0;
            }
        }
    }
`;

export default function Alarm({
    alarmContainerRef,
}: {
    alarmContainerRef: React.RefObject<HTMLDivElement>;
}) {
    const dispatch = useAppDispatch();
    const [pageToLoad, setPageToLoad] = useState(1);
    const { alarmList, totalPage } = useAppSelector((state) => state.alarm);

    useEffect(() => {
        dispatch(loadAlarmList({ page: pageToLoad }));
        setPageToLoad(pageToLoad + 1);

        return () => {
            dispatch(alarmAction.clearAlarmList());
        };
    }, []);

    const loadExtraAlarmList = () => {
        if (pageToLoad <= totalPage) {
            dispatch(loadAlarmList({ page: pageToLoad }));
            setPageToLoad(pageToLoad + 1);
        }
    };

    const emptyImage: CommonType.ImageProps = {
        width: 96,
        height: 96,
        position: `0 -303px`,
        url: sprite,
    };

    return (
        <Container>
            <div className="pointer" />
            <div className="alarm-container" ref={alarmContainerRef}>
                <div className="title">
                    <div>이전 활동</div>
                </div>
                <section className="alarm-list">
                    {!alarmList ? (
                        <Loading size={36} isInButton={false} />
                    ) : alarmList.length === 0 ? (
                        <div className="empty-container">
                            <ImageSprite {...emptyImage} />
                            <span>게시물 활동</span>
                            <span>
                                다른 사람이 회원님이 게시물을 좋아하거나 댓글을
                                남기면 여기에 표시됩니다.
                            </span>
                        </div>
                    ) : (
                        <AlarmList
                            alarmList={alarmList}
                            onLoadExtraAlarm={loadExtraAlarmList}
                        />
                    )}
                </section>
            </div>
        </Container>
    );
}

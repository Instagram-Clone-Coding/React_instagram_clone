import { loadAlarmList } from "app/store/ducks/alarm/alarmThunk";
import AlarmList from "components/Common/Header/alarm/AlarmList";
import ImageSprite from "components/Common/ImageSprite";
import Loading from "components/Common/Loading";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import sprite from "assets/Images/sprite.png";
import { useAppDispatch } from "app/store/Hooks";

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

// TODO: 팔로우 모달 닫을 때, 다 닫힘 -> 해당 모달만 닫히게! (알람은 닫히면 안됨)
export default function Alarm({
    alarmContainerRef,
}: {
    alarmContainerRef: React.RefObject<HTMLDivElement>;
}) {
    const dispatch = useAppDispatch();
    const [pageToLoad, setPageToLoad] = useState(1);
    const [alarmList, setAlarmList] = useState<AlarmType.AlarmContent[]>([]);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        dispatch(loadAlarmList({ page: pageToLoad }))
            .unwrap()
            .then((res) => {
                setAlarmList([...res.content]);
                setTotalPage(res.totalPages);
                setPageToLoad(pageToLoad + 1);
            });
    }, []);

    const loadExtraAlarmList = useCallback(() => {
        if (pageToLoad <= totalPage) {
            dispatch(loadAlarmList({ page: pageToLoad }))
                .unwrap()
                .then((res) => {
                    setAlarmList((currentList) => [
                        ...currentList,
                        ...res.content,
                    ]);
                    setPageToLoad(pageToLoad + 1);
                });
        }
    }, [pageToLoad, totalPage, dispatch]);

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

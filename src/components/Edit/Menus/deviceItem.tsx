import { deviceLogout } from "app/store/ducks/auth/authThunk";
import { LoginDevice } from "app/store/ducks/auth/authThunk.type";
import { useAppDispatch } from "app/store/Hooks";
import { ReactComponent as Map } from "assets/Svgs/position.svg";
import { ReactComponent as MoreTap } from "assets/Svgs/v.svg";
import NaverMap from "components/Edit/Menus/naver_map";
import useGapText from "hooks/useGapText";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { isInvalidLocation } from "utils/maps";
import LocationError from "assets/Images/location-error-maps.png";

const Container = styled.div<{ isToggleOn: boolean }>`
    padding: 0.5rem 0;

    .device {
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        align-items: center;

        :hover {
            background-color: ${(props) => props.theme.color.bg_gray};
        }

        .device-content {
            display: flex;
            .description {
                margin-left: 12px;
                flex: 1;

                .time {
                    color: ${(props) => props.theme.font.gray};

                    .first-login-date > span {
                        color: rgb(88, 195, 34);
                    }
                }
            }
        }

        .more-tap {
            font-weight: 400;
            transform: ${(props) =>
                props.isToggleOn ? "none" : "rotate(180deg)"};
        }
    }

    .map-container {
        border: 1px solid ${(props) => props.theme.color.bd_gray};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        margin: 8px 0;

        button {
            padding: 20px 0;
        }

        .location-error-container {
            position: relative;
            width: 100%;
            height: 200px;

            .location-error-img {
                width: 100%;
                height: 100%;
            }

            .location-error-background {
                position: absolute;
                top: 0;
                background-color: gray;
                opacity: 70%;
                width: 100%;
                height: 100%;

                .location-error-text {
                    font-size: 1.25rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }

    hr {
        border: 0;
        height: 1px;
        background-color: ${(props) => props.theme.color.bd_gray};
    }
`;

export default function DeviceItem({
    device,
    location,
    tokenId,
    index,
    lastLoginDate,
    current,
}: LoginDevice & { index: string }) {
    const [isToggleOn, setIsToggleOn] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const dispatch = useAppDispatch();
    const firstLoginTime = useGapText(lastLoginDate);

    useEffect(() => {
        if (isInvalidLocation(location.city)) return;

        const naverMap = new NaverMap();
        naverMap.loadScript(() => setMapLoaded(true));
        if (mapLoaded && isToggleOn) {
            const userPosition = new naver.maps.LatLng(
                Number(location.latitude),
                Number(location.longitude),
            );
            const mapOptions = {
                center: userPosition,
                zoom: 10,
            };
            const map = new naver.maps.Map(index, mapOptions);
            new naver.maps.Marker({
                position: userPosition,
                map: map,
            });
        }
    }, [isToggleOn]);

    return (
        <Container isToggleOn={isToggleOn}>
            <div className="device" onClick={() => setIsToggleOn(!isToggleOn)}>
                <div className="device-content">
                    <Map />
                    <div className="description">
                        <div className="city">
                            {isInvalidLocation(location.city)
                                ? "위치를 찾을 수 없습니다"
                                : location.city}
                        </div>
                        <div className="time">
                            <span className="first-login-date">
                                {current ? (
                                    <span>지금 활동중</span>
                                ) : (
                                    `${firstLoginTime} 전`
                                )}
                            </span>
                            <span> · </span>
                            <span>{device}</span>
                        </div>
                    </div>
                </div>
                <button className="more-tap">
                    <MoreTap />
                </button>
            </div>
            {isToggleOn && (
                <div className="map-container">
                    {isInvalidLocation(location.city) ? (
                        <div className="location-error-container">
                            <img
                                src={LocationError}
                                alt="위치불러오기 실패 시 보여주는 이미지"
                                className="location-error-img"
                            />
                            <div className="location-error-background">
                                <p className="location-error-text">
                                    위치를 찾을 수 없습니다
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div
                            id={index}
                            style={{ width: "100%", height: "200px" }}
                        ></div>
                    )}

                    <button
                        onClick={() =>
                            dispatch(deviceLogout({ tokenId, current }))
                        }
                        type="button"
                    >
                        로그아웃
                    </button>
                </div>
            )}
            <hr />
        </Container>
    );
}

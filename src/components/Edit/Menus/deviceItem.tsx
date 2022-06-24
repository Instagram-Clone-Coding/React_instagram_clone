import { LoginDevice } from "app/store/ducks/auth/authThunk.type";
import { ReactComponent as Map } from "assets/Svgs/position.svg";
import { ReactComponent as MoreTap } from "assets/Svgs/v.svg";
import NaverMap from "components/Edit/Menus/naver_map";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
            }
        }

        .more-tap {
            font-weight: 400;
            transform: ${(props) =>
                props.isToggleOn ? "none" : "rotate(180deg)"};
        }
    }

    hr {
        border: 0;
        height: 1px;
        background-color: ${(props) => props.theme.color.bd_gray};
    }
`;

export default function DeviceItem({ device, location, tokenId }: LoginDevice) {
    // device 가공
    // location city 가공
    const [isToggleOn, setIsToggleOn] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
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
            const map = new naver.maps.Map("map", mapOptions); // params: 지도가 들어갈 dom요소 or dom id, mapOption
            new naver.maps.Marker({
                position: userPosition,
                map: map,
            });
        }
    });

    return (
        <Container isToggleOn={isToggleOn}>
            <div className="device" onClick={() => setIsToggleOn(!isToggleOn)}>
                <div className="device-content">
                    <Map />
                    <div className="description">
                        <div className="city">Seoul, Korea</div>
                        <span className="first-login-date">5시간 전</span>
                        <span> · </span>
                        <span>Mac Os</span>
                    </div>
                </div>
                <button className="more-tap">
                    <MoreTap />
                </button>
            </div>
            {isToggleOn && (
                <div id="map" style={{ width: "100%", height: "400px" }}></div>
            )}
            <hr />
        </Container>
    );
}

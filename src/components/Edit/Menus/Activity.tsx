import { getLoginDevice } from "app/store/ducks/auth/authThunk";
import { LoginDevice } from "app/store/ducks/auth/authThunk.type";
import { useAppDispatch } from "app/store/Hooks";
import DeviceItem from "components/Edit/Menus/deviceItem";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.article`
    margin: 1rem 4rem;

    .title {
        font-size: 1.6em;
        padding: 1.5rem 0 1rem 0;
        font-weight: 300;
    }

    .sub-title {
        font-size: 1rem;
        padding: 1rem 0;
        font-weight: 400;
    }
`;

const Activity = () => {
    const [loginDeviceList, setLoginDeviceList] = useState<LoginDevice[]>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadLoginDeviceList = async () => {
            try {
                const response = await dispatch(getLoginDevice()).unwrap();
                setLoginDeviceList(response);
            } catch (error) {
                // 로그인활동 못받아올때
            }
        };
        loadLoginDeviceList();
    }, [dispatch]);

    return (
        <Container>
            <div className="title">로그인 활동</div>
            <div className="sub-title">로그인한 위치</div>
            {loginDeviceList ? (
                loginDeviceList.map((user) => <DeviceItem {...user} />)
            ) : (
                <div>로그인 기록을 확인할 수 없습니다.</div>
            )}
        </Container>
    );
};

export default Activity;

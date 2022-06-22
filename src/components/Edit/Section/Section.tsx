import { useAppSelector } from "app/store/Hooks";
import React from "react";
import styled from "styled-components";
import Activity from "../Menus/Activity";
import PasswordEdit from "../Menus/PasswordEdit";
import ProfileEdit from "../Menus/ProfileEdit";

const Container = styled.div``;

const Section = () => {
    const currentMenu = useAppSelector((state) => state.edit.currentMenu);
    const renderComponent = () => {
        switch (currentMenu) {
            case "프로필 편집":
                return <ProfileEdit />;
            case "비밀번호 변경":
                return <PasswordEdit />;
            case "로그인 활동":
                return <Activity />;
        }
    };
    return <Container>{renderComponent()}</Container>;
};

export default Section;

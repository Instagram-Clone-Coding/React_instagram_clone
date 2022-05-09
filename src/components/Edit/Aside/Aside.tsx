import { selectMenu } from "app/store/ducks/edit/editSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React from "react";
import styled from "styled-components";

const menus: EditType.menuType[] = [
    "프로필 편집",
    "비밀번호 변경",
    "앱 및 웹사이트",
    "이메일 및 SMS",
    "푸시 알림",
    "연락처 관리",
    "개인정보 및 보안",
    "로그인 활동",
    "Instagram에서 보낸 이메일",
    "도움말",
];
const Container = styled.div`
    display: flex;
    flex-direction: column;

    ul {
    }
`;

// selected 라는 props 를 넘겨주기 위해 별도로 선언합니다.
const Menu = styled.li<{ selected: boolean }>`
    padding: 16px 16px 16px 30px;
    cursor: pointer;
    color: #262626;
    font-size: 16px;
    line-height: 20px;
    font-weight: ${({ selected }) => selected && "600"};
    border-left: ${({ selected }) => selected && "2px solid #262626"};
`;

const Aside = () => {
    const dispatch = useAppDispatch();
    const currentMenu = useAppSelector((state) => state.edit.currentMenu);
    return (
        <Container>
            <ul>
                {menus.map((menu) => (
                    <Menu
                        key={menu}
                        selected={menu === currentMenu}
                        onClick={() => {
                            dispatch(selectMenu(menu));
                        }}
                    >
                        <span>{menu}</span>
                    </Menu>
                ))}
            </ul>
        </Container>
    );
};

export default Aside;

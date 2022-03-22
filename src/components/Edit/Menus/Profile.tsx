import { getEditItem } from "app/store/ducks/edit/editThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, { useEffect } from "react";
import styled from "styled-components";
import EditItemInput from "../Section/EditItemInput";

const guide = {
    memberName: `사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
    이름은 14일 안에 두 번만 변경할 수 있습니다.
    `,
    memberUsername: `대부분의 경우 14일 이내에 사용자 이름을 다시 yokattadesune(으)로 변경할 수 있습니다. 더 알아보기`,
    memberIntroduce: `개인정보
    비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.`,
};

const Container = styled.div`
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    .profile {
        display: flex;
        img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            margin: 2px 32px 0 124px;
        }
        .name-guide {
            display: flex;
            flex-direction: column;
            .username {
                font-size: 20px;
                line-height: 22px;
                margin-bottom: 2px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
            }
            .guide {
                color: ${(props) => props.theme.color.blue};
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
            }
        }
    }

    .input-wrapper {
    }
`;

const Profile = () => {
    const dispatch = useAppDispatch();
    const editItem = useAppSelector((state) => state.edit.editItem);

    useEffect(() => {
        dispatch(getEditItem());
    }, [dispatch]);

    return (
        <Container>
            <div className="profile">
                <img
                    src={editItem.memberImageUrl}
                    alt="user"
                    className="user-image"
                />
                <div className="name-guide">
                    <span className="username">{editItem.memberUsername}</span>
                    <span className="guide">프로필 사진 바꾸기</span>
                </div>
            </div>
            <div className="input-wrapper">
                {Object.entries(editItem).map((item) => (
                    <EditItemInput
                        item={item}
                        guide={
                            guide[
                                item[0] as
                                    | "memberName"
                                    | "memberUsername"
                                    | "memberIntroduce"
                            ]
                        }
                    />
                ))}
            </div>
        </Container>
    );
};

export default Profile;

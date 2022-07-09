import { selectModal } from "app/store/ducks/edit/editSlice";
import { edit, getEditItem } from "app/store/ducks/edit/editThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import Notification from "styles/UI/Notification";
import ProfileGenderModal from "../Modal/ProfileGenderModal";
import ProfileImageModal from "../Modal/ProfileImageModal";
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

    .button-wrapper {
        margin: 0 auto;
    }
`;

const Profile = () => {
    const dispatch = useAppDispatch();
    const editItem = useAppSelector((state) => state.edit.editItem);
    const modal = useAppSelector(({ edit }) => edit.modal);
    const userInfo = useAppSelector(({ auth }) => auth.userInfo);
    const [errMsg, setErrMsg] = useState<string>("");

    useEffect(() => {
        dispatch(getEditItem());
    }, [dispatch]);

    const editHandler = async () => {
        try {
            setErrMsg("");
            const data = await dispatch(edit(editItem)).unwrap();

            if (data.status === 400) {
                data.errors.map(
                    (error: { field: string; reason: string; value: string }) =>
                        setErrMsg((errMsg) => `${errMsg} ${error.reason}`),
                );
            }

            if (data.status === 400 && data.errors.length === 0) {
                // 사용자 이름 중복 인경우 여기로 들어옵니다.
                setErrMsg(() => data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openModalHandler = (type: EditType.modalType) => {
        dispatch(selectModal(type));
    };

    return (
        <Container>
            {errMsg.length > 0 && <Notification text={errMsg} />}
            <div className="profile">
                <img
                    src={userInfo?.memberImageUrl}
                    alt={userInfo?.memberUsername}
                    className="user-image"
                />
                <div className="name-guide">
                    <span className="username">{editItem.memberUsername}</span>
                    <span
                        className="guide"
                        onClick={() => {
                            openModalHandler("image");
                        }}
                    >
                        프로필 사진 바꾸기
                    </span>
                </div>
            </div>
            <div className="input-wrapper">
                {Object.entries(editItem).map((item: string[]) => (
                    <EditItemInput
                        key={item[0]}
                        item={item as [EditType.editItemKeyType, string | null]}
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
            <div className="button-wrapper">
                <Button bgColor="#0095f6" color="#fff" onClick={editHandler}>
                    제출{" "}
                </Button>
            </div>
            {modal === "image" && (
                <ProfileImageModal
                    onModalOn={() => {
                        openModalHandler("image");
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}

            {modal === "gender" && (
                <ProfileGenderModal
                    onModalOn={() => {
                        openModalHandler("gender");
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}
        </Container>
    );
};

export default Profile;

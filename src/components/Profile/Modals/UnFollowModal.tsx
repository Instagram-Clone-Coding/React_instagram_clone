import React from "react";
import ModalCard from "styles/UI/ModalCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { authorizedCustomAxios } from "customAxios";
import { lookUpUserProfile } from "app/store/ducks/profile/profileThunk";

const UnFollowModalInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin: 30px;
    }
    h1 {
        font-size: 22px;
        line-height: 26px;
        font-weight: 300;
    }
    h4 {
        margin: 16px 30px 30px 30px;
        color: #8e8e8e;
        text-align: center;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        width: 100%;

        .unfollow-button {
            color: #ed4956;
        }

        button {
            border-top: 1px solid #dbdbdb;
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
            min-height: 48px;
            padding: 4px 8px;
        }
    }
`;

interface UnFollowModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    cut?: boolean; // 내가 상대방을 unfollow 할 경우 false  상대방이 나를 팔로우하는것을 끊어버릴땐 true
}

const UnFollowModal = ({
    onModalOff,
    onModalOn,
    cut = false,
}: UnFollowModalProps) => {
    const dispatch = useAppDispatch();
    const unFollowSelectedUser = useAppSelector(
        (state) => state.profile.unFollowSelectedUser,
    );

    // 내가 상대방을 언팔로우합니다.
    const unFollowHandler = async () => {
        // 언팔로우 실행
        await authorizedCustomAxios.delete(
            `/${unFollowSelectedUser.username}/follow`,
        );

        // 모달 닫고
        onModalOff();

        // 언팔로우한거 반영해주자 (팔로우 버튼으로 바뀝니다)
        await dispatch(
            lookUpUserProfile({ username: unFollowSelectedUser.username }),
        );
    };

    // 나를 팔로우하는 사람이 나를 팔로우 하지 못하게 끊어버립니다.
    const cutFollowHandler = async () => {};

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <UnFollowModalInner>
                <img
                    src={unFollowSelectedUser.imageUrl}
                    alt={unFollowSelectedUser.username}
                />
                {cut && <h1>팔로워를 삭제하시겠어요?</h1>}
                {cut ? (
                    <h4>
                        {unFollowSelectedUser.username}님의 회원님의 팔로워
                        리스트에서 삭제된 사실을 알 수 없습니다.
                    </h4>
                ) : (
                    <h4>
                        @{unFollowSelectedUser.username}님의 팔로우를
                        취소하시겠어요?
                    </h4>
                )}

                <div className="button-container">
                    {cut ? (
                        <button
                            className="unfollow-button"
                            onClick={cutFollowHandler}
                        >
                            삭제
                        </button>
                    ) : (
                        <button
                            className={"unfollow-button"}
                            onClick={unFollowHandler}
                        >
                            팔로우 취소
                        </button>
                    )}
                    <button onClick={onModalOff}>취소</button>
                </div>
            </UnFollowModalInner>
        </ModalCard>
    );
};

export default UnFollowModal;

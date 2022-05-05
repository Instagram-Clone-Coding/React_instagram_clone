import React from "react";
import ModalCard from "styles/UI/ModalCard";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { authorizedCustomAxios } from "../../../customAxios";
import { lookUpUserProfile } from "../../../app/store/ducks/profile/profileThunk";


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

  h4 {
    margin-bottom: 30px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .unfollow-button {
      color: #ED4956;
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
}

const UnFollowModal = ({ onModalOff, onModalOn }: UnFollowModalProps) => {
    const dispatch = useAppDispatch()
    const unFollowSelectedUser = useAppSelector(state => state.profile.unFollowSelectedUser);

    const unFollowHandler = async () => {

        // 언팔로우 실행
        await authorizedCustomAxios.delete(`/${unFollowSelectedUser.username}/follow`)

        // 모달 닫고
        onModalOff();

        // 언팔로우한거 반영해주자 (팔로우 버튼으로 바뀝니다)
        await dispatch(lookUpUserProfile({username:unFollowSelectedUser.username}))
    };


    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <UnFollowModalInner>
                <img src={unFollowSelectedUser.imageUrl} alt={unFollowSelectedUser.username} />
                <h4>@{unFollowSelectedUser.username}님의 팔로우를 취소하시겠어요?</h4>
                <div className="button-container">
                    <button className={"unfollow-button"} onClick={unFollowHandler}>팔로우 취소</button>
                    <button onClick={onModalOff}>취소</button>
                </div>
            </UnFollowModalInner>
        </ModalCard>
    );
};

export default UnFollowModal;
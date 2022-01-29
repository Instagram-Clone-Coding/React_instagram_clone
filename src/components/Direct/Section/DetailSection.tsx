import React from "react";
import styled from "styled-components";
import BlockModal from "components/Direct/Section/Modals/BlockModal";
import ReportModal from "components/Home/Modals/ReportModal";
import { closeModal, openModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import CommonDirectModal from "components/Direct/Section/Modals/CommonDirectModal";

const DetailSectionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  & > div {
    border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);

  }

  .direct-notification-check {
    padding: 20px 16px 16px;
    display: flex;

    input {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);

      &:focus {
        border-color: rgba(var(--d69, 0, 149, 246), 1);
      }
    }
  }


  .member-container {
    display: flex;
    flex-direction: column;
    padding: 16px 0;


    h3 {
      margin: 0 16px;
      font-weight: bold;
      font-size: 1rem;
    }

    .member-profile-container {
      display: flex;
      align-items: center;
      padding: 8px 16px;

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .member-id-name {
        display: flex;
        flex-direction: column;

        .username {
          font-weight: bold;
        }

        .name {
          color: #8e8e8e
        }
      }
    }
  }


  .various-option-container {
    display: flex;
    flex-direction: column;

    div {
      margin: 12px 16px;
      color: #ed4956;
      cursor: pointer;
    }
  }
`;

const DetailSection = () => {
    const dispatch = useAppDispatch();
    const { modal } = useAppSelector((state => state.direct));

    return (
        <DetailSectionContainer>
            <div className="direct-notification-check">
                <input type={"checkbox"} /> <span>메시지 알림 해제</span>
            </div>
            <div className="member-container">
                <h3>멤버</h3>
                <div className="member-profile-container">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150" alt="맴버 사진" />
                    <div className="member-id-name">
                        <span className="username">dlwlrma</span>
                        <span className="name">이지금</span>
                    </div>
                </div>
            </div>
            <div className="various-option-container">
                <div onClick={() => {
                    dispatch(openModal("deleteChat"));
                }}>채팅 삭제
                </div>
                <div onClick={() => {
                    dispatch(openModal("block"));
                }}>차단
                </div>
                <div onClick={() => {
                    dispatch(openModal("report"));
                }}>신고
                </div>
            </div>

            {/*under this point is modal section*/}
            {
                modal === "deleteChat" && <CommonDirectModal modalType={"deleteChat"}
                                                             title={"채팅을 삭제하시겠어요?"}
                                                             description={"삭제하면 회원님의 받은 메시지함에서 채팅이 삭제됩니다. 다른 사람의 받은 메시지함에는 계속 표시됩니다."}
                                                             actionName={"삭제"}
                />
            }
            {
                modal === "block" && <CommonDirectModal modalType={"block"} actionName={"차단"}
                title={"개복치님을 차단하시겠어요?"} description={"상대방은 Instagram에서 회원님의 프로필, 게시물 또는 스토리를 찾을 수 없습니다. Instagram은 회원님이 차단한 사실을 상대방에게 알리지 않습니다."}
                />
            }
            {
                modal === "report" && <ReportModal
                    onModalOn={() => {
                        dispatch(openModal("report"));
                    }}
                    onModalOff={() => {
                        dispatch(closeModal());
                    }}
                />
            }
        </DetailSectionContainer>
    );
};

export default DetailSection;
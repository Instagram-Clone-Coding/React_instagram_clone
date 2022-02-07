import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import { ReactComponent as DetailInfo } from "assets/Svgs/direct-detail-info.svg";
import { ReactComponent as DetailInfoActive } from "assets/Svgs/direct-detail-info-active.svg";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { selectView } from "app/store/ducks/direct/DirectSlice";


interface SectionHeaderContainerType {
    view: string;
}


const SectionHeaderContainer = styled.section<SectionHeaderContainerType>`
  height: 60px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.color.bd_gray};

  .dummy-container {
    display: ${(props) => !(props.view === "detail") && "none"};
  }

  .user-profile-container {
    height: 50%;
    display: flex;
    align-items: center;

    img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      margin-right: 12px;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .detail-info-container {
    display: flex;
    cursor: pointer;
  }
`;


const SectionHeader = () => {
    const dispatch = useAppDispatch();
    const { view,selectedRoom } = useAppSelector((state => state.direct));
    const viewConvertHandler = () => {
        switch (view) {
            case "detail":
                dispatch(selectView("chat"));
                break;
            case "chat":
                dispatch(selectView("detail"));
                break;
            // case "requestsChat":
            //     dispatch(selectView("detail"))
            //     break
            default:
                break;
        }
    };

    return (
        <SectionHeaderContainer view={view}>
            <div className="dummy-container">

            </div>
            <div className="user-profile-container">
                {view === "detail" ? <h3>상세 정보</h3> :
                    <>
                        <img src={selectedRoom?.invitees[0].imageUrl} alt="selected-user-image" />
                        <h3>{selectedRoom?.invitees[0].username}</h3>
                    </>
                }
            </div>
            <div className="detail-info-container" onClick={viewConvertHandler}>
                {
                    view === "detail" ? <DetailInfoActive /> : <DetailInfo />
                }
            </div>
        </SectionHeaderContainer>
    );
};

export default SectionHeader;
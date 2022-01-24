import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import { ReactComponent as DetailInfo } from "assets/Svgs/direct-detail-info.svg";
import { ReactComponent as DetailInfoActive } from "assets/Svgs/direct-detail-info-active.svg";

interface SectionHeaderProps {
    currentSectionView: Direct.currentSectionViewType;
    setCurrentSectionView: Dispatch<SetStateAction<Direct.currentSectionViewType>>;
}

interface SectionHeaderContainerType {
    currentSectionView:string
}


const SectionHeaderContainer = styled.section<SectionHeaderContainerType>`
  height: 60px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.color.bd_gray};
  
  .dummy-container{
    display: ${(props) => !(props.currentSectionView === "detail")  && 'none'  };
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


const SectionHeader = ({ currentSectionView, setCurrentSectionView }: SectionHeaderProps) => {
    const viewConvertHandler = () => {
        switch (currentSectionView){
            case "detail":
                setCurrentSectionView("chat");
                break;
            case "chat":
                setCurrentSectionView("detail");
                break;
            default:
                break;
        }
    };

    return (
        <SectionHeaderContainer currentSectionView={currentSectionView}>
            <div className="dummy-container">

            </div>
            <div className="user-profile-container">
                {currentSectionView === "detail" ? <h3>상세 정보</h3> :
                    <>
                    <img src="https://placeimg.com/50/50/any" alt="selected-user-image" />
                    <h3>개복치님</h3>
                    </>
                    }
            </div>
            <div className="detail-info-container" onClick={viewConvertHandler}>
                {
                    currentSectionView === "detail" ? <DetailInfoActive /> : <DetailInfo />
                }
            </div>
        </SectionHeaderContainer>
    );
};

export default SectionHeader;
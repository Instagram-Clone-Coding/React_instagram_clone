import React from "react";
import styled from "styled-components";
import { ReactComponent as GridSvg } from "assets/Svgs/grid.svg";
import { ReactComponent as TagSvg } from "assets/Svgs/tag.svg";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { selectCategory } from "app/store/ducks/profile/profileSlice";


const CategoryContainer = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  letter-spacing: 1px;

  border-top: 1px solid #dbdbdb;
  color: #8e8e8e;

  span {
    margin-left: 8px;
  }

  div {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 52px;
  }

  .current{
    color: black;
    font-weight: bold;
    border-top: 1px solid black;
    svg{
      color: black;
      fill: black;
    }
  }

  @media (min-width: 736px) {
    div {
      margin: 0 30px;
    }
  }
`;

const Category = () => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(state => state.profile.currentCategory);

    return (
        <CategoryContainer>
            <div className={currentCategory === "" ? 'current' : ''} onClick={() => {
                dispatch(selectCategory(""));
            }}>
                <GridSvg /><span>게시물</span>
            </div>
            <div className={currentCategory === "tagged" ? 'current' : ''}  onClick={() => {
                dispatch(selectCategory("tagged"));
            }}>
                <TagSvg /><span>태그됨</span>
            </div>
        </CategoryContainer>
    );
};

export default Category;

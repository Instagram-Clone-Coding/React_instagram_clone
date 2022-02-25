import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as GridSvg } from "assets/Svgs/grid.svg";
import { ReactComponent as TagSvg } from "assets/Svgs/tag.svg";


const CategoryContainer = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  letter-spacing: 1px;

  border-top: 1px solid #dbdbdb;
  color: #8e8e8e;

  span{
    margin-left: 8px;
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 52px;

  }


  @media (min-width: 736px) {
    a {
      margin: 0 30px;
    }
  }
`;

const Category = () => {
    return (
        <CategoryContainer>
            <Link to={"/"}><GridSvg /><span>게시물</span></Link>
            <Link to={"/"}><GridSvg /><span>저장됨</span></Link>
            <Link to={"/"}><TagSvg /><span>태그됨</span></Link>
        </CategoryContainer>
    );
};

export default Category;

import React, { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as GridSvg } from "assets/Svgs/grid.svg";
import { ReactComponent as TagSvg } from "assets/Svgs/tag.svg";
import { ReactComponent as BookmarkSvg } from "assets/Svgs/emptyBookmark.svg";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { selectCategory } from "app/store/ducks/profile/profileSlice";
import { useParams } from "react-router-dom";

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

    .current {
        color: black;
        font-weight: bold;
        border-top: 1px solid black;

        svg {
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
    const currentCategory = useAppSelector(
        (state) => state.profile.currentCategory,
    );
    const userInfo = useAppSelector((state) => state.auth.userInfo); // 현재 로그인한 사람
    const { username } = useParams<{ username: string }>(); // 현재 프로필 주인

    useEffect(() => {
        dispatch(selectCategory("uploaded"));
    }, []);

    return (
        <CategoryContainer>
            <div
                className={currentCategory === "uploaded" ? "current" : ""}
                onClick={() => {
                    dispatch(selectCategory("uploaded"));
                }}
            >
                <GridSvg />
                <span>게시물</span>
            </div>

            {/*내가 나의 프로필을 보고 있다면 저장됨을 보여줘라*/}
            {/*다른사람 프로필을 보고있다면 게시물과 태그됨만 보여줘라*/}
            {userInfo?.memberUsername === username && (
                <div
                    className={currentCategory === "saved" ? "current" : ""}
                    onClick={() => {
                        dispatch(selectCategory("saved"));
                    }}
                >
                    <BookmarkSvg />
                    <span>저장됨</span>
                </div>
            )}

            <div
                className={currentCategory === "tagged" ? "current" : ""}
                onClick={() => {
                    dispatch(selectCategory("tagged"));
                }}
            >
                <TagSvg />
                <span>태그됨</span>
            </div>
        </CategoryContainer>
    );
};

export default Category;

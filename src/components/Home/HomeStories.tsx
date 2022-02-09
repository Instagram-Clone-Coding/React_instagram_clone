import React from "react";
import styled from "styled-components";
import Card from "styles/UI/Card";
import Story from "./Story";
import sprite from "assets/Images/sprite.png";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { homeActions } from "app/store/ducks/home/homeSlice";

const DUMMY_STORIES = [
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "안녕하세요안녕하세요",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "Soadfgafme",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "Sohfghme",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "Sojkjme",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "sdfj",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "gkdh",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "erewt",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "rty",
    },
];

const StoriesCard = styled(Card)`
    padding: 16px 0;
    margin-bottom: 24px;
    position: relative;
    .layout {
        height: 84px;
        display: flex;
        align-items: center;
        overflow-y: hidden;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
        .leftArrow,
        .rightArrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            /* z-index: 101; */
            width: 45px;
            height: 45px;
            cursor: pointer;
        }

        .leftArrow {
            background: url(${sprite}) no-repeat -379px -128px;
        }

        .rightArrow {
            right: 0;
            background: url(${sprite}) no-repeat -244px -107px;
        }
    }
`;

const HomeStories = () => {
    const dispatch = useAppDispatch();
    const storiesScrollPosition = useAppSelector(
        (state) => state.home.storiesScrollPosition,
    );

    const toggleArrowHandler = (
        event: React.UIEvent<HTMLUListElement>,
    ): void => {
        const {
            currentTarget: { scrollLeft, clientWidth, scrollWidth },
        } = event;
        if (scrollLeft === 0) {
            dispatch(homeActions.changeStoriesScrollPosition("left"));
        } else if (scrollWidth > scrollLeft + clientWidth) {
            dispatch(homeActions.changeStoriesScrollPosition("center"));
        } else if (scrollWidth === scrollLeft + clientWidth) {
            dispatch(homeActions.changeStoriesScrollPosition("right"));
        }
    };

    const arrowClickHandler = (
        event: React.MouseEvent<HTMLDivElement>,
    ): void => {
        if (event.currentTarget.parentElement) {
            const {
                currentTarget: {
                    className,
                    parentElement,
                    parentElement: { scrollLeft, clientWidth, scrollWidth },
                },
            } = event;
            const move = (scrollWidth - clientWidth + 2) / 3;
            if (className === "leftArrow") {
                parentElement.scroll({
                    left: scrollLeft - move,
                    behavior: "smooth",
                });
            } else if (className === "rightArrow") {
                parentElement.scroll({
                    left: scrollLeft + move,
                    behavior: "smooth",
                });
            }
        }
    };

    return (
        <StoriesCard>
            <ul className="layout" onScroll={toggleArrowHandler}>
                {storiesScrollPosition !== "left" && (
                    <div
                        className="leftArrow"
                        onClick={arrowClickHandler}
                    ></div>
                )}
                {storiesScrollPosition !== "right" && (
                    <div
                        className="rightArrow"
                        onClick={arrowClickHandler}
                    ></div>
                )}
                {DUMMY_STORIES.map((storyObj, index) => (
                    <Story key={index} {...storyObj} />
                ))}
            </ul>
        </StoriesCard>
    );
};

export default HomeStories;

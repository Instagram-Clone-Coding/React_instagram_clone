import React from "react";
import styled from "styled-components";
import sprite from "img/sprite.png";
import { useState } from "react";

const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    flex: 0 1 auto;
    height: 28px;
    min-width: 125px;
    width: 215px;
`;

const SearchIcon = styled.div`
    background: url(${sprite}) no-repeat -553px -84px;
    width: 10px;
    height: 10px;
    margin-right: 6px;
`;

const DefaultSearchBar = styled.div`
    background: #fafafa;

    border: solid 1px rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 3px;
    color: #8e8e8e;
    cursor: text;
    font-size: 14px;
    font-weight: 300;

    display: flex;

    align-items: center;

    padding: 0 12px;
    position: absolute;

    left: 0;
    top: 0;

    text-align: left;
    z-index: 2;

    box-sizing: border-box;
    height: 100%;
    width: 100%;
`;

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <SearchBarContainer>
            {isFocused ? (
                // focuse
                <>
                    <input type="text" />
                </>
            ) : (
                // default
                <DefaultSearchBar>
                    <SearchIcon />
                    <span>검색</span>
                </DefaultSearchBar>
            )}
        </SearchBarContainer>
    );
};

export default SearchBar;

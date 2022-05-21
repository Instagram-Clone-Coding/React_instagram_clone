import { changeSearchUser } from "app/store/ducks/common/commonSlice";
import { searchUser } from "app/store/ducks/common/commonThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import sprite from "assets/Images/sprite.png";
import SearchListItem from "components/Home/SearchListItem";
import useOutsideClick from "hooks/useOutsideClick";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import theme from "styles/theme";

const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    flex: 0 1 auto;
    height: 28px;
    min-width: 125px;
    width: 215px;
    .search-bar {
        padding: 3px 16px;
        border-radius: 8px;
        padding-left: 30px;
    }

    .arrow {
        position: absolute;

        top: 34px;
        width: 14px;
        height: 14px;
        left: 85px;
        right: 0;
        transform: rotate(45deg);
        box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
        background-color: ${theme.color.bg_white};
    }

    .search-list {
        position: absolute;
        transform: translate3d(-94px, 0, 0);
        top: 42px;
        width: 375px;
        min-height: 362px;
        background-color: ${theme.color.bg_white};
        padding-top: 12px;
        overflow-y: scroll;
        border-radius: 10px;
        .no-data-alert {
            display: flex;
            justify-content: center;
            span {
                margin-top: 150px;
                color: ${theme.font.gray};
            }
        }
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 9px;
    left: 15px;
    background: url(${sprite}) no-repeat -553px -84px;
    width: 10px;
    height: 10px;
`;

const SearchBar = () => {
    const ref: React.RefObject<HTMLDivElement> = useRef(null);
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const { searchUserKeyword } = useAppSelector((state) => state.common);
    const searchUsers = useAppSelector((state) => state.common.searchUsers);
    useOutsideClick(ref, setIsFocused);
    const dispatch = useAppDispatch();

    return (
        <SearchBarContainer
            ref={ref}
            onClick={() => {
                setIsFocused(true);
            }}
        >
            <label htmlFor="search">
                <SearchIcon />
            </label>
            <input
                id="search"
                ref={inputRef}
                className="search-bar"
                type="text"
                value={searchUserKeyword}
                onChange={async (e) => {
                    dispatch(changeSearchUser(e.target.value));
                    if (e.target.value !== "") {
                        await dispatch(searchUser({ keyword: e.target.value }));
                    }
                }}
                placeholder="검색"
            />
            {isFocused && (
                <>
                    <div className="arrow" />

                    <div className="search-list">
                        {searchUsers.length > 0 ? (
                            searchUsers.map((user) => (
                                <SearchListItem
                                    key={user.member.id}
                                    {...user}
                                    setIsFocused={setIsFocused}
                                />
                            ))
                        ) : (
                            <div className="no-data-alert">
                                <span>검색 결과가 없습니다.</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </SearchBarContainer>
    );
};

export default SearchBar;

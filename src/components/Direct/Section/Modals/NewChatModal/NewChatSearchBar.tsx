import { changeSearchUser } from "app/store/ducks/common/commonSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import React from "react";
import styled from "styled-components";
import NewChatInviteButton from "./NewChatInviteButton";
import { searchUser } from "app/store/ducks/common/commonThunk";
const NewChatSearchBarContainer = styled.div`
    padding: 8px 16px;

    border-bottom: 1px solid #dbdbdb;
    h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 6px 0;
    }

    .input-container {
        display: flex;
        flex-direction: column;

        .button-container {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            gap: 5px;
        }
        input {
            background: 0 0;
            border: none;
            flex-grow: 1;
            font-size: 14px;
            line-height: 30px;
            overflow: visible;
            padding: 4px 12px;

            &::placeholder {
                color: #dbdbdb;
            }
        }
    }
`;

const NewChatSearchBar = () => {
    const dispatch = useAppDispatch();
    const { selectedNewChatUsers } = useAppSelector((state) => state.direct);
    const { searchUserKeyword } = useAppSelector((state) => state.common);

    return (
        <NewChatSearchBarContainer>
            <h4>받는 사람:</h4>
            <div className="input-container">
                <div className="button-container">
                    {selectedNewChatUsers.map((username) => (
                        <NewChatInviteButton username={username} />
                    ))}
                </div>

                <input
                    type="text"
                    placeholder={"검색..."}
                    value={searchUserKeyword}
                    onChange={async (e) => {
                        dispatch(changeSearchUser(e.target.value));
                        await dispatch(searchUser({ keyword: e.target.value }));
                    }}
                />
            </div>
        </NewChatSearchBarContainer>
    );
};

export default NewChatSearchBar;

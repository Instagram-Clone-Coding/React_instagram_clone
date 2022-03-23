import React from "react";
import styled from "styled-components";
import { useAppSelector } from "app/store/Hooks";
import NewChatInviteButton from "./NewChatInviteButton";

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
        align-items: center;
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
    const { selectedNewChatUser } = useAppSelector((state) => state.direct);

    return (
        <NewChatSearchBarContainer>
            <h4>받는 사람:</h4>
            <div className="input-container">
                {selectedNewChatUser && <NewChatInviteButton />}
                <input type="text" placeholder={"검색..."} />
            </div>
        </NewChatSearchBarContainer>
    );
};

export default NewChatSearchBar;

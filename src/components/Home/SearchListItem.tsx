import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styles/theme";

const Container = styled(Link)`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 60px;
    padding: 8px 16px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        background-color: ${theme.color.bg_gray};
    }

    .profile-image {
        width: 44px;
        height: 44px;
        border-radius: 50%;
    }

    .profile-contents {
        .username {
            font-weight: 600;
        }
        .name-container {
            span {
                color: ${theme.font.gray};
            }
            .name {
            }
            .follow-info {
            }
        }
    }
`;

interface SearchListItemProps extends Common.searchUserType {
    setIsFocused: Dispatch<SetStateAction<boolean>>;
}

const SearchListItem = ({
    member,
    followingMemberFollow,
    setIsFocused,
}: SearchListItemProps) => {
    return (
        <Container
            to={`/profile/${member.username}`}
            onClick={() => {
                setIsFocused(false);
            }}
        >
            <img
                src={member.image.imageUrl}
                alt="member"
                className="profile-image"
            />
            <div className="profile-contents">
                <span className="username">{member.username}</span>
                <div className="name-container">
                    <span className="name">{member.name}</span>
                    {followingMemberFollow && (
                        <span className="follow-info">
                            •{followingMemberFollow[0].memberUsername} 외{" "}
                            {followingMemberFollow.length - 1}명이 팔로우합니다
                        </span>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default SearchListItem;

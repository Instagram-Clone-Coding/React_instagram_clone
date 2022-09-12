import React from "react";
import styled from "styled-components";

const StyledSearchListItemLayout = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 60px;
    padding: 8px 16px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        background-color: ${(props) => props.theme.color.bg_gray};
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
                color: ${(props) => props.theme.font.gray};
            }
            .name {
            }
            .follow-info {
            }
        }
    }
`;

interface SearchUserLayoutProps {
    member?: CommonType.memberType;
    followingMemberFollow?: { memberUsername: string }[];
    name?: string;
    postCount?: number;
}

const SearchListItemLayout = ({
    member,
    followingMemberFollow,
    name,
    postCount,
}: SearchUserLayoutProps) => {
    return (
        <StyledSearchListItemLayout>
            {member ? (
                <>
                    <img
                        src={member.image.imageUrl}
                        alt="member"
                        className="profile-image"
                    />
                    <div className="profile-contents">
                        <span className="username">{member.username}</span>
                        <div className="name-container">
                            <span className="name">{member.name}</span>
                            {followingMemberFollow &&
                                followingMemberFollow.length > 0 && (
                                    <span className="follow-info">
                                        •
                                        {
                                            followingMemberFollow[0]
                                                .memberUsername
                                        }{" "}
                                        외 {followingMemberFollow.length - 1}
                                        명이 팔로우합니다
                                    </span>
                                )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <img
                        src={
                            "https://user-images.githubusercontent.com/69495129/178100078-a0570a9c-99c8-4d67-b4d9-e589df0a4ab9.png"
                        }
                        alt="hashtag"
                        className="profile-image"
                    />
                    <div className="profile-contents">
                        {name && <span className="username">#{name}</span>}
                        <div className="name-container">
                            {
                                <span className="follow-info">
                                    게시물 {postCount}
                                </span>
                            }
                        </div>
                    </div>
                </>
            )}
        </StyledSearchListItemLayout>
    );
};

export default SearchListItemLayout;

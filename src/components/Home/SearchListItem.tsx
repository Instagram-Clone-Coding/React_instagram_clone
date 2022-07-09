import { getSearchRecord } from "app/store/ducks/common/commonThunk";
import { useAppDispatch } from "app/store/Hooks";
import CloseSVG from "assets/Svgs/CloseSVG";
import { authorizedCustomAxios } from "customAxios";
import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styles/theme";

const Container = styled.div`
    display: flex;
    width: 100%;
    a {
        display: flex;
        width: 328px;
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
    }

    .close-button {
        flex: 1;
    }
`;

interface SearchListItemProps extends Common.searchResultType {
    setIsFocused: Dispatch<SetStateAction<boolean>>;
    button?: boolean;
}

const SearchListItem = ({
    dtype,
    member,
    followingMemberFollow,
    setIsFocused,
    button,
    name,
    postCount,
}: SearchListItemProps) => {
    const dispatch = useAppDispatch();

    // 공통으로 사용하는 config
    const config = {
        params: {
            entityName: member?.username || `#${name}`,
            entityType: dtype,
        },
    };

    // 사람을 클릭하여 그 사람 프로필로 이동 혹은 해시태그 클릭
    const itemClickHandler = async () => {
        // 조회수 증가
        await authorizedCustomAxios.post("/topsearch/mark", null, config);
        // 모달끄기
        setIsFocused(false);
    };

    // 사람 한명을 지우는겁니다.
    const removeUserHandler = async () => {
        await authorizedCustomAxios.delete("/topsearch/recent", config);
        await dispatch(getSearchRecord());
    };

    return (
        <Container>
            {dtype === "MEMBER" ? (
                <Link
                    to={`/profile/${member?.username}`}
                    onClick={itemClickHandler}
                >
                    <img
                        src={member?.image.imageUrl}
                        alt="member"
                        className="profile-image"
                    />
                    <div className="profile-contents">
                        <span className="username">{member?.username}</span>
                        <div className="name-container">
                            <span className="name">{member?.name}</span>
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
                </Link>
            ) : (
                <Link to={`/hashtag/${name}`} onClick={itemClickHandler}>
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
                            <span className="name">{member?.name}</span>
                            {
                                <span className="follow-info">
                                    게시물 {postCount}
                                </span>
                            }
                        </div>
                    </div>
                </Link>
            )}
            {button && (
                <button onClick={removeUserHandler} className="close-button">
                    <CloseSVG color={theme.font.gray} size={"18"} />
                </button>
            )}
        </Container>
    );
};

export default SearchListItem;

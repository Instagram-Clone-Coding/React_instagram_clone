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
    a {
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
    }
`;

interface SearchListItemProps extends Common.searchUserType {
    setIsFocused: Dispatch<SetStateAction<boolean>>;
    button?: boolean;
}

const SearchListItem = ({
    member,
    followingMemberFollow,
    setIsFocused,
    button,
}: SearchListItemProps) => {
    const dispatch = useAppDispatch();

    // 공통으로 사용하는 config
    const config = {
        params: { entityName: member.username, entityType: "MEMBER" },
    };

    // 사람을 클릭하여 그 사람 프로필로 이동
    const userClickHandler = async () => {
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
            <Link to={`/profile/${member.username}`} onClick={userClickHandler}>
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
                                {followingMemberFollow.length - 1}명이
                                팔로우합니다
                            </span>
                        )}
                    </div>
                </div>
            </Link>
            {button && (
                <button onClick={removeUserHandler}>
                    <CloseSVG color={theme.font.gray} size={"18"} />
                </button>
            )}
        </Container>
    );
};

export default SearchListItem;

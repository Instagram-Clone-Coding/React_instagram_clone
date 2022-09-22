import { getSearchRecord } from "app/store/ducks/common/commonThunk";
import { useAppDispatch } from "app/store/Hooks";
import CloseSVG from "assets/Svgs/CloseSVG";
import SearchListItemLayout from "components/Home/SearchListItemLayout";
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
        cursor: pointer;
        text-decoration: none;
    }
    .close-button {
        flex: 1;
    }
`;

interface SearchListItemProps extends CommonType.searchResultType {
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
            {dtype === "MEMBER" && member ? (
                <Link
                    to={`/profile/${member.username}`}
                    onClick={itemClickHandler}
                >
                    <SearchListItemLayout
                        member={member}
                        followingMemberFollow={followingMemberFollow}
                    />
                </Link>
            ) : (
                <Link to={`/hashtag/${name}`} onClick={itemClickHandler}>
                    <SearchListItemLayout name={name} postCount={postCount} />
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

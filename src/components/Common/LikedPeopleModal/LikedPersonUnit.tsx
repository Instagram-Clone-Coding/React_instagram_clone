import StoryCircle from "components/Common/StoryCircle";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import type { LikedPersonType } from "components/Common/LikedPeopleModal/LikedPeopleModal";
import theme from "styles/theme";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import Loading from "components/Common/Loading";
import { authorizedCustomAxios } from "customAxios";
import { authAction } from "app/store/ducks/auth/authSlice";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";

const StyledLikedPersonUnit = styled.div`
    padding: 8px 16px;
    display: flex;
    align-items: center;
    height: 60px;
    & > div:first-child {
        margin-right: 12px;
    }
    & > div:nth-child(2) {
        flex: 1;
        #username {
            font-weight: ${(props) => props.theme.font.bold};
        }
    }
    & > button {
        margin-left: 8px;
    }
`;

const FollowBtn = styled(Button)<{ isSmall: boolean; isFollowing?: boolean }>`
    width: ${(props) => (props.isSmall ? 64 : 88)}px;
    border: 1px solid
        ${(props) => (props.isFollowing ? props.theme.color.bd_gray : "none")};
`;

interface LikedPersonUnitProps {
    personObj: LikedPersonType;
    isSmall: boolean;
    // isFourthFromLast:boolean;
}

const LikedPersonUnit = ({ personObj, isSmall }: LikedPersonUnitProps) => {
    const [isFollowing, setIsFollowing] = useState(personObj.following);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const myUsername = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );
    const dispatch = useAppDispatch();

    const followBtnClickHandler = async () => {
        try {
            setIsFollowLoading(true);
            const {
                data: { data },
            } = isFollowing
                ? await authorizedCustomAxios.delete(
                      `/${personObj.member.username}/follow`,
                  )
                : await authorizedCustomAxios.post(
                      `/${personObj.member.username}/follow`,
                  );
            setIsFollowing((prev) => !prev);
            return data;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
        } finally {
            setIsFollowLoading(false);
        }
    };

    return (
        <StyledLikedPersonUnit className="likedPerson">
            <StoryCircle
                type={personObj.member.hasStory ? "unread" : "read"}
                avatarUrl={personObj.member.image.imageUrl}
                username={personObj.member.username}
                scale={54 / 64}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}} // hoverModal
            />
            <div>
                <div id="username">{personObj.member.username}</div>
                <div>{personObj.member.name}</div>
            </div>
            {personObj.member.username !== myUsername && (
                <FollowBtn
                    bgColor={isFollowing ? theme.color.bg_white : undefined}
                    color={isFollowing ? theme.font.default_black : undefined}
                    isSmall={isSmall}
                    isFollowing={isFollowing}
                    onClick={followBtnClickHandler}
                    disabled={isFollowLoading}
                >
                    {isFollowLoading ? (
                        <Loading size={14} isInButton={!isFollowing} />
                    ) : isFollowing ? (
                        "팔로잉"
                    ) : (
                        "팔로우"
                    )}
                </FollowBtn>
            )}
        </StyledLikedPersonUnit>
    );
};

export default LikedPersonUnit;

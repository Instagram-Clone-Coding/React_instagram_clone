import StoryCircle from "components/Common/StoryCircle";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import type { LikedPersonType } from "components/Common/LikedPeopleModal";
import theme from "styles/theme";
import { useAppSelector } from "app/store/Hooks";

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

const FollowBtn = styled(Button)<{ isSmall: boolean }>`
    width: ${(props) => (props.isSmall ? 64 : 88)}px;
`;

interface LikedPersonUnitProps {
    personObj: LikedPersonType;
    isSmall: boolean;
}

const LikedPersonUnit = ({ personObj, isSmall }: LikedPersonUnitProps) => {
    const [isFollowing, setIsFollowing] = useState(personObj.following);
    const myUsername = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );

    return (
        <StyledLikedPersonUnit
            className="likedPerson"
            key={personObj.member.id}
        >
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
                    bgColor={
                        personObj.following ? theme.color.bg_white : undefined
                    }
                    isSmall={isSmall}
                >
                    {isFollowing ? "팔로잉" : "팔로우"}
                </FollowBtn>
            )}
        </StyledLikedPersonUnit>
    );
};

export default LikedPersonUnit;

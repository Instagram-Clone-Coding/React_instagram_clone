import {
    hashtagFollow,
    hashtagUnfollow,
} from "app/store/ducks/profile/profileThunk";
import { useAppDispatch } from "app/store/Hooks";
import StoryCircle from "components/Common/StoryCircle";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "styles/UI/Button";

const Container = styled.section`
    display: flex;
    align-items: center;
    margin: 1.875rem 0 2.75rem 0;

    .description {
        margin-left: 3.125rem;
        flex: 1;
        display: flex;
        flex-direction: column;

        .name {
            font-size: 1.75rem;
            font-weight: 300;
            padding-bottom: 0.75rem;
        }

        .posts {
            font-size: 1rem;
            font-weight: 600;
            padding-bottom: 1rem;
        }
    }
`;

export default function ProfileHeader({
    resource,
}: {
    resource: {
        profile: {
            read(): Profile.HashTagProfileType;
        };
    };
}) {
    const profileData = resource.profile.read(); // 최초 한번만 호출
    const [isFollowing, setIsFollowing] = useState(profileData.following);

    const dispatch = useAppDispatch();
    const followHashtagClickHandler = () => {
        dispatch(hashtagFollow({ hashtag: `#${profileData.name}` })) //
            .then(() => setIsFollowing(!isFollowing));
    };

    const unfollowingClickHandler = () => {
        dispatch(hashtagUnfollow({ hashtag: `#${profileData.name}` })) //
            .then(() => setIsFollowing(!isFollowing));
    };

    const theme = useTheme();

    return (
        <Container>
            <StoryCircle
                type="read"
                avatarUrl={profileData.image.imageUrl}
                username={profileData.name}
                scale={2.5}
            />
            <div className="description">
                <div className="name">#{profileData.name}</div>
                <div className="posts">게시물 {profileData.postCount}</div>
                {isFollowing ? (
                    <Button
                        bgColor={theme.color.bg_gray}
                        color="black"
                        style={{ border: `1px solid ${theme.color.bd_gray}` }}
                        onClick={unfollowingClickHandler}
                    >
                        팔로우
                    </Button>
                ) : (
                    <Button onClick={followHashtagClickHandler}>팔로우</Button>
                )}
            </div>
        </Container>
    );
}

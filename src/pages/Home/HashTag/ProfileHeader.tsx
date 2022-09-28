import { hashtagFollow } from "app/store/ducks/profile/profileThunk";
import { useAppDispatch } from "app/store/Hooks";
import StoryCircle from "components/Common/StoryCircle";
import styled from "styled-components";
import Button from "styles/UI/Button";
import Card from "styles/UI/Card";

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
    const profileData = resource.profile.read();

    const dispatch = useAppDispatch();
    const followHashtagClickHandler = () => {
        dispatch(hashtagFollow({ hashtag: `#${profileData.name}` }));
    };

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
                {profileData.following ? (
                    <Card>팔로잉</Card>
                ) : (
                    <Button onClick={followHashtagClickHandler}>팔로우</Button>
                )}
            </div>
        </Container>
    );
}

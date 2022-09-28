import fetchData from "pages/Home/HashTag/fetch";
import HashTagArticle from "pages/Home/HashTag/HashTagArticle";
import ProfileHeader from "pages/Home/HashTag/ProfileHeader";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;

    .content {
        max-width: 935px;
        display: flex;
        flex-direction: column;
        width: calc(100% - 40px);
    }
`;

export default function HashtagProfile() {
    const { query } = useParams<{ query: string }>();

    return (
        <Container>
            <div className="content">
                <Suspense fallback={<div>loading...</div>}>
                    <ProfileHeader resource={fetchData(query)} />
                    {/* <HashTagArticle resource={fetchData(query)} /> */}
                </Suspense>
            </div>
        </Container>
    );
}

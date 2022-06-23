import React, { useEffect } from "react";
import styled from "styled-components";

import ProfileHeader from "components/Profile/Header/ProfileHeader";
import Category from "components/Profile/Category";
import Article from "components/Profile/Article/Article";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import {
    getPosts,
    lookUpUserProfile,
} from "app/store/ducks/profile/profileThunk";
import { resetExtraPostPage } from "app/store/ducks/profile/profileSlice";

const Layout = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    background-color: #fafafa;

    .container {
        flex-grow: 1;
        margin: 0 auto 30px;
        max-width: 935px;
    }

    @media (min-width: 736px) {
        .container {
            padding: 30px 20px 0;
            width: calc(100% - 40px);
            box-sizing: content-box;
        }
    }
`;

const Profile = () => {
    const { username } = useParams<{ username: string }>();
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(
        (state) => state.profile.currentCategory,
    );

    // mount 가 되면 받은 username 으로 이 유저의 모든 프로필 정보를 호출합니다.
    useEffect(() => {
        dispatch(lookUpUserProfile({ username }));
    }, [dispatch, username]);

    // 게시글들을 가져와 줍니다.
    useEffect(() => {
        const getPost = async () => {
            await dispatch(getPosts({ username: username }));
        };
        dispatch(resetExtraPostPage());
        getPost();
    }, [currentCategory, dispatch, username]);

    return (
        <Layout>
            <div className="container">
                <ProfileHeader />
                <Category />
                <Article />
            </div>
        </Layout>
    );
};

export default Profile;

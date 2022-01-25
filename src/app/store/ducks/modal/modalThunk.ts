import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";

export const getMiniProfile = createAsyncThunk<
    ModalType.MiniProfileProps,
    { token: string; memberUsername: string }
>("modal/getMiniProfile", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: { data },
        } = await axios.get(
            `${BASE_URL}/accounts/${payload.memberUsername}/mini`,
            config,
        );
        // blocked: false
        // blocking: false
        // follower: false
        // following: true
        // followingMemberFollow: "dlwlrma2"
        // me: false // 나인 경우 아래 버튼 링크가 "프로필 편짐"으로 떠야 함
        // memberFollowersCount: 2
        // memberFollowingsCount: 0
        // memberImage: {imageUrl: 'https://bluetifulc-spring-bucket.s3.ap-northeast-2.amazonaws.com/member/base-UUID_base.PNG', imageType: 'PNG', imageName: 'base', imageUUID: 'base-UUID'}
        // memberName: "이지금"
        // memberPosts: (3) [{…}, {…}, {…}]
        // memberPostsCount: 15
        // memberUsername: "dlwlrma1"
        // memberWebsite: null
        console.log(data);
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

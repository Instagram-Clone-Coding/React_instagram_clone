import styled from "styled-components";
import { useLocation } from "react-router-dom";
import FooterRow from "components/Common/Footer/FooterRow";

const Links = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    width: 100%;
`;

const InstagramRelateLink = [
    { text: "Meta", url: "https://about.facebook.com/meta" },
    { text: "소개", url: "https://about.instagram.com/" },
    { text: "블로그", url: "https://about.instagram.com/blog" },
    {
        text: "채용 정보",
        url: "https://about.instagram.com/about-us/careers",
    },
    { text: "도움말", url: "https://help.instagram.com/" },
    { text: "API", url: "https://developers.facebook.com/docs/instagram" },
    {
        text: "개인정보처리방침",
        url: "https://help.instagram.com/519522125107875",
    },
    { text: "약관", url: "https://help.instagram.com/581066165581870" },
    {
        text: "인기 계정",
        url: "https://www.instagram.com/directory/profiles/",
    },
    {
        text: "해시태그",
        url: "https://www.instagram.com/directory/hashtags/",
    },
    {
        text: "위치",
        url: "https://www.instagram.com/explore/locations/",
    },
    {
        text: "Instagram Lite",
        url: "https://www.instagram.com/web/lite/",
    },
];

const SearchResult = [
    { text: "뷰티", url: "https://www.instagram.com/topics/beauty/" },
    {
        text: "댄스",
        url: "https://www.instagram.com/topics/dance-and-performance/",
    },
    { text: "피트니스", url: "https://www.instagram.com/topics/fitness/" },
    { text: "식음료", url: "https://www.instagram.com/topics/food-and-drink/" },
    {
        text: "집 및 정원",
        url: "https://www.instagram.com/topics/home-and-garden/",
    },
    { text: "음악", url: "https://www.instagram.com/topics/music/" },
    {
        text: "시각 예술",
        url: "https://www.instagram.com/topics/visual-arts/",
    },
];

function InstagramLinks() {
    const { pathname } = useLocation();

    return (
        <Links>
            <FooterRow content={InstagramRelateLink} />
            {pathname === "/" && <FooterRow content={SearchResult} />}
        </Links>
    );
}

export default InstagramLinks;

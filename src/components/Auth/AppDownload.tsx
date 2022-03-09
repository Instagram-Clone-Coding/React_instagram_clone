import styled from "styled-components";
import apple from "assets/Images/appStore.png";
import android from "assets/Images/googlePlay.png";

const DownloadStyle = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    & > p {
        margin: 10px 20px;
    }
    .appImage {
        display: flex;
        justify-content: center;
        margin: 10px 0;
        & > a {
            margin-right: 8px;
        }
        & > a:last-child {
            margin-right: 0;
        }
        & > a > img {
            height: 40px;
        }
    }
`;

const props = [
    {
        url: "https://apps.apple.com/app/instagram/id389801252?vt=lo",
        src: apple,
        alt: "애플스토어에서 인스타그램 검색한 결과",
    },
    {
        url: "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=F86341FF-8B95-459C-BC37-EC07B51F263E&utm_content=lo&utm_medium=badge",
        src: android,
        alt: "구글플레이스토어에서 인스타그램 검색한 결과",
    },
];

export default function Appdownload() {
    return (
        <DownloadStyle>
            <p>앱을 다운로드하세요.</p>
            <div className="appImage">
                {props.map((downloadData, idx) => {
                    return (
                        <a href={downloadData.url} key={idx}>
                            <img
                                src={downloadData.src}
                                alt={downloadData.alt}
                            />
                        </a>
                    );
                })}
            </div>
        </DownloadStyle>
    );
}

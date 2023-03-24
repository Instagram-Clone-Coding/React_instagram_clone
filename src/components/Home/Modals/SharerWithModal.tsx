import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";
import ModalHeader from "./ModalHeader";
import direct from "assets/Images/direct.png";
import sprite3 from "assets/Images/sprite3.png";
import useCopy from "hooks/useCopy";
import { useAppSelector } from "app/store/Hooks";

const ShareWithModalInner = styled.div`
    .shareWithModal-options {
        padding-top: 8px;
        font-weight: ${(props) => props.theme.font.bold};
        & > div,
        & > a {
            padding: 8px 16px;
            height: 48px;
            width: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            text-decoration: none;
            & > div:first-child {
                width: 32px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 12px;
            }
        }
        & > div:hover {
            background-color: ${(props) => props.theme.color.bg_gray};
        }
        & > .shareWithModal-direct {
            & > div:first-child > div {
                background: url(${direct}) no-repeat;
                width: 20px;
                height: 20px;
            }
        }
        & > .shareWithModal-facebook {
            & > div:first-child > div {
                background: url(${sprite3}) no-repeat -520px -75px;
                background-size: 569px 521px;
                width: 24px;
                height: 24px;
            }
        }
        & > .shareWithModal-messenger {
            & > div:first-child > div {
                background: url(${sprite3}) no-repeat -291px -400px;
                background-size: 569px 521px;
                width: 23px;
                height: 24px;
            }
        }
        & > .shareWithModal-twitter {
            & > div:first-child > div {
                background: url(${sprite3}) no-repeat -316px -402px;
                background-size: 569px 521px;
                width: 24px;
                height: 21px;
            }
        }
        & > .shareWithModal-email {
            & > div:first-child > div {
                background: url(${sprite3}) no-repeat -50px -498px;
                background-size: 569px 521px;
                width: 24px;
                height: 21px;
            }
        }
        & > .shareWithModal-link {
            & > div:first-child > div {
                background: url(${sprite3}) no-repeat -520px -452px;
                background-size: 569px 521px;
                width: 24px;
                height: 19px;
            }
        }
    }
`;

interface ShareWithModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    // username: string;
}

const DUMMY_BASE_URL = "https://www.instagram.com"; // 원래 root url: window.location.href

// 위 두 DUMMY 데이터로 공유 기능을 임시 구현하였습니다.
// 참고 url: https://developers.facebook.com/docs/plugins/share-button?locale=ko_KR

const ShareWithModal = ({ onModalOn, onModalOff }: ShareWithModalProps) => {
    const { memberUsername, postId } = useAppSelector(({ modal }) => modal);
    const copyHandler = useCopy(DUMMY_BASE_URL + "/p/" + postId);

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <ShareWithModalInner>
                <ModalHeader title="공유 대상..." onModalOff={onModalOff} />
                <div className="shareWithModal-options">
                    <div className="shareWithModal-direct" onClick={() => {}}>
                        {/* 공유 모달 열기 */}
                        <div>
                            <div></div>
                        </div>
                        <div>Direct에 공유</div>
                    </div>
                    <a
                        className="shareWithModal-facebook"
                        href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${
                            DUMMY_BASE_URL + "/p/" + postId
                        }&display=popup&ref=plugin&src=share_button`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div>
                            <div></div>
                        </div>
                        <div>Facebook에 공유</div>
                    </a>
                    <a
                        className="shareWithModal-messenger"
                        href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${
                            DUMMY_BASE_URL + "/p/" + postId
                        }&display=popup&ref=plugin&src=share_button`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {/* 일단 messenger는 스킵 */}
                        <div>
                            <div></div>
                        </div>
                        <div>Messenger에 공유</div>
                    </a>
                    <a
                        className="shareWithModal-twitter"
                        href={`https://twitter.com/share?text=@님의 이 instagram 게시물 보기&url=${
                            DUMMY_BASE_URL + "/p/" + postId
                        }%3Futm_source%3Dig_web_button_share_sheet
                    `}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div>
                            <div></div>
                        </div>
                        <div>Twitter에 공유</div>
                    </a>
                    <a
                        className="shareWithModal-email"
                        href={`mailto:?subject=@${memberUsername}님의 이 인스타그램 게시물 보기&body=@${memberUsername}님의 이 인스타그램 게시물 보기 %20${
                            DUMMY_BASE_URL + "/p/" + postId
                        }%3Futm_source%3Dig_web_button_share_sheet`}
                        target="_top"
                    >
                        <div>
                            <div></div>
                        </div>
                        <div>이메일로 공유</div>
                    </a>
                    <div className="shareWithModal-link" onClick={copyHandler}>
                        <div>
                            <div></div>
                        </div>
                        <div>링크 복사</div>
                    </div>
                    <div className="shareWithModal-cancel" onClick={onModalOff}>
                        <div></div>
                        <div>취소</div>
                    </div>
                </div>
            </ShareWithModalInner>
        </ModalCard>
    );
};
export default ShareWithModal;

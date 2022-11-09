import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { getNewImageSizeBasedOnOriginal } from "components/Common/Header/Upload/Edit/Edit";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React, {
    ChangeEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import {
    getRatioCalculatedBoxWidth,
    getRatioCalculatedBoxHeight,
} from "components/Common/Header/Upload/Cut/CutImgUnit";
import { ReactComponent as SmileFace } from "assets/Svgs/smileFace.svg";
import { ReactComponent as DownV } from "assets/Svgs/downV.svg";
import { ReactComponent as LocationIcon } from "assets/Svgs/location.svg";
import Picker, { IEmojiData } from "emoji-picker-react";
import UploadImgArrowAndDots from "components/Common/Header/UploadImgArrowAndDots";
import sprite from "assets/Images/sprite.png";
import { searchUser } from "app/store/ducks/common/commonThunk";
import SearchListItemLayout from "components/Home/SearchListItemLayout";
import { resetSearch } from "app/store/ducks/common/commonSlice";
import { ReactComponent as Close } from "assets/Svgs/close.svg";
import Loading from "components/Common/Loading";
import { authorizedCustomAxios } from "customAxios";
import WarningMaxUploadNumberModal from "components/Common/Header/Upload/WarningMaxUploadNumberModal";

const StyledContent = styled.div`
    display: flex;
    width: 100%;
    & > .upload__contentImg {
        background-color: ${(props) => props.theme.color.bg_gray};
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        & > .contentImg__relative {
            position: relative;
            & > .hashtag {
                position: absolute;
                & * {
                    color: white;
                    font-size: 14px;
                }
                & > .hashtag__relative {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    & > .pointer {
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        transform: rotate(45deg);
                        background-color: black;
                    }
                    & > .content {
                        background: black;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 12px;
                        position: absolute;
                        top: 7px;
                        border-radius: 8px;
                        & > .username {
                            font-weight: ${(props) => props.theme.font.bold};
                            margin: 0 4px;
                        }
                        & > .closeButton {
                            width: 16px;
                            height: 16px;
                            font-weight: normal;
                        }
                    }
                }
            }
            & > img {
                cursor: crosshair;
                width: 100%;
                height: 100%;
            }
            & > .searchBar {
                position: absolute;
                z-index: 1000;
                & > .pointer {
                    box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
                    height: 14px;
                    width: 14px;
                    background-color: white;
                    transform: translateX(-5px) rotate(45deg);
                }
                & > .modal {
                    box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
                    width: 338px;
                    height: 226px;
                    background-color: white;
                    position: relative;
                    left: -23px;
                    top: -7px;
                    border-radius: 6px;
                    & > * {
                        width: 100%;
                    }
                    & > .modal__header {
                        display: flex;
                        align-items: center;
                        position: relative;
                        padding: 10px 8px;
                        height: 46px;
                        border-bottom: 1px solid
                            ${(props) => props.theme.color.bd_gray};
                        & > h4 {
                            padding: 4px 12px;
                            font-size: 16px;
                            font-weight: ${(props) => props.theme.font.bold};
                        }
                        & > input {
                            background-color: transparent;
                            border: none;
                            flex: 1;
                            padding: 4px 12px 4px 0px;
                            height: 28px;
                        }
                        & > span {
                            position: absolute;
                            right: 12px;
                            background-image: url(${sprite});
                            background-repeat: no-repeat;
                            background-position: -500px -196px;
                            height: 20px;
                            width: 20px;
                        }
                    }
                    & > .modal__searched {
                        width: 100%;
                        height: 180px;
                        overflow-y: auto;
                        & > .loadingLayout {
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
    & > .upload__contents {
        border-left: 1px solid ${(props) => props.theme.color.bd_gray};
        width: 340px;
        min-width: 340px;
        max-width: 340px;
        overflow-y: auto;
        & > .upload__contentsScroll {
            & > .textareaBox {
                & > .textarea__header {
                    margin: 18px 16px 14px 16px;
                    display: flex;
                    align-items: center;
                    img {
                        width: 28px;
                        height: 28px;
                        margin-right: 12px;
                    }
                    div {
                        font-weight: ${(props) => props.theme.font.bold};
                        font-size: 16px;
                    }
                }
                & > textarea {
                    border: none;
                    overflow: auto;
                    outline: none;
                    -webkit-box-shadow: none;
                    -moz-box-shadow: none;
                    box-shadow: none;
                    resize: none; /*remove the resize handle on the bottom right*/
                    width: 100%;
                    height: 168px;
                    padding: 0 16px;
                    font-size: 16px;
                    background: transparent;
                }
                & > .textarea__bottom {
                    display: flex;
                    justify-content: space-between;
                    height: 30px;
                    padding: 4px 16px 4px 8px;
                    position: relative;
                    .emoji-picker-react {
                        position: absolute;
                        left: -300px;
                        top: -200px;
                        width: 300px !important;
                        height: 400px;
                        @media (max-width: 800px) {
                            top: -100px;
                            height: 200px;
                        }
                    }
                    & > button {
                        color: #c7c7c7;
                        font-size: 12px;
                        font-weight: normal;
                        &:hover {
                            color: black;
                        }
                    }
                    & > svg {
                        color: ${(props) => props.theme.font.gray};
                        cursor: pointer;
                    }
                }
            }
            & > .upload__textareaSearchBar {
                border-top: 1px solid ${(props) => props.theme.color.bd_gray};
                border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};
                height: 200px;
                overflow-y: auto;
                & > .loadingLayout {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                & > .searchedUser,
                & > .searchedHashtag {
                    border-bottom: 1px solid
                        ${(props) => props.theme.color.bd_gray};
                    height: 50px;
                    cursor: pointer;
                    display: flex;
                    &:hover {
                        background-color: ${(props) =>
                            props.theme.color.bg_gray};
                    }
                }
                & > .searchedHashtag {
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 4px 16px;
                    & > #name {
                        font-weight: ${(props) => props.theme.font.bold};
                    }
                    & > #count {
                        font-size: 16px;
                        min-height: 24px;
                        line-height: 24px;
                    }
                }
                & > .searchedUser {
                    padding: 10px 16px;
                    align-items: center;
                    & > img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    & > div {
                        & > span {
                            font-weight: ${(props) => props.theme.font.bold};
                        }
                        & > div {
                            color: ${(props) => props.theme.font.gray};
                        }
                    }
                }
            }
            & > .upload__contentOption {
                width: 100%;
                border-top: 1px solid ${(props) => props.theme.color.bd_gray};
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                min-height: 44px;
                cursor: pointer;
                & * {
                    font-size: 16px;
                }
                & > .header,
                & > .activated {
                    width: 100%;
                    padding: 14px 16px;
                }
                & > .header {
                    padding: 14px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    & > span {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        & > svg {
                            transform: rotate(180deg);
                            width: 16px;
                            height: 16px;
                        }
                        &.bold {
                            font-weight: ${(props) => props.theme.font.bold};
                        }
                        &.reverse {
                            transform: rotate(180deg);
                        }
                    }
                }
                &.location > .header {
                    & > input {
                        border: none;
                        background-color: transparent;
                    }
                    & > span {
                        & > svg {
                            transform: none;
                        }
                    }
                }
                & > .activated {
                    padding-top: 0;
                    & > .smallFont {
                        font-size: 12px;
                        color: ${(props) => props.theme.font.gray};
                    }

                    &.accessOption > div {
                        height: 44px;
                        margin: 12px 0 16px 0;
                        display: flex;
                        align-items: center;
                        & > .imageWrapper,
                        & > input {
                            height: 44px;
                            &:focus {
                                border: 1px solid #a8a8a8;
                            }
                            &::placeholder {
                                color: #c7c7c7;
                            }
                        }
                        & > .imageWrapper {
                            width: 44px;
                            height: 44px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        & > input {
                            margin-left: 8px;
                            width: 255px;
                            background-color: transparent;
                            border-radius: 6px;
                            font-size: 14px;
                            padding: 4px 12px;
                        }
                    }
                    &.advanced > div {
                        &.toggleArea {
                            height: 28px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            & > .toggle {
                                width: 44px;
                                height: 100%;
                                background-color: ${(props) =>
                                    props.theme.font.gray};
                                border-radius: 14px;
                                display: flex;
                                align-items: center;
                                padding: 0 3px;
                                transition: background-color 0.5s;
                                & > div {
                                    transition: transform 0.5s;
                                    width: 22px;
                                    height: 22px;
                                    background-color: white;
                                    border-radius: 50%;
                                }
                                &.on {
                                    background-color: ${(props) =>
                                        props.theme.color.blue};
                                    & > div {
                                        transform: translateX(15px);
                                    }
                                }
                            }
                        }
                        &.smallFont {
                            padding: 12px 0;
                        }
                    }
                }
            }
            & > hr {
                width: 100%;
                margin: 0;
                border: 0;
                background-color: ${(props) => props.theme.color.bd_gray};
                height: 1px;
            }
        }
    }
`;

interface MentionResponseType extends AxiosType.ResponseType {
    data: CommonType.memberType[];
}
interface SearchedHashtagType {
    name: string;
    count: number;
}
interface HashtagResponseType extends AxiosType.ResponseType {
    data: SearchedHashtagType[];
}
interface ContentProps {
    currentWidth: number;
}

function findFirstDifferenceIndexBetweenTwoStrings(
    prev: string,
    current: string,
) {
    var i = 0;
    if (prev === current) return -1;
    while (prev[i] === current[i]) i++;
    return prev.length > current.length ? i - 1 : i; // 타이핑한게 텍스트를 지운 거였다면 -1
}

const minWidthForContent = (currentWidth: number) =>
    Math.max(currentWidth, 350);

const Content = ({ currentWidth }: ContentProps) => {
    const dispatch = useAppDispatch();
    const files = useAppSelector((state) => state.upload.files);
    const currentIndex = useAppSelector((state) => state.upload.currentIndex);
    const ratioMode = useAppSelector((state) => state.upload.ratioMode);
    const textareaValue = useAppSelector((state) => state.upload.textareaValue);
    const isLikesAndViewsHidden = useAppSelector(
        (state) => state.upload.isLikesAndViewsHidden,
    );
    const isCommentBlocked = useAppSelector(
        (state) => state.upload.isCommentBlocked,
    );
    const userInfo = useAppSelector((state) => state.auth.userInfo);
    const [searchedImageTagUsers, setSearchedImageTagUsers] = useState<
        CommonType.memberType[]
    >([]);
    const [isImageTagUserSearchLoading, setIsImageTagUserSearchLoading] =
        useState(false);
    const [textareaSearchType, setTextareaSearchType] = useState<
        "mention" | "hashtag"
    >("mention");
    const [searchedUsers, setSearchedUsers] = useState<CommonType.memberType[]>(
        [],
    );
    const [searchedHashtags, setSearchedHashtags] = useState<
        SearchedHashtagType[]
    >([]);
    const [isTextareaSearchLoading, setIsTextareaSearchLoading] =
        useState(false);
    const [isSearchBarOn, setIsSearchBarOn] = useState(false);
    const [isTextareaSearchBarOn, setIsTextareaSearchBarOn] = useState(false);
    const [textareaSearchKeyword, setTextareaSearchKeyword] = useState("");
    const [currentTypedIndex, setCurrentTypedIndex] = useState(-1);
    const [searchBarPosition, setSearchBarPosition] = useState({ x: 0, y: 0 }); // %
    const [searchInput, setSearchInput] = useState("");
    const [isEmojiModalOn, setIsEmojiModalOn] = useState(false);
    const [isAccessOptionOn, setIsAccessOptionOn] = useState(false);
    const [isAdvancedOptionOn, setIsAdvancedOptionOn] = useState(false);
    const [isWarningTagNumberLimitModalOn, setIsWarningTagNumberLimitModalOn] =
        useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        dispatch(uploadActions.addEmojiOnTextarea(emojiObject.emoji));
        setIsEmojiModalOn(false);
    };

    const currentFile = useMemo(
        () => files[currentIndex],
        [files, currentIndex],
    );

    useEffect(() => {
        files.forEach((file, index) => {
            const blobImageSize = getNewImageSizeBasedOnOriginal(
                ratioMode,
                file,
            );
            const virtualCanvas = document.createElement("canvas");
            virtualCanvas.width = blobImageSize.width;
            virtualCanvas.height = blobImageSize.height;
            const ctx = virtualCanvas.getContext("2d");
            if (ctx) {
                const img = new Image(file.width, file.height); // url만으로 canvas에 이미지를 그릴 수 없습니다. 생성자 함수를 통해 새로운 img 객체를 만들어줍니다.
                img.src = file.url;
                img.onload = () => {
                    ctx.clearRect(
                        0,
                        0,
                        virtualCanvas.width,
                        virtualCanvas.height,
                    );
                    ctx.filter = `brightness(${
                        file.brightness / 3 + 100
                    }%) contrast(${file.contrast / 3 + 100}%) saturate(${
                        file.saturate + 100
                    }%)
                blur(${file.blur / 50}px)
                `;
                    ctx.drawImage(
                        img,
                        (img.width - virtualCanvas.width) / 2 -
                            (img.width * file.translateX) / // Cut step에서 scale 값 때문에 발생한 translate 오차
                                (file.scale / 100 + 1),
                        (img.height - virtualCanvas.height) / 2 -
                            (img.height * file.translateY) / // Cut step에서 scale 값 때문에 발생한 translate 오차
                                (file.scale / 100 + 1),
                        virtualCanvas.width,
                        virtualCanvas.height,
                        0,
                        0,
                        virtualCanvas.width,
                        virtualCanvas.height,
                    );
                    // const newImageFile = virtualCanvas.toDataURL("image/png"); // jpeg로 하면 나머지 캔버스 영역이 검은색으로, png로 하면 투명색이다
                    virtualCanvas.toBlob(function (blob) {
                        // const newImg = document.createElement("img");
                        if (!blob) return;
                        const url = URL.createObjectURL(blob);

                        // newImg.onload = function() {
                        //   // no longer need to read the blob so it's revoked
                        //   URL.revokeObjectURL(url);
                        // };
                        dispatch(
                            uploadActions.addNewFileUrl({
                                url,
                                index,
                                blob,
                            }),
                        );
                    });
                };
            }
        });
    }, [dispatch, ratioMode]);

    const changeSearchBarPosition = (
        event: React.MouseEvent<HTMLImageElement>,
    ) => {
        const { clientX, clientY, currentTarget } = event;
        const {
            x: left,
            y: top,
            width,
            height,
        } = currentTarget.getBoundingClientRect();
        const x = ((clientX - left) / width) * 100;
        const y = ((clientY - top) / height) * 100;
        setSearchBarPosition({ x, y });
    };

    const ImgClickHandler = (event: React.MouseEvent<HTMLImageElement>) => {
        if (currentFile.hashtags.length >= 20) {
            return setIsWarningTagNumberLimitModalOn(true);
        }
        if (isSearchBarOn) {
            dispatch(resetSearch());
            setSearchInput("");
            setIsSearchBarOn(false);
        } else {
            changeSearchBarPosition(event);
            setIsSearchBarOn(true);
        }
    };

    const searchListItemClickHandler = (username: string) => {
        const { x: tagX, y: tagY } = searchBarPosition;
        dispatch(uploadActions.addHashtags({ tagX, tagY, username }));
        setIsSearchBarOn(false);
    };

    const typeAndSearchImageTagUsers = async (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchInput(event.target.value);
        if (event.target.value !== "") {
            try {
                setIsImageTagUserSearchLoading(true);
                const config = {
                    params: { text: event.target.value },
                };
                const {
                    data: { data },
                } = await authorizedCustomAxios.get<MentionResponseType>(
                    `/topsearch/auto/member`,
                    config,
                );
                setSearchedImageTagUsers(data);
            } catch {
                setSearchedImageTagUsers([]);
            } finally {
                setIsImageTagUserSearchLoading(false);
            }
        } else {
            dispatch(resetSearch());
        }
    };

    const decideWhetherToSearchForHashtagsWithTyping = async (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const text = event.target.value;
        const typedIndex = findFirstDifferenceIndexBetweenTwoStrings(
            textareaValue,
            text,
        );
        // const textLength = text.length;
        dispatch(uploadActions.setTextareaValue(text));
        // off 상태일 때
        // 이전 text가 #이나 @ + 현재 text가 " ", #, @ 아닐 때
        let keyword;
        if (!isTextareaSearchBarOn) {
            const prevString = text[typedIndex - 1];
            const currentString = text[typedIndex];
            if (
                currentString !== " " &&
                currentString !== "\n" &&
                currentString !== "#" &&
                currentString !== "@"
            ) {
                if (prevString === "#") {
                    setIsTextareaSearchBarOn(true);
                    keyword = "#" + text[typedIndex];
                } else if (prevString === "@") {
                    setIsTextareaSearchBarOn(true);
                    keyword = text[typedIndex];
                }
            }
        }
        //  on된 상태라면
        // 현재 text가 #, @, " "일 때 검색 중지
        // 그게 아니라면 #, @에서 잘라 키워드로 검색
        else {
            const currentString = text[typedIndex];
            if (
                currentString === "#" ||
                currentString === "@" ||
                currentString === "\n" ||
                currentString === " "
            ) {
                setIsTextareaSearchBarOn(false);
            } else {
                const indexOfHashTag = text.lastIndexOf("#", typedIndex);
                const indexOfMentionTag = text.lastIndexOf("@", typedIndex);
                if (indexOfHashTag > indexOfMentionTag) {
                    keyword = text.substring(indexOfHashTag, typedIndex + 1); // # 포함
                } else if (indexOfMentionTag > indexOfHashTag) {
                    keyword = text.substring(
                        indexOfMentionTag + 1,
                        typedIndex + 1,
                    );
                }
            }
        }
        if (keyword) {
            setTextareaSearchKeyword(keyword);
            setCurrentTypedIndex(typedIndex + 1);
            try {
                setIsTextareaSearchLoading(true);
                const config = {
                    params: { text: keyword },
                };
                if (keyword[0] === "#" && keyword.length > 1) {
                    // 해시태그를 포함한 검색어 길이가 2개 이상이어야
                    setTextareaSearchType("hashtag");
                    setSearchedUsers([]);
                    const {
                        data: { data },
                    } = await authorizedCustomAxios.get<HashtagResponseType>(
                        `/topsearch/auto/hashtag`,
                        config,
                    );
                    setSearchedHashtags(data);
                } else if (keyword[0] !== "#") {
                    setTextareaSearchType("mention");
                    setSearchedHashtags([]);
                    const {
                        data: { data },
                    } = await authorizedCustomAxios.get<MentionResponseType>(
                        `/topsearch/auto/member`,
                        config,
                    );
                    setSearchedUsers(data);
                }
                setIsTextareaSearchLoading(false);
            } catch {
                setSearchedUsers([]);
                setSearchedHashtags([]);
            } finally {
                setIsTextareaSearchLoading(false);
            }
        }
    };

    const addUsernameOrHashtagToTextarea = (usernameOrHashtag: string) => {
        if (!textareaSearchKeyword) return;
        const keywordStartIndex = textareaValue.lastIndexOf(
            textareaSearchKeyword,
            currentTypedIndex,
        );
        const newTextareaValue =
            textareaValue.substring(0, keywordStartIndex) +
            usernameOrHashtag +
            " " +
            textareaValue.substring(
                keywordStartIndex + textareaSearchKeyword.length,
            );
        dispatch(uploadActions.setTextareaValue(newTextareaValue));
        setIsTextareaSearchBarOn(false);
        setTextareaSearchKeyword("");
        setCurrentTypedIndex(-1);
        textareaRef.current?.focus();
    };

    return (
        <>
            {isWarningTagNumberLimitModalOn && (
                <WarningMaxUploadNumberModal
                    warnigContent="tags"
                    onModalOn={() => setIsWarningTagNumberLimitModalOn(true)}
                    onModalOff={() => setIsWarningTagNumberLimitModalOn(false)}
                />
            )}
            <UploadHeader
                excuteBeforePrevStep={() =>
                    dispatch(uploadActions.resetNewFileUrl())
                }
            />
            <StyledContent>
                <div
                    className="upload__contentImg"
                    style={{
                        width: currentWidth,
                        height: currentWidth,
                        minWidth: 350,
                        minHeight: 350,
                    }}
                >
                    <div
                        className="contentImg__relative"
                        style={{
                            width: getRatioCalculatedBoxWidth(
                                ratioMode,
                                minWidthForContent(currentWidth),
                            ),
                            height: getRatioCalculatedBoxHeight(
                                ratioMode,
                                minWidthForContent(currentWidth),
                            ),
                        }}
                    >
                        {currentFile.newUrl !== "" && (
                            <img
                                src={currentFile.newUrl}
                                alt={"태그할 수 있는 사진"}
                                onClick={ImgClickHandler}
                            />
                        )}
                        {currentFile.hashtags.map(
                            ({ tagX, tagY, username }, index) => (
                                <div
                                    key={username}
                                    style={{
                                        left: tagX + "%",
                                        top: tagY + "%",
                                    }}
                                    className="hashtag"
                                >
                                    <div className="hashtag__relative">
                                        <div className="pointer"></div>
                                        <div className="content">
                                            <div className="username">
                                                {username}
                                            </div>
                                            <button
                                                className="closeButton"
                                                onClick={() =>
                                                    dispatch(
                                                        uploadActions.deleteHashtag(
                                                            index,
                                                        ),
                                                    )
                                                }
                                            >
                                                <Close />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                        {isSearchBarOn && (
                            <div
                                className="searchBar"
                                style={{
                                    left: `${searchBarPosition.x}%`,
                                    top: `${searchBarPosition.y}%`,
                                }}
                            >
                                <div className="pointer"></div>
                                <div className="modal">
                                    <div className="modal__header">
                                        <h4>태그:</h4>
                                        <input
                                            type="text"
                                            placeholder="검색"
                                            value={searchInput}
                                            onChange={
                                                typeAndSearchImageTagUsers
                                            }
                                            autoFocus={true}
                                        />
                                        {searchInput &&
                                        isImageTagUserSearchLoading ? (
                                            <Loading size={18} />
                                        ) : (
                                            <span
                                                onClick={() => {
                                                    dispatch(resetSearch());
                                                    setSearchInput("");
                                                }}
                                            ></span>
                                        )}
                                    </div>
                                    <div className="modal__searched">
                                        {isImageTagUserSearchLoading ? (
                                            <div className="loadingLayout">
                                                <Loading size={32} />
                                            </div>
                                        ) : (
                                            searchedImageTagUsers.map(
                                                (user) => (
                                                    <div
                                                        onClick={() =>
                                                            searchListItemClickHandler(
                                                                user.username,
                                                            )
                                                        }
                                                        key={user.id}
                                                    >
                                                        <SearchListItemLayout
                                                            member={user}
                                                        />
                                                    </div>
                                                ),
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {files.length > 1 && (
                        <UploadImgArrowAndDots
                            currentIndex={currentIndex}
                            files={files}
                        />
                    )}
                </div>

                <div
                    className="upload__contents"
                    style={{ height: minWidthForContent(currentWidth) }}
                >
                    <div className="upload__contentsScroll">
                        <div className="upload__contentInput textareaBox">
                            <div className="textarea__header">
                                <img
                                    src={userInfo?.memberImageUrl}
                                    alt={"유효하지 않은 url입니다."}
                                />
                                <div>{userInfo?.memberUsername}</div>
                            </div>
                            <textarea
                                placeholder="문구 입력..."
                                value={textareaValue}
                                onChange={(event) =>
                                    decideWhetherToSearchForHashtagsWithTyping(
                                        event,
                                    )
                                }
                                maxLength={2200}
                                ref={textareaRef}
                            ></textarea>
                            <div
                                className="textarea__bottom"
                                onBlur={() => setIsEmojiModalOn(false)}
                            >
                                {isEmojiModalOn && (
                                    <Picker onEmojiClick={onEmojiClick} />
                                )}
                                <SmileFace
                                    onClick={() => setIsEmojiModalOn(true)}
                                />
                                <button>{`${textareaValue.length}/2,200`}</button>
                            </div>
                        </div>
                        {isTextareaSearchBarOn ? (
                            <div className="upload__textareaSearchBar">
                                {isTextareaSearchLoading ? (
                                    <div className="loadingLayout">
                                        <Loading size={32} />
                                    </div>
                                ) : textareaSearchType === "mention" ? (
                                    searchedUsers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="searchedUser"
                                            onClick={() =>
                                                addUsernameOrHashtagToTextarea(
                                                    member.username,
                                                )
                                            }
                                        >
                                            <img
                                                src={member.image.imageUrl}
                                                alt={member.image.imageName}
                                            />
                                            <div>
                                                <span>{member.username}</span>
                                                <div>{member.name}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    searchedHashtags.map((hashtagObj) => (
                                        <div
                                            key={hashtagObj.name}
                                            className="searchedHashtag"
                                            onClick={() =>
                                                addUsernameOrHashtagToTextarea(
                                                    "#" + hashtagObj.name,
                                                )
                                            }
                                        >
                                            <div id="name">
                                                #{hashtagObj.name}
                                            </div>
                                            <div id="count">
                                                게시물 {hashtagObj.count}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="upload__contentOption location">
                                    <div className="header">
                                        <input
                                            // disabled={true}
                                            placeholder="위치 추가(개발 준비중)"
                                        />
                                        <span>
                                            <LocationIcon />
                                        </span>
                                    </div>
                                </div>
                                <div className="upload__contentOption accessibility">
                                    <div
                                        className="header"
                                        onClick={() =>
                                            setIsAccessOptionOn((prev) => !prev)
                                        }
                                    >
                                        <span
                                            className={
                                                isAccessOptionOn ? "bold" : ""
                                            }
                                        >
                                            접근성
                                        </span>
                                        <span
                                            className={
                                                isAccessOptionOn
                                                    ? "reverse"
                                                    : ""
                                            }
                                        >
                                            <DownV />
                                        </span>
                                    </div>
                                    {isAccessOptionOn && (
                                        <div className="activated accessOption">
                                            <div className="smallFont">
                                                {`대체 텍스트는 시각적으로 사진을 보기 어려운 사람들에게 사진
                                        내용을 설명하는 텍스트입니다. 대체 텍스트는 회원님의 사진에
                                        대해 자동으로 생성되며, 직접 입력할 수도 있습니다.`}
                                            </div>
                                            {files.map((file, index) => (
                                                <div key={file.newUrl}>
                                                    <div className="imageWrapper">
                                                        <img
                                                            src={file.newUrl}
                                                            alt={
                                                                "유효하지 않은 url입니다."
                                                            }
                                                            width={
                                                                ratioMode !==
                                                                "thin"
                                                                    ? 44
                                                                    : 44 * 0.8
                                                            }
                                                        ></img>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="대체 텍스트 입력..."
                                                        value={
                                                            file.alternativeText
                                                        }
                                                        onChange={(event) =>
                                                            dispatch(
                                                                uploadActions.setAlternativeValue(
                                                                    {
                                                                        value: event
                                                                            .target
                                                                            .value,
                                                                        index,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="upload__contentOption advanced">
                                    <div
                                        className="header"
                                        onClick={() =>
                                            setIsAdvancedOptionOn(
                                                (prev) => !prev,
                                            )
                                        }
                                    >
                                        <span
                                            className={
                                                isAdvancedOptionOn ? "bold" : ""
                                            }
                                        >
                                            고급 설정
                                        </span>
                                        <span
                                            className={
                                                isAdvancedOptionOn
                                                    ? "reverse"
                                                    : ""
                                            }
                                        >
                                            <DownV />
                                        </span>
                                    </div>
                                    {isAdvancedOptionOn && (
                                        <div className="activated advanced">
                                            <div className="toggleArea">
                                                <div>
                                                    이 게시물의 좋아요 수 및
                                                    조회수 숨기기
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        dispatch(
                                                            uploadActions.toggleIsLikesAndViewsHidden(),
                                                        )
                                                    }
                                                    className={`toggle ${
                                                        isLikesAndViewsHidden &&
                                                        "on"
                                                    }`}
                                                >
                                                    <div></div>
                                                </div>
                                            </div>
                                            <div className="smallFont">
                                                이 게시물의 총 좋아요 및
                                                조회수는 회원님만 볼 수
                                                있습니다. 나중에 게시물 상단에
                                                있는 ··· 메뉴에서 이 설정을
                                                변경할 수 있습니다. 다른 사람의
                                                게시물에서 좋아요 수를 숨기려면
                                                계정 설정으로 이동하세요.
                                            </div>
                                            <div className="toggleArea">
                                                <div>댓글 기능 해제</div>
                                                <div
                                                    onClick={() =>
                                                        dispatch(
                                                            uploadActions.toggleIsCommentBlocked(),
                                                        )
                                                    }
                                                    className={`toggle ${
                                                        isCommentBlocked && "on"
                                                    }`}
                                                >
                                                    <div></div>
                                                </div>
                                            </div>
                                            <div className="smallFont">
                                                나중에 게시물 상단의
                                                메뉴(···)에서 이 설정을 변경할
                                                수 있습니다.
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <hr />
                            </>
                        )}
                    </div>
                </div>
            </StyledContent>
        </>
    );
};

export default Content;

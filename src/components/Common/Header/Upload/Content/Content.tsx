import { uploadActions } from "app/store/ducks/upload/uploadSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { getNewImageSizeBasedOnOriginal } from "components/Common/Header/Upload/Edit/Edit";
import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React, { useEffect, useMemo, useState } from "react";
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

const StyledContent = styled.div`
    display: flex;
    & > .upload__contentImg {
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
                    }
                }
            }
        }
    }
    & > .upload__contents {
        width: 340px;
        min-width: 340px;
        max-width: 340px;

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
`;

interface ContentProps {
    currentWidth: number;
}
const Content = ({ currentWidth }: ContentProps) => {
    const dispatch = useAppDispatch();
    const {
        files,
        currentIndex,
        ratioMode,
        textareaValue,
        isLikesAndViewsHidden,
        isCommentBlocked,
    } = useAppSelector((state) => state.upload);
    const { userInfo } = useAppSelector((state) => state.auth);
    const searchedUsers = useAppSelector((state) => state.common.searchUsers);
    const [isSearchBarOn, setIsSearchBarOn] = useState(false);
    const [searchBarPosition, setSearchBarPosition] = useState({ x: 0, y: 0 }); // %
    const [searchInput, setSearchInput] = useState("");
    const [isEmojiModalOn, setIsEmojiModalOn] = useState(false);
    const [isAccessOptionOn, setIsAccessOptionOn] = useState(false);
    const [isAdvancedOptionOn, setIsAdvancedOptionOn] = useState(false);

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
                    virtualCanvas.toBlob(function (blob) {
                        if (!blob) return;
                        var newImg = document.createElement("img"),
                            url = URL.createObjectURL(blob);
                        newImg.onload = function () {
                            dispatch(
                                uploadActions.addNewFileUrl({ url, index }),
                            );
                            // no longer need to read the blob so it's revoked
                            // URL.revokeObjectURL(url);
                        };
                        newImg.src = url;
                        document.body.appendChild(newImg);
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

    return (
        <>
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
                        minWidth: currentWidth,
                        minHeight: currentWidth,
                    }}
                >
                    <div
                        className="contentImg__relative"
                        style={{
                            width: getRatioCalculatedBoxWidth(
                                ratioMode,
                                currentWidth,
                            ),
                            height: getRatioCalculatedBoxHeight(
                                ratioMode,
                                currentWidth,
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
                                            onChange={async (event) => {
                                                setSearchInput(
                                                    event.target.value,
                                                );
                                                if (event.target.value !== "") {
                                                    await dispatch(
                                                        searchUser({
                                                            keyword:
                                                                event.target
                                                                    .value,
                                                        }),
                                                    );
                                                } else {
                                                    dispatch(resetSearch());
                                                }
                                            }}
                                            autoFocus={true}
                                        />
                                        {searchInput && (
                                            <span
                                                onClick={() => {
                                                    dispatch(resetSearch());
                                                    setSearchInput("");
                                                }}
                                            ></span>
                                        )}
                                    </div>
                                    <div className="modal__searched">
                                        {searchedUsers.length > 0 &&
                                            searchedUsers.map((user) => (
                                                <div
                                                    onClick={() =>
                                                        searchListItemClickHandler(
                                                            user.member
                                                                .username,
                                                        )
                                                    }
                                                    key={user.member.id}
                                                >
                                                    <SearchListItemLayout
                                                        member={user.member}
                                                    />
                                                </div>
                                            ))}
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
                <div className="upload__contents">
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
                                dispatch(
                                    uploadActions.setTextareaValue(
                                        event.target.value,
                                    ),
                                )
                            }
                            maxLength={2200}
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
                            onClick={() => setIsAccessOptionOn((prev) => !prev)}
                        >
                            <span className={isAccessOptionOn ? "bold" : ""}>
                                접근성
                            </span>
                            <span className={isAccessOptionOn ? "reverse" : ""}>
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
                                                alt={"유효하지 않은 url입니다."}
                                                width={
                                                    ratioMode !== "thin"
                                                        ? 44
                                                        : 44 * 0.8
                                                }
                                            ></img>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="대체 텍스트 입력..."
                                            value={file.alternativeText}
                                            onChange={(event) =>
                                                dispatch(
                                                    uploadActions.setAlternativeValue(
                                                        {
                                                            value: event.target
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
                                setIsAdvancedOptionOn((prev) => !prev)
                            }
                        >
                            <span className={isAdvancedOptionOn ? "bold" : ""}>
                                고급 설정
                            </span>
                            <span
                                className={isAdvancedOptionOn ? "reverse" : ""}
                            >
                                <DownV />
                            </span>
                        </div>
                        {isAdvancedOptionOn && (
                            <div className="activated advanced">
                                <div className="toggleArea">
                                    <div>
                                        이 게시물의 좋아요 수 및 조회수 숨기기
                                    </div>
                                    <div
                                        onClick={() =>
                                            dispatch(
                                                uploadActions.toggleIsLikesAndViewsHidden(),
                                            )
                                        }
                                        className={`toggle ${
                                            isLikesAndViewsHidden && "on"
                                        }`}
                                    >
                                        <div></div>
                                    </div>
                                </div>
                                <div className="smallFont">
                                    이 게시물의 총 좋아요 및 조회수는 회원님만
                                    볼 수 있습니다. 나중에 게시물 상단에 있는
                                    ··· 메뉴에서 이 설정을 변경할 수 있습니다.
                                    다른 사람의 게시물에서 좋아요 수를 숨기려면
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
                                    나중에 게시물 상단의 메뉴(···)에서 이 설정을
                                    변경할 수 있습니다.
                                </div>
                            </div>
                        )}
                    </div>
                    <hr />
                </div>
            </StyledContent>
        </>
    );
};

export default Content;

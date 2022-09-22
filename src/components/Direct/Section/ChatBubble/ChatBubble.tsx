import {
    openModal,
    setCloseModalSelectedMessageId,
    setSelectedMessageId,
} from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as Slide } from "assets/Svgs/slide.svg";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface ChatBubbleProps {
    content: string | Direct.PostMessageDTO | CommonType.ImageInfo; // DM 메세지에는 여러가지 타입이 있습니다. 순서대로 일반 메세지, 포스트 공유, 이미지 전송
    me: boolean;
    showDate: boolean;
    messageDate: string;
    messageId: number;
    likeMessageHandler: () => void;
    unlikeMessageHandler: () => void;
    likeMembers: CommonType.memberType[];
    senderImage: CommonType.ImageInfo;
    sender: CommonType.memberType;
}

interface ChatBubbleContainerType {
    me: boolean;
    showThreeDotsButton: boolean;
    showGuide: boolean;
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
    liked: CommonType.memberType | undefined;
    isString: boolean;
}

const ChatBubbleContainer = styled.div<ChatBubbleContainerType>`
    margin-top: 5px;
    padding: 0px 20px;
    padding-left: ${(props) => (props.me ? "20px" : "50px")};
    text-align: ${(props) => (props.me ? "right" : "left")};
    display: block;
    position: relative;
    margin-bottom: ${(props) => (props.liked ? "15px" : "0")};

    .date-section {
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #8e8e8e;
        margin: 10px 0;
    }

    .content {
        display: flex;
        justify-content: ${(props) => (props.me ? "end" : "start")};
        flex-direction: ${(props) => !props.me && "row-reverse"};
        align-items: center;

        .guide-part {
            position: relative;

            .guide-container {
                position: absolute;
                top: calc(50% - 58px);
                z-index: ${(props) => (props.showGuide ? 2 : -1)};
                right: ${(props) => props.me && "calc(100% - 34px)"};
                left: ${(props) => !props.me && "calc(100% - 34px)"};

                .guide-inner {
                    opacity: ${(props) => (props.showGuide ? 1 : 0)};
                    transform: scale(${(props) => (props.showGuide ? 1 : 0)});
                    transform-origin: bottom center;
                    background-color: #000;
                    color: #fff;
                    border-radius: 8px;
                    box-shadow: rgb(0 0 0 / 20%) 0 4px 22px;
                    padding: 8px 12px;
                    transition: opacity 0.3s
                            cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        -webkit-transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    width: max-content;

                    .arrow {
                        position: absolute;
                        width: 100%;
                        bottom: -6px;
                        left: ${(props) => props.me && "calc(50% - 20px)"};
                        right: ${(props) => !props.me && "calc(50% - 20px)"};

                        .arrow-detail {
                            border-radius: 2px;
                            height: 15px;
                            margin: auto;
                            transform: rotate(45deg);
                            width: 15px;
                            background-color: #000;
                        }
                    }

                    .guide-content {
                        button {
                            color: white;
                            margin: 0 4px;
                        }
                    }
                }
            }

            svg {
                display: ${(props) =>
                    props.showThreeDotsButton || props.showGuide
                        ? "block"
                        : "none"};
                margin: 0 5px;
                fill: rgb(142, 142, 142);
                cursor: pointer;

                &:hover {
                    fill: rgb(38, 38, 38);
                }
            }
        }

        p {
            padding: ${(props) => (props.isString ? "15px" : "15px 0")};
            display: inline-block;
            max-width: 234px;
            text-align: left;
            border-radius: 16px;
            overflow-wrap: break-word;
            white-space: normal;
            background: ${(props) =>
                props.me
                    ? "rgba(var(--bb2, 239, 239, 239), 1)"
                    : "transparent"};
            border: ${(props) =>
                props.me ? "none" : `1px solid rgba(0,0,0, 0.1)`};

            img {
                height: 200px;
                width: 80%;
                min-height: 100%;
                min-width: 100%;
            }

            .post-image-container {
                .uploader-info {
                    display: flex;
                    align-items: center;
                    padding: 0 10px 10px 10px;

                    img {
                        // uploader image
                        width: 32px;
                        height: 32px;
                        min-width: 0%;
                        margin-right: 5px;
                    }
                }

                .post-image {
                    position: relative;

                    svg {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                    }
                }
            }
        }
    }

    & > a > img {
        position: absolute;
        bottom: 0;
        left: 20px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
    }

    .heart {
        background-color: #efefef;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        right: ${(props) => props.me && 0};
        left: ${(props) => !props.me && "50px"};
        padding: 6px;
        bottom: -14px;
        cursor: pointer;
    }
`;

const ChatBubble = ({
    me,
    content,
    showDate,
    messageDate,
    messageId,
    likeMessageHandler,
    unlikeMessageHandler,
    likeMembers,
    senderImage,
    sender,
}: ChatBubbleProps) => {
    const [showThreeDotsButton, setShowThreeDotsButton] =
        useState<boolean>(false);
    const [showGuide, setShowGuide] = useState<boolean>(false);
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const guideRef: React.RefObject<HTMLDivElement> = useRef(null);
    const renewScroll = useAppSelector((state) => state.direct.renewScroll);
    const selectedMessageId = useAppSelector(
        (state) => state.direct.selectedMessageId,
    );

    const modal = useAppSelector((state) => state.direct.modal);
    const userInfo = useAppSelector((state) => state.auth.userInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (renewScroll) {
            scrollRef.current?.scrollIntoView();
        }
    }, [content, renewScroll]);

    // 내가 좋아요 했는지 판단하는 상수
    const liked = likeMembers.find((member) => {
        return member.id === userInfo?.memberId;
    });

    useEffect(() => {
        // 내가 선택한 메세지에 가이드를 띄워줍니다. 하지만 하트를 클릭했을때는 가이드를 띄워주면 안됩니다.
        setShowGuide(
            selectedMessageId === messageId && modal !== "likedMember",
        );
    }, [messageId, modal, selectedMessageId]);

    const copyhandler = useCallback(() => {
        // 흐음 1.
        if (navigator.clipboard) {
            // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
            navigator.clipboard
                .writeText(content as string)
                .then(() => {})
                .catch(() => {
                    alert("복사를 다시 시도해주세요.");
                });
        } else {
            // 흐름 2.
            if (!document.queryCommandSupported("copy")) {
                return alert("복사하기가 지원되지 않는 브라우저입니다.");
            }

            // 흐름 3.
            const textarea = document.createElement("textarea");
            textarea.value = content as string;
            textarea.style.top = "0";
            textarea.style.left = "0";
            textarea.style.position = "fixed";

            // 흐름 4.
            document.body.appendChild(textarea);
            // focus() -> 사파리 브라우저 서포팅
            textarea.focus();
            // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
            textarea.select();
            // 흐름 5.
            document.execCommand("copy");
            // 흐름 6.
            document.body.removeChild(textarea);
        }
        setShowGuide(false);
        dispatch(setSelectedMessageId(null));
    }, [content, dispatch]);

    const isPostImage = (object: any): object is Direct.PostMessageDTO => {
        return "postImage" in object;
    };

    const isImage = (object: any): object is CommonType.ImageInfo => {
        return "imageUrl" in object;
    };

    const renderContent = () => {
        if (typeof content === "string") {
            // 일반적인 채팅은 string 타입입니다.
            return <>{content}</>;
        } else {
            if (isPostImage(content)) {
                return (
                    <div className="post-image-container">
                        <div className="uploader-info">
                            <img
                                src={content.uploader.memberImageUrl}
                                alt="uploader-image"
                            />
                            <span>{content.uploader.memberUsername}</span>
                        </div>
                        <div className="post-image">
                            <img
                                src={content.postImage.imageUrl}
                                alt={content.postImage.imageName}
                            />
                            {content.postImageCount > 1 && <Slide />}
                        </div>
                    </div>
                );
            }

            if (isImage(content)) {
                return <img src={content.imageUrl} alt={content.imageName} />;
            }
        }
    };

    // 포커싱이 풀리면 해당 박스가 사라지는 기능을 추가해 주세요.

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                guideRef.current &&
                !guideRef.current.contains(event.target as Node)
            ) {
                if (messageId === selectedMessageId) {
                    setTimeout(() => {
                        setShowGuide(false);
                        dispatch(setSelectedMessageId(null));
                    }, 0);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch, messageId, selectedMessageId]);

    return (
        <ChatBubbleContainer
            me={me}
            ref={scrollRef}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                setShowThreeDotsButton(true);
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                setShowThreeDotsButton(false);
            }}
            showThreeDotsButton={showThreeDotsButton}
            showGuide={showGuide}
            liked={liked}
            isString={typeof content === "string"}
        >
            {showDate && (
                <div className={"date-section"}>
                    {moment(messageDate).format("YYYY년 M월 DD일 a  h:mm")}
                </div>
            )}
            {!me && (
                <Link to={`/profile/${sender.username}`}>
                    <img src={senderImage.imageUrl} alt={"보낸사람"} />
                </Link>
            )}

            <div className={"content"} ref={guideRef}>
                <div className={"guide-part"}>
                    <div className="guide-container">
                        <div className="guide-inner">
                            <div className="arrow">
                                <div className="arrow-detail"></div>
                            </div>
                            <div className="guide-content">
                                {liked ? (
                                    <button
                                        onClick={() => {
                                            unlikeMessageHandler();
                                            setShowGuide(false);
                                        }}
                                    >
                                        좋아요 취소
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            likeMessageHandler();
                                            setShowGuide(false);
                                        }}
                                    >
                                        좋아요
                                    </button>
                                )}
                                {typeof content === "string" && (
                                    <button onClick={copyhandler}>복사</button>
                                )}
                                {me ? (
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                openModal("deleteChatMessage"),
                                            );
                                            dispatch(
                                                setCloseModalSelectedMessageId(),
                                            );
                                        }}
                                    >
                                        전송 취소
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            console.log("신고로직구현");
                                        }}
                                    >
                                        신고
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <ThreeDots
                        onClick={() => {
                            dispatch(setSelectedMessageId(messageId));
                        }}
                    />
                </div>
                <p>{renderContent()}</p>
            </div>
            {/*그 메세지에 좋아요를 누른 사람중에 내가 있다면 하트를 표시해주자*/}
            {liked && (
                <div
                    onClick={() => {
                        dispatch(setSelectedMessageId(messageId));
                        dispatch(openModal("likedMember"));
                    }}
                    className={"heart"}
                >
                    ❤️
                </div>
            )}
        </ChatBubbleContainer>
    );
};

export default ChatBubble;

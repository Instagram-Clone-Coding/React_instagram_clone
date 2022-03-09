import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import { openModal, setSelectedMessageId } from "app/store/ducks/direct/DirectSlice";
import moment from "moment";

interface ChatBubbleProps {
    content: string | Direct.PostMessageDTO;
    me: boolean;
    showDate: boolean;
    messageDate: string;
    messageId: number;
    likeMessageHandler: () => void;
    unlikeMessageHandler: () => void;
    likeMembers: AuthType.UserInfo[];
}

interface ChatBubbleContainerType {
    me: boolean;
    showThreeDotsButton: boolean;
    showGuide: boolean;
    onMouseEnter: (
        event: React.MouseEvent<HTMLDivElement>,
    ) => void;
    onMouseLeave: (
        event: React.MouseEvent<HTMLDivElement>,
    ) => void;
    liked: AuthType.UserInfo | undefined;
}

const ChatBubbleContainer = styled.div<ChatBubbleContainerType>`
  margin-top: 5px;
  padding: 0px 20px;
  padding-left: ${props => props.me ? "20px" : "50px"};
  text-align: ${props => props.me ? "right" : "left"};
  display: block;
  position: relative;
  margin-bottom: ${props => props.liked ? "15px" : "0"};

  .date-section {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #8E8E8E;
    margin: 10px 0;
  }

  .content {

    display: flex;
    justify-content: ${props => props.me ? "end" : "start"};
    flex-direction: ${props => !props.me && "row-reverse"};
    align-items: center;

    .guide-part {
      position: relative;

      .guide-container {
        position: absolute;
        top: calc(50% - 58px);
        z-index: ${props => props.showGuide ? 2 : -1};
        right: ${props => props.me && 'calc(100% - 34px)'};
        left: ${props => !props.me && 'calc(100% - 34px)'};


        .guide-inner {
          opacity: ${props => props.showGuide ? 1 : 0};
          transform: scale(${props => props.showGuide ? 1 : 0});
          transform-origin: bottom center;
          background-color: #000;
          color: #fff;
          border-radius: 8px;
          box-shadow: rgb(0 0 0 / 20%) 0 4px 22px;
          padding: 8px 12px;
          transition: opacity .3s cubic-bezier(.175, .885, .32, 1.275), transform .3s cubic-bezier(.175, .885, .32, 1.275), -webkit-transform .3s cubic-bezier(.175, .885, .32, 1.275);
          width: max-content;

          .arrow {
            position: absolute;
            width: 100%;
            bottom: -6px;
            left: ${props => props.me && 'calc(50% - 20px)'};
            right: ${props => !props.me && 'calc(50% - 20px)'};

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
        display: ${props => props.showThreeDotsButton || props.showGuide ? "block" : "none"};
        margin: 0 5px;
        fill: rgb(142, 142, 142);
        cursor: pointer;

        &:hover {
          fill: rgb(38, 38, 38);
        }
      }

    }


    p {
      padding: 15px;
      display: inline-block;
      max-width: 234px;
      text-align: left;
      border-radius: 16px;
      overflow-wrap: break-word;
      white-space: normal;
      background: ${props => props.me ? "rgba(var(--bb2, 239, 239, 239), 1)" : "transparent"};
      border: ${props => props.me ? "none" : `1px solid rgba(0,0,0, 0.1)`};

      img {
        height: 200px;
        min-height: 100%;
        min-width: 100%;
      }
    }
  }

  & > img {
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
    right: ${props => props.me && 0};
    left : ${props => !props.me && '50px'};
    padding: 6px;
    bottom: -14px;
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
                    }: ChatBubbleProps) => {
    const [showThreeDotsButton, setShowThreeDotsButton] = useState<boolean>(false);
    const [showGuide, setShowGuide] = useState<boolean>(false);
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const renewScroll = useAppSelector(state => state.direct.renewScroll);
    const selectedMessageId = useAppSelector(state => state.direct.selectedMessageId);
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (renewScroll) {
            scrollRef.current?.scrollIntoView();
        }
    }, [content]);

    // 내가 좋아요 했는지 판단하는 상수
    const liked = likeMembers.find(member => {
        return member.memberId === userInfo?.memberId;
    });

    useEffect(() => {
        setShowGuide(selectedMessageId === messageId);
    }, [selectedMessageId]);


    const copyhandler = () => {
        // 흐음 1.
        if (navigator.clipboard) {
            // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
            navigator.clipboard
                .writeText(content as string)
                .then(() => {
                })
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
    };

    return (
        <ChatBubbleContainer me={me} ref={scrollRef}
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
        >
            {
                showDate && <div className={"date-section"}>{moment(messageDate).format("YYYY년 M월 DD일 a  h:mm")}</div>
            }
            {
                !me &&
                <img src={"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150"} alt={"보낸사람"} />
            }

            <div className={"content"}>
                <div className={"guide-part"}>
                    <div className="guide-container">
                        <div className="guide-inner">
                            <div className="arrow">
                                <div className="arrow-detail"></div>
                            </div>
                            <div className="guide-content">

                                {
                                    liked ? <button onClick={() => {
                                            unlikeMessageHandler();
                                            setShowGuide(false);
                                        }
                                        }>좋아요 취소</button>
                                        : <button onClick={() => {
                                            likeMessageHandler();
                                            setShowGuide(false);
                                        }
                                        }>좋아요</button>
                                }
                                {
                                    typeof content === "string" && <button onClick={copyhandler}>복사</button>}
                                <button onClick={() => {
                                    dispatch(openModal("deleteChatMessage"));
                                }}>전송 취소
                                </button>
                            </div>
                        </div>
                    </div>
                    <ThreeDots onClick={() => dispatch(setSelectedMessageId(messageId))} />
                </div>
                <p>
                    {
                        typeof content === "string" ? <> {content}</> :
                            <img src={content.postImage.imageUrl} alt={content.postImage.imageName} />
                    }
                </p>

            </div>
            {/*그 메세지에 좋아요를 누른 사람중에 내가 있다면 하트를 표시해주자*/}
            {
                liked &&
                <div className={"heart"}>
                    <div>
                        ❤️
                    </div>
                </div>
            }


        </ChatBubbleContainer>
    );
};

export default ChatBubble;
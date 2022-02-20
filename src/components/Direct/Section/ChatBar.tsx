import React, {
    ChangeEvent,
    Dispatch,
    KeyboardEventHandler,
    SetStateAction,
    useState,
} from "react";
import styled from "styled-components";
import { ReactComponent as Emoji } from "assets/Svgs/direct-emoji-icon.svg";
import { ReactComponent as ImageUpload } from "assets/Svgs/direct-image-upload.svg";
import { ReactComponent as Heart } from "assets/Svgs/heart.svg";
import Picker, { IEmojiData } from "emoji-picker-react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

interface ChatBarType {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    sendMessage: () => void;
}

interface ChatBarContainerType {
    sendButtonClicked: boolean;
}

const ChatBarContainer = styled.div<ChatBarContainerType>`
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
  background-color: white;
  z-index: 1;

  .emoji-picker-react {
    width: 50% !important;
    height: 400px;
    @media (max-width: 970px) {
      width: 100% !important;
    }
  }

  .input-container {
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 22px;
    min-height: 44px;
    padding-left: 11px;
    padding-right: 8px;
    display: flex;
    align-items: center;


    svg {
      margin: 8px;
      cursor: pointer;
    }

    textarea {
      resize: none;
      border: none;
      flex: 1;
      padding: 0 9px;
      overflow: hidden;
      height: 18px;
      background-color: white;

      &:focus {
        outline: none;
      }
    }

    button {
      margin-right: 8px;
      color: rgba(var(--d69, 0, 149, 246), 1);
      opacity: ${props => props.sendButtonClicked ? "0.8" : "1.0"};
    }
  }
`;

const sockJS = new SockJS("http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/ws-connection");
let stompClient: Stomp.Client = Stomp.over(sockJS);
stompClient.debug = (log) => {
    console.log(log);
};

const ChatBar = ({ sendMessage, message, setMessage }: ChatBarType) => {
    // message to be trimed
    const [sendButtonClicked, setSendButtonClicked] = useState<boolean>(false);
    const [image, setImage] = useState<File>();
    const [showPicker, setShowPicker] = useState(false);


    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const messageChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const sendButtonMouseDownHandler = () => {
        setSendButtonClicked(true);
    };

    const sendButtonMouseUpHandler = () => {
        setSendButtonClicked(false);
    };

    const sendButtonClickHandler = () => {
        sendMessage();
    };

    const pressEnterHandler: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    };


    return (
        <ChatBarContainer sendButtonClicked={sendButtonClicked}>

            {showPicker && <Picker
                pickerStyle={{ width: "100%" }}
                onEmojiClick={onEmojiClick} />}
            <div className="input-container">
                <Emoji onClick={() => setShowPicker(!showPicker)} />
                <textarea value={message} placeholder="메시지 입력..." className="chat-input" onChange={messageChangeHandler}
                          onKeyPress={pressEnterHandler} />
                {message.trim().length === 0 ?
                    <>
                        <label htmlFor={"img"}>
                            <ImageUpload />
                        </label>
                        <input
                            onChange={imageUploadHandler}
                            type="file"
                            id="img"
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <Heart />
                    </>
                    : <button onClick={sendButtonClickHandler} onMouseDown={sendButtonMouseDownHandler}
                              onMouseUp={sendButtonMouseUpHandler}>
                        보내기
                    </button>

                }
            </div>
        </ChatBarContainer>
    );
};

export default ChatBar;
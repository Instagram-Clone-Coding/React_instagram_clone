import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledNotification = styled.div`
    position: fixed;
    bottom: -100%;
    left: 0;
    width: 100%;
    @-webkit-keyframes wait5 {
        0% {
            bottom: -100%;
        }
        15% {
            bottom: 0;
        }
        70% {
            bottom: 0;
        }
        100% {
            bottom: -100%;
        }
    }
    @keyframes wait5 {
        0% {
            bottom: -100%;
        }
        15% {
            bottom: 0;
        }
        70% {
            bottom: 0;
        }
        100% {
            bottom: -100%;
        }
    }
    animation: wait5 8.5s;

    background-color: ${(props) => props.theme.font.default_black};
    min-height: 44px;
    padding: 0 16px;
    & > p {
        color: white;
        max-height: 72px;
        overflow: hidden;
        padding: 12px 0;
    }
`;

interface NotificationProps {
    text: string;
}

const Notification = ({ text }: NotificationProps) => {
    const notificationRoot = ReactDOM.createPortal(
        <StyledNotification>
            <p>{text}</p>
        </StyledNotification>,
        document.getElementById("notification-root")!,
    );
    return notificationRoot;
};

export default Notification;

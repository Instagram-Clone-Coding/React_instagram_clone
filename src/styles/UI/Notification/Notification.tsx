import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledNotification = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
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
        document.getElementById("notification-root")!
    );
    return notificationRoot;
};

export default Notification;

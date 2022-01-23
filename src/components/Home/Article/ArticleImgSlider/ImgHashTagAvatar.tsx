import { ReactComponent as Avatar } from "assets/Svgs/avatar.svg";
import styled from "styled-components";

const StyledImgHashTagAvater = styled.button`
    background-color: rgba(0, 0, 0, 0.8);
    margin: 12px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    @keyframes avatarOn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation: 0.5s avatarOn;
`;

const ImgHashTagAvatar = () => {
    return (
        <StyledImgHashTagAvater>
            <Avatar />
        </StyledImgHashTagAvater>
    );
};

export default ImgHashTagAvatar;

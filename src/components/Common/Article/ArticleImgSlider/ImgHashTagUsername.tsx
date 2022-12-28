import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledImgHashTagUsernameProps {
    styleprops: {
        x: number;
        y: number;
        isimghashtagson: boolean | null; // 이 key 에러 발생 방지 위해 생성함
    };
}

const StyledImgHashTagUsername = styled(Link)<StyledImgHashTagUsernameProps>`
    position: absolute;
    left: ${(props) => props.styleprops.x + "%"};
    bottom: ${(props) => props.styleprops.y + "%"};
    text-decoration: none;
    background-color: black;
    border-radius: 4px;
    margin-top: 6px;
    height: 36px;
    & > div {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        & > .username__topArrow {
            position: absolute;
            top: -5px;
            border: 6px solid transparent;
            border-top: 0;
            border-bottom: 6px solid rgba(0, 0, 0, 0.85);
        }
        & > span {
            color: white;
            margin: 0 12px;
            line-height: 18px;
            font-weight: ${(props) => props.theme.font.bold};
        }
    }
    opacity: 0;
    @keyframes usernameOn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes usernameOff {
        0% {
            opacity: 1;
        }
        70% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    animation: 0.5s
        ${(props) =>
            props.styleprops.isimghashtagson
                ? "usernameOn"
                : props.styleprops.isimghashtagson === false
                ? "usernameOff"
                : ""}
        forwards;
`;

export const ImgHashTagUsername = ({
    postTagDTO,
    isImgHashTagsOn,
}: {
    postTagDTO: PostType.PostImgTagDTOProps;
    isImgHashTagsOn: boolean | null;
}) => {
    return (
        <StyledImgHashTagUsername
            to={isImgHashTagsOn ? `/profile/${postTagDTO.tag.username}` : ``}
            styleprops={{
                x: postTagDTO.tag.x,
                y: postTagDTO.tag.y,
                isimghashtagson: isImgHashTagsOn,
            }}
        >
            <div>
                <div className="username__topArrow"></div>
                <span>{postTagDTO.tag.username}</span>
            </div>
        </StyledImgHashTagUsername>
    );
};

export default ImgHashTagUsername;

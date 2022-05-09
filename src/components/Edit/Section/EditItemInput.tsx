import useInput from "hooks/useInput";
import React from "react";
import styled from "styled-components";
const en2kr = (english: string) => {
    switch (english) {
        case "memberUsername":
            return "사용자 이름";
        case "memberName":
            return "이름";
        case "memberWebsite":
            return "웹사이트";
        case "memberIntroduce":
            return "소개";
        case "memberEmail":
            return "이메일";
        case "memberPhone":
            return "전화번호";
        case "memberGender":
            return "성별";
    }
};

const Container = styled.div`
    display: flex;
    margin: 20px 100px 20px 0px;
    aside {
        text-align: right;
        padding-right: 32px;
        margin-top: 6px;
        font-size: 16px;
        font-weight: 600;
        line-height: 18px;
    }
    .input-wrapper {
        width: 355px;
        input {
            border: 1px solid #dbdbdb;
            background: 0 0;
            border-radius: 3px;
            font-size: 16px;
            height: 32px;
            padding: 0 10px;
            width: 100%;
        }

        .guide {
            margin-top: 10px;
            color: ${(props) => props.theme.font.gray};
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
        }
    }
`;

interface EditItemProps {
    item: any;
    guide?: string;
}

const EditItemInput = ({ item, guide }: EditItemProps) => {
    return (
        <Container>
            <aside>
                <label htmlFor={item[0]}>{en2kr(item[0])}</label>
            </aside>
            <div className="input-wrapper">
                <input type="text" id={item[0]} placeholder={en2kr(item[0])} />
                <div className="guide">{guide}</div>
            </div>
        </Container>
    );
};

export default EditItemInput;

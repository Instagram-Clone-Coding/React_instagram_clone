import { changeEditItem, selectModal } from "app/store/ducks/edit/editSlice";
import { useAppDispatch } from "app/store/Hooks";
import styled from "styled-components";

const en2kr = {
    memberUsername: "사용자 이름",
    memberName: "이름",
    memberWebsite: "웹사이트",
    memberIntroduce: "소개",
    memberEmail: "이메일",
    memberPhone: "전화번호",
    memberGender: "성별",
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
    item: [EditType.editItemKeyType, string | null];
    guide?: string;
}

const EditItemInput = ({ item, guide }: EditItemProps) => {
    const dispatch = useAppDispatch();
    return (
        <Container>
            <aside>
                <label htmlFor={item[0]}>{en2kr[item[0]]}</label>
            </aside>
            <div className="input-wrapper">
                <input
                    type="text"
                    id={item[0]}
                    placeholder={en2kr[item[0]]}
                    value={item[1] ? item[1] : ""}
                    onChange={(e) => {
                        dispatch(
                            changeEditItem({
                                name: item[0],
                                value: e.target.value,
                            }),
                        );
                    }}
                    onClick={() => {
                        if (item[0] === "memberGender") {
                            dispatch(selectModal("gender"));
                        }
                    }}
                />
                <div className="guide">{guide}</div>
            </div>
        </Container>
    );
};

export default EditItemInput;

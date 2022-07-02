import { changeEditItem } from "app/store/ducks/edit/editSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import SubmitButton from "components/Auth/SubmitButton";
import ModalHeader from "components/Home/Modals/ModalHeader";
import { useState } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import Button from "styles/UI/Button";
import ModalCard from "styles/UI/ModalCard";

interface ProfileGenderModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}
const ProfileGenderModalInner = styled.div`
    padding: 16px;

    .check-group-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        .check-wrapper {
            display: flex;
            gap: 10px;
            span {
                font-weight: bold;
            }
        }
    }

    button {
        margin-top: 30px;
        width: 516px;
        height: 44px;
    }
`;

const ProfileGenderModal = ({
    onModalOff,
    onModalOn,
}: ProfileGenderModalProps) => {
    const genders = ["남성", "여성", "비공개"];
    const editItem = useAppSelector((state) => state.edit.editItem);
    const dispatch = useAppDispatch();
    const [selectedGender, setSelectedGender] = useState(editItem.memberGender);
    // This function will be triggered when a radio button is selected
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    return (
        <ModalCard
            width={548}
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <ModalHeader title="성별" onModalOff={onModalOff} />
            <ProfileGenderModalInner>
                <div className="check-group-wrapper">
                    {genders.map((gender) => (
                        <div className="check-wrapper">
                            <input
                                type="radio"
                                id={gender}
                                onChange={radioHandler}
                                value={gender}
                                checked={gender === selectedGender}
                            />
                            <span>{gender}</span>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={() => {
                        dispatch(
                            changeEditItem({
                                name: "memberGender",
                                value: selectedGender,
                            }),
                        );
                        onModalOff();
                    }}
                >
                    완료
                </Button>
            </ProfileGenderModalInner>
        </ModalCard>
    );
};

export default ProfileGenderModal;

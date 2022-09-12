import { useAppSelector } from "app/store/Hooks";
import ModalHeader from "components/Home/Modals/ModalHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

const LikedMemberModalInner = styled.div`
    .member {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
        .member-info {
            display: flex;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                border-radius: 100%;
                margin-right: 10px;
            }
        }

        .heart {
        }
    }
`;

interface LikedMemberModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

const LikedMemberModal = ({ onModalOn, onModalOff }: LikedMemberModalProps) => {
    const [likedMembers, setLikedMembers] = useState<CommonType.memberType[]>(
        [],
    );
    const chatMessageList = useAppSelector(
        (state) => state.direct.chatMessageList,
    );
    const selectedMessageId = useAppSelector(
        (state) => state.direct.selectedMessageId,
    );
    useEffect(() => {
        chatMessageList.forEach((chatMessageItem) => {
            if (chatMessageItem.messageId === selectedMessageId) {
                setLikedMembers(chatMessageItem.likeMembers);
            }
        });
    }, []);

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <LikedMemberModalInner>
                <ModalHeader title="공감" onModalOff={onModalOff} />
                {likedMembers.map((member) => (
                    <div className="member">
                        <div className="member-info">
                            <img src={member.image.imageUrl} alt="member" />
                            <span className="username">{member.username}</span>
                        </div>
                        <div className="heart">❤️</div>
                    </div>
                ))}
            </LikedMemberModalInner>
        </ModalCard>
    );
};

export default LikedMemberModal;

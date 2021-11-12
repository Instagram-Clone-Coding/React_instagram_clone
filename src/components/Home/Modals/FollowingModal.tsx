import StoryCircle from "components/Common/StoryCircle";
import styled from "styled-components";
import ModalCard from "UI/ModalCard";

const FollowingModalInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
        width: 100%;
        text-align: center;
    }
    & > div:first-child {
        margin: 16px;
        margin-top: 32px;
    }
    & > .followingModal-warning {
        margin: 16px 0;
    }
    & > .followingModal-delete {
        margin-top: 16px;
        color: #ed4956;
        font-weight: 700;
    }
    & > .followingModal-cancel {
    }
    & > .followingModal-delete,
    & > .followingModal-cancel {
        border-top: ${(props) => props.theme.color.bd_gray} 1px solid;
        height: 48px;
        line-height: 48px;
        cursor: pointer;
    }
`;

interface FollowingModalProps {
    onUnfollow: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    username: string;
    avatarUrl: string;
}

const MODAL_CIRCLE_SIZE = 90 / 64;

const FollowingModal = ({
    onUnfollow,
    onMouseEnter,
    onMouseLeave,
    username,
    avatarUrl,
}: FollowingModalProps) => {
    const unFollowHandler = () => {
        // 언팔로우
        onUnfollow();
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <FollowingModalInner>
                <StoryCircle
                    type="default"
                    avatarUrl={avatarUrl}
                    username={username}
                    scale={MODAL_CIRCLE_SIZE}
                />
                <div className="followingModal-warning">
                    @{username}님의 팔로우를 취소하시겠어요?
                </div>
                <div
                    className="followingModal-delete"
                    onClick={unFollowHandler}
                >
                    팔로우 취소
                </div>
                <div className="followingModal-cancel" onClick={onMouseLeave}>
                    취소
                </div>
            </FollowingModalInner>
        </ModalCard>
    );
};

export default FollowingModal;

import { postUnfollow } from "app/store/ducks/home/homThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import StoryCircle from "components/Common/StoryCircle";
import { token } from "Routes";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

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
        color: ${(props) => props.theme.font.red};
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
    onModalOn: () => void;
    onModalOff: () => void;
}

const MODAL_CIRCLE_SIZE = 90 / 64;

const FollowingModal = ({ onModalOn, onModalOff }: FollowingModalProps) => {
    const { memberNickname, memberUsername, memberImageUrl } = useAppSelector(
        ({ modal }) => modal,
    );
    const dispatch = useAppDispatch();
    const unFollowHandler = () => {
        // 언팔로우
        const unFollowUser = async () => {
            await dispatch(postUnfollow({ token, username: memberUsername }));
        };
        unFollowUser();
        onModalOff();
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <FollowingModalInner>
                <StoryCircle
                    type="default"
                    avatarUrl={memberImageUrl}
                    username={memberNickname}
                    scale={MODAL_CIRCLE_SIZE}
                />
                <div className="followingModal-warning">
                    @{memberNickname}님의 팔로우를 취소하시겠어요?
                </div>
                <div
                    className="followingModal-delete"
                    onClick={unFollowHandler}
                >
                    팔로우 취소
                </div>
                <div className="followingModal-cancel" onClick={onModalOff}>
                    취소
                </div>
            </FollowingModalInner>
        </ModalCard>
    );
};

export default FollowingModal;

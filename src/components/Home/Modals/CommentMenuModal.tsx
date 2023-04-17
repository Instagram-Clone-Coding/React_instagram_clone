import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import Loading from "components/Common/Loading";
import { authorizedCustomAxios } from "customAxios";
import { useState } from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

const CommentMenuModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div,
    & > button {
        height: 48px;
    }
    & > button {
        font-weight: normal;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        & > a {
            text-decoration: none;
            width: 100%;
            height: 100%;
        }
    }
    & > button:not(.commentMenu__delete) {
        border-top: ${(props) => props.theme.color.bd_gray} 1px solid;
    }
    & > .commentMenu__delete {
        color: ${(props) => props.theme.font.red};
        font-weight: 700;
    }
`;

interface CommentMenuModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

const CommentMenuModal = ({ onModalOn, onModalOff }: CommentMenuModalProps) => {
    const commentId = useAppSelector(({ modal }) => modal.commentId);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useAppDispatch();

    const commentDeleteHandler = async () => {
        if (!commentId) return;
        try {
            setIsDeleting(true);
            await authorizedCustomAxios.delete<AxiosType.ResponseType>(
                `/comments/${commentId}`,
            );
            dispatch(paragraphActions.deleteComment({ commentId }));
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
            onModalOff();
        }
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <CommentMenuModalInner>
                {isDeleting ? (
                    <Loading size={24} />
                ) : (
                    <>
                        <button
                            onClick={commentDeleteHandler}
                            className="commentMenu__delete"
                            disabled={isDeleting}
                        >
                            삭제
                        </button>
                        <button onClick={onModalOff}>취소</button>
                    </>
                )}
            </CommentMenuModalInner>
        </ModalCard>
    );
};

export default CommentMenuModal;

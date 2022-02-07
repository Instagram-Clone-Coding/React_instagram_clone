import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import Portal from "components/Common/Modal/Portal";
import { closeModal } from "../../../app/store/ducks/direct/DirectSlice";
import { useAppDispatch } from "../../../app/store/Hooks";

interface ModalProps {
    maskClosable: boolean;
    closable: boolean;
    visible: boolean;
    children: React.ReactNode;
}

const Modal = ({ maskClosable, visible, children }: ModalProps) => {
    const dispatch = useAppDispatch();

    const onMaskClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            dispatch(closeModal());
        }
    };

    return (
        <Portal elementId="modal-root">
            <ModalOverlay visible={visible} />
            <ModalWrapper
                onClick={maskClosable ? onMaskClick : null}
                tabIndex={-1}
                visible={visible}
            >
                <ModalInner tabIndex={0} className="modal-inner">
                    {/*{closable && <div className="modal-close" onClick={close}>나가기</div>}*/}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </Portal>
    );
};

Modal.defaultProps = {
    visible: false,
    closable: true,
    maskClosable: true,
};

Modal.propTypes = {
    visible: PropTypes.bool,
};

const ModalWrapper = styled.div<{ visible: boolean; onClick: any }>`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? "block" : "none")};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div<{ visible: boolean }>`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

const modalShow = keyframes`
  0% {
    opacity: 0;
    transform: scale(2) translateY(-50%);

  }
  50% {
    opacity: 0.75;
    transform: scale(1.25) translateY(-50%);

  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(-50%);
  }
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    width: 400px;
    max-width: 480px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding-top: 30px;
    animation: ${modalShow} 0.1s;
`;

export default Modal;

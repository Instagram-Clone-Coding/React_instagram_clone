import React, { useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Card from "UI/Card";
import { CardProps } from "../UI/Card/Card";

interface PositionedModal extends CardProps {
    top: number;
    left: number;
    isUpperThanHalfPosition: boolean;
}

const StyledPositionedModal = styled(Card)<PositionedModal>`
    position: absolute;
    z-index: 101;
    width: 390px;
    top: ${(props) => props.top + "px"};
    left: ${(props) => props.left + "px"};
    transform: ${(props) =>
        !props.isUpperThanHalfPosition && `translateY(-100%)`};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 16px 0px,
        rgb(219, 219, 219) 0px 0px 0px 1px;
    border: none;
`;

const StyledBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65); // 부모만 opacity 적용하는 법
    & > div {
        width: 400px;
        margin: 20px;
        @keyframes popModal {
            0% {
                opacity: 0;
                transform: scale(1.1);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 1;
            }
        }
        animation: popModal 0.3s;
    }
`;

interface ModalProps {
    modalType?: "positioned" | "withBackDrop";
    modalPosition?: DOMRect;
    onModalOn: () => void;
    onModalOff: () => void;
    children: React.ReactNode;
}

const ModalCard = ({
    modalType = "positioned",
    modalPosition,
    onModalOn,
    onModalOff,
    children,
}: ModalProps) => {
    const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const isUpperThanHalfPosition = useMemo(
        () =>
            modalPosition !== undefined &&
            (modalPosition.top + modalPosition.bottom) / 2 <
                window.innerHeight / 2,
        [modalPosition]
    );

    const topPosition = useMemo(
        () =>
            modalPosition !== undefined
                ? isUpperThanHalfPosition
                    ? window.pageYOffset + modalPosition?.bottom
                    : window.pageYOffset + modalPosition?.top
                : 0, //
        [isUpperThanHalfPosition, modalPosition]
    );

    const renderingComponent =
        modalType === "positioned" ? (
            <StyledPositionedModal
                ref={modalRef}
                radius={12}
                isUpperThanHalfPosition={isUpperThanHalfPosition}
                top={topPosition}
                left={modalPosition!.left}
                onMouseEnter={onModalOn}
                onMouseLeave={onModalOff}
            >
                {children}
            </StyledPositionedModal>
        ) : (
            <StyledBackDrop
                onMouseEnter={onModalOn}
                // onMouseLeave={onModalOff}
                onClick={onModalOff}
            >
                <Card onClick={(event) => event.stopPropagation()} radius={12}>
                    {/* 자식까지 onClick 전파 안되게 */}
                    {children}
                </Card>
            </StyledBackDrop>
        );

    return ReactDOM.createPortal(
        renderingComponent,
        document.getElementById("modal-root")!
    );
};

export default ModalCard;

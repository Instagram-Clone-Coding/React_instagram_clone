import React, { useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Card from "UI/Card/Card";
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

// const StyledBackDrop = styled.div`

// `

interface ModalProps {
    modalType?: "positioned" | "withBackDrop";
    modalPosition?: DOMRect;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    children: React.ReactNode;
}

const ModalCard = ({
    modalType = "positioned",
    modalPosition,
    onMouseEnter,
    onMouseLeave,
    children,
}: ModalProps) => {
    const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const isUpperThanHalfPosition: boolean = useMemo(
        () =>
            modalPosition !== undefined &&
            (modalPosition.top + modalPosition.bottom) / 2 <
                window.innerHeight / 2,
        [modalPosition]
    );

    const topPosition = useMemo(
        () =>
            isUpperThanHalfPosition
                ? window.pageYOffset + modalPosition!.bottom
                : window.pageYOffset + modalPosition!.top, //
        [isUpperThanHalfPosition, modalPosition]
    );

    return ReactDOM.createPortal(
        <StyledPositionedModal
            ref={modalRef}
            radius={12}
            isUpperThanHalfPosition={isUpperThanHalfPosition}
            top={topPosition}
            left={modalPosition!.left}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </StyledPositionedModal>,
        document.getElementById("modal-root")!
    );
};

export default ModalCard;

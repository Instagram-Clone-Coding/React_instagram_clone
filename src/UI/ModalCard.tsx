import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Card from "UI/Card/Card";
import { CardProps } from "../UI/Card/Card";

interface ModalCardProps extends CardProps {
    top: number;
    left: number;
}

const StyledModalCard = styled(Card)<ModalCardProps>`
    position: absolute;
    z-index: 101;
    width: 390px;
    top: ${(props) => props.top + "px"};
    left: ${(props) => props.left + "px"};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 16px 0px,
        rgb(219, 219, 219) 0px 0px 0px 1px;
    border: none;
`;

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
                : window.pageYOffset + modalPosition!.top - 356,
        [isUpperThanHalfPosition, modalPosition]
    );
    const leftPosition = useMemo(() => modalPosition!.left, [modalPosition]);

    return ReactDOM.createPortal(
        <StyledModalCard
            radius={12}
            top={topPosition}
            left={leftPosition}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </StyledModalCard>,
        document.getElementById("modal-root")!
    );
};

export default ModalCard;

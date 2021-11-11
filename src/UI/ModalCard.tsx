import { useMemo } from "react";
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
    height: 356px;
    top: ${(props) => props.top + "px"};
    left: ${(props) => props.left + "px"};
`;

interface ModalProps {
    modalType?: "positioned" | "withBackDrop";
    modalPosition?: DOMRect;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const ModalCard = ({
    modalType = "positioned",
    modalPosition,
    onMouseEnter,
    onMouseLeave,
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
            Hello
        </StyledModalCard>,
        document.getElementById("modal-root")!
    );
};

export default ModalCard;

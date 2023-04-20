import React, { useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import Card from "styles/UI/Card";
import { CardProps } from "styles/UI/Card/Card";
import { ReactComponent as Cancel } from "assets/Svgs/cancel.svg";
import styled from "styled-components";

interface PositionedModal extends CardProps {
    top: number;
    left: number;
    isUpperThanHalfPosition: boolean;
}

const StyledPositionedModal = styled(Card)<PositionedModal>`
    position: absolute;
    z-index: 100;
    width: 390px;
    top: ${(props) => props.top + "px"};
    left: ${(props) => props.left + "px"};
    transform: ${(props) =>
        !props.isUpperThanHalfPosition && `translateY(-100%)`};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 16px 0px,
        rgb(219, 219, 219) 0px 0px 0px 1px;
    border: none;
`;

interface StyledBackDropProps {
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
}

const StyledBackDrop = styled.div<StyledBackDropProps>`
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
    & > svg {
        position: fixed;
        top: 10px;
        right: 10px;
        &:hover {
            cursor: pointer;
        }
    }
    & > div {
        width: ${(props) => (props.width ? props.width : 400)}px;
        height: ${(props) => (props.height ? props.height + "px" : "auto")};
        max-width: ${(props) =>
            props.maxWidth ? props.maxWidth + "px" : "none"};
        min-width: ${(props) =>
            props.minWidth ? props.minWidth + "px" : "none"};
        max-height: ${(props) =>
            props.maxHeight ? props.maxHeight + "px" : "none"};
        min-height: ${(props) =>
            props.minHeight ? props.minHeight + "px" : "none"};
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
    modalPosition?: ModalType.ModalPositionProps;
    onModalOn: () => void;
    onModalOff: () => void;
    children: React.ReactNode;
    isWithCancelBtn?: boolean;
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    isArticle?: boolean;
}

const ModalCard = ({
    modalType = "positioned",
    modalPosition,
    onModalOn,
    onModalOff,
    children,
    isWithCancelBtn = false,
    width,
    height,
    maxWidth,
    maxHeight,
    minHeight,
    minWidth,
    isArticle = false,
}: ModalProps) => {
    const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const isUpperThanHalfPosition = useMemo(
        () =>
            modalPosition !== undefined &&
            (modalPosition.top + modalPosition.bottom) / 2 <
                window.innerHeight / 2,
        [modalPosition],
    );

    const topPosition = useMemo(
        () =>
            modalPosition !== undefined
                ? isUpperThanHalfPosition
                    ? window.pageYOffset + modalPosition?.bottom
                    : window.pageYOffset + modalPosition?.top
                : 0, //
        [isUpperThanHalfPosition, modalPosition],
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
                onClick={onModalOff}
                width={width}
                height={height}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                minWidth={minWidth}
                minHeight={minHeight}
            >
                {isWithCancelBtn && <Cancel onClick={onModalOff} />}
                <Card
                    onClick={(event) => event.stopPropagation()}
                    radius={12}
                    isArticle={isArticle}
                >
                    {children}
                </Card>
            </StyledBackDrop>
        );

    return ReactDOM.createPortal(
        renderingComponent,
        document.getElementById("modal-root")!,
    );
};

export default ModalCard;

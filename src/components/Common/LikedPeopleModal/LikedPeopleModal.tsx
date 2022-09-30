import CloseSVG from "assets/Svgs/CloseSVG";
import LikedPersonUnit from "components/Common/LikedPeopleModal/LikedPersonUnit";
import Loading from "components/Common/Loading";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import ModalCard from "styles/UI/ModalCard";

export interface LikedPersonType {
    follower: boolean;
    following: boolean;
    hasStory: boolean;
    member: {
        hasStory: boolean;
        id: number;
        image: {
            imageUrl: string;
            imageType: string;
            imageName: string;
            imageUUID: string;
        };
        name: string;
        username: string;
    };
}

interface PostlikedPeopleDataType {
    data: {
        content: LikedPersonType[];
    };
}

const getLikedPeople = async (
    page: number,
    type: "post" | "comment",
    id: number,
) => {
    const config = {
        params: {
            page,
            size: 10,
        },
    };
    try {
        const {
            data: {
                data: { content: arr },
            },
        } = await authorizedCustomAxios.get<PostlikedPeopleDataType>(
            `/${type === "post" ? "posts" : "comments"}/${id}/likes`,
            config,
        );
        return arr;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const LIkedPeopleModalHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 42px;
    border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};
    & > h1 {
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: ${(props) => props.theme.font.bold};
    }
    & > button {
        position: absolute;
        right: 0;
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const LikedPeopleModalMain = styled.div`
    height: calc(100% - 42px);
    overflow-y: auto;
    & > .wrapper {
    }
`;

interface LikedPeopleModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    // 어떤 것에 대한 좋아요 정보인지 객체 형태로 전달받습니다
    modalInfo: {
        type: "post" | "comment";
        id: number;
    };
}

const LikedPeopleModal = ({
    onModalOn,
    onModalOff,
    modalInfo,
}: LikedPeopleModalProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [likedPeople, setLikedPeople] = useState<LikedPersonType[]>([]);
    const [isModalWidthSmall, setIsModalWidthSmall] = useState(
        window.innerWidth <= 735,
    );

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const resizeEventHandler = () =>
            setIsModalWidthSmall(window.innerWidth <= 735);

        const keydownEventHandler = (event: KeyboardEvent) => {
            event.key === "Escape" && onModalOff();
        };
        window.addEventListener("resize", resizeEventHandler);
        window.addEventListener("keydown", keydownEventHandler);

        getLikedPeople(1, modalInfo.type, modalInfo.id)
            .then((data) => {
                setLikedPeople(data);
            })
            .finally(() => setIsLoading(false));
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("resize", resizeEventHandler);
            window.removeEventListener("keydown", keydownEventHandler);
        };
    }, [modalInfo.id, modalInfo.type, onModalOff]);

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
            width={isModalWidthSmall ? 260 : 400}
            height={400}
        >
            <LIkedPeopleModalHeader>
                <h1>좋아요</h1>
                <button>
                    <CloseSVG
                        size="18"
                        color={theme.font.default_black}
                        onClick={onModalOff}
                    />
                </button>
            </LIkedPeopleModalHeader>
            <LikedPeopleModalMain>
                <div
                    className="wrapper"
                    style={{ height: likedPeople.length * 60 + "px" }}
                >
                    {/* hasStory 2개? */}
                    {likedPeople.map((personObj, index) => (
                        <LikedPersonUnit
                            personObj={personObj}
                            isSmall={isModalWidthSmall}
                            key={personObj.member.id}
                            isFourthFromLast={index === likedPeople.length - 4}
                        />
                    ))}
                </div>
            </LikedPeopleModalMain>
            {isLoading && <Loading size={32} />}
        </ModalCard>
    );
};

export default LikedPeopleModal;

import CloseSVG from "assets/Svgs/CloseSVG";
import Loading from "components/Common/Loading";
import StoryCircle from "components/Common/StoryCircle";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import Button from "styles/UI/Button";
import ModalCard from "styles/UI/ModalCard";

interface LikedPersonType {
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
    height: 100%;
    & > .wrapper {
        overflow-y: auto;
        & > .likedPerson {
            padding: 8px 16px;
            display: flex;
            align-items: center;
            height: 60px;
            & > div:first-child {
                margin-right: 12px;
            }
            & > div:nth-child(2) {
                flex: 1;
                #username {
                    font-weight: ${(props) => props.theme.font.bold};
                }
            }
            & > button {
                margin-left: 8px;
            }
        }
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
    const [currentPage, setCurrentPage] = useState(1);
    const [likedPeople, setLikedPeople] = useState<LikedPersonType[]>([]);
    const [modalWidth, setModalWidth] = useState(
        window.innerWidth <= 735 ? 260 : 400,
    );

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const resizeEventHandler = () => {
            window.innerWidth <= 735 ? setModalWidth(260) : setModalWidth(400);
        };
        window.addEventListener("resize", resizeEventHandler);
        getLikedPeople(1, modalInfo.type, modalInfo.id)
            .then((data) => {
                setLikedPeople(data);
                setCurrentPage((prev) => prev + 1);
            })
            .finally(() => setIsLoading(false));
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("resize", resizeEventHandler);
        };
    }, [modalInfo.id, modalInfo.type]);

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
            width={modalWidth}
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
                    {likedPeople.map((personObj) => (
                        <div className="likedPerson" key={personObj.member.id}>
                            <StoryCircle
                                type={
                                    personObj.member.hasStory
                                        ? "unread"
                                        : "read"
                                }
                                avatarUrl={personObj.member.image.imageUrl}
                                username={personObj.member.username}
                                scale={54 / 64}
                                onMouseEnter={() => {}}
                                onMouseLeave={() => {}} // hoverModal
                            />
                            <div>
                                <div id="username">
                                    {personObj.member.username}
                                </div>
                                <div>{personObj.member.name}</div>
                            </div>
                            <Button
                                bgColor={
                                    personObj.following
                                        ? theme.color.bg_white
                                        : undefined
                                }
                            >
                                {personObj.following ? "팔로잉" : "팔로우"}
                            </Button>
                        </div>
                    ))}
                </div>
            </LikedPeopleModalMain>
            {isLoading && <Loading size={32} />}
        </ModalCard>
    );
};

export default LikedPeopleModal;

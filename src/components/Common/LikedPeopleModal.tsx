import Loading from "components/Common/Loading";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        getLikedPeople(1, modalInfo.type, modalInfo.id)
            .then((data) => {
                setLikedPeople(data);
                setCurrentPage((prev) => prev + 1);
            })
            .finally(() => setIsLoading(false));
    }, [modalInfo.id, modalInfo.type]);

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <div>좋아요</div>
            <div>
                {likedPeople.map((personObj) => (
                    <div key={personObj.member.id}>
                        {personObj.member.username}
                    </div>
                ))}
            </div>
            {isLoading && <Loading size={32} />}
        </ModalCard>
    );
};

export default LikedPeopleModal;

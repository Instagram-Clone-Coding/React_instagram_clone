import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";
import CloseSVG from "assets/Svgs/CloseSVG";
import { authorizedCustomAxios } from "customAxios";
import { useParams } from "react-router-dom";
import Loading from "../../Common/Loading";


const FollowerModalInner = styled.div`
  padding-top: 30px;

  .header {

    margin-top: -30px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;

    svg {
      cursor: pointer;
    }

    h1 {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    .one-person {
      height: 54px;
      padding: 8px 16px;
      display: flex;

      .person-info {
        display: flex;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }

        .person-name-container {
          display: flex;
          flex-direction: column;


          .username {
            font-weight: 600;
          }

          .follow-guide {
            font-size: 12px;
            line-height: 16px;
            font-weight: 600;
            color: #0095f6;
            cursor: pointer;
          }


          .name {
            color: #8e8e8e;
          }
        }

      }

      .action-button {
        margin-left: auto;
        padding: 5px 9px;
        display: flex;
        align-items: center;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
      }
    }
  }

`;

interface FollowerModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    isFollowerModal: boolean;
}

const FollowerModal = ({ onModalOn, onModalOff, isFollowerModal }: FollowerModalProps) => {
    const { username } = useParams<{ username: string }>();
    const [people, setPeople] = useState<Profile.personType[]>([]);
    const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);

    const getPeople = async () => {
        const { data } = await authorizedCustomAxios.get(`/${username}/${isFollowerModal ? "followers" : "following"}`);
        setPeople(data.data);
    };
    useEffect(() => {
        getPeople();
    }, []);

    const followHandler = async (username: string) => {
        setIsFollowLoading(true);
        await authorizedCustomAxios.post(`/${username}/follow`);
        setIsFollowLoading(false);
    };
    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        ><FollowerModalInner>
            <div className="header">
                <div className="dummy"></div>
                <h1>{isFollowerModal ? "팔로워" : "팔로우"}</h1>
                <CloseSVG color={"#262626"} size={"24"} onClick={onModalOff} />
            </div>
            <div className="content">
                {people.map(person => (
                    <div className={"one-person"} key={person.username}>
                        <div className="person-info">
                            <img src={person.image.imageUrl} alt={person.image.imageName} />
                            <div className="person-name-container">
                                <div>
                                    <span className="username">{person.username}</span>
                                    {/*나이거나 내가 이미 팔로우했다면 팔로우 가이드를 보여주면 안된다*/}
                                    {!person.me && !person.isFollowing &&
                                    <>
                                        {
                                            isFollowLoading ?
                                                <Loading size={18} />
                                                :
                                                <span className="follow-guide"
                                                      onClick={async () => {
                                                          await followHandler(person.username);
                                                          await getPeople();
                                                      }
                                                      }> · 팔로우
                                        </span>
                                        }
                                    </>
                                    }
                                </div>
                                <span className="name">{person.name}</span>
                            </div>
                        </div>
                        {isFollowerModal ? <button className="action-button">
                                삭제
                            </button> :
                            <button className={"action-button"}>
                                팔로잉
                            </button>
                        }
                    </div>
                ))}
            </div>
        </FollowerModalInner></ModalCard>
    );
};

export default FollowerModal;
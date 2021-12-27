import styled from "styled-components";
import PhoneImg from "assets/Images/home-phone.png";
import home from "assets/Images/slider/home.jpg";
import Edit from "assets/Images/slider/ImageEdit.jpg";
import takephoto from "assets/Images/slider/takePhoto.jpg";
import talk from "assets/Images/slider/talk.jpg";
import InstagramImg from "assets/Images/slider/instagram.jpg";
import { useEffect, useRef } from "react";

export function ShowingInstagram() {
    const ref = useRef<HTMLDivElement>(null);
    let index = 1;

    useEffect(() => {
        let ImgNumber = ref.current?.children;
        const TimerId = setInterval(() => {
            // 이전배경 지우기
            const backGround = document.querySelector(".background");
            backGround?.classList.remove("background");

            // 현재 사진 -> 배경으로
            const prev = document.querySelector(".visible");
            prev?.classList.remove("visible");
            prev?.classList.add("background");

            // 다음 사진 보이게
            const point = ImgNumber?.item(index);
            point?.classList.add("visible");
            index++;

            if (index === ImgNumber?.length) {
                index = 0;
            }
        }, 5000);

        return function clean() {
            clearInterval(TimerId);
        };
    }, [index]);

    return (
        <Background>
            <Slider ref={ref}>
                {SlideImg.map((img, order) => {
                    return order === 0 ? (
                        <Image src={img} className="visible" />
                    ) : (
                        <Image src={img} />
                    );
                })}
            </Slider>
        </Background>
    );
}

const SlideImg = [home, Edit, talk, takephoto, InstagramImg];

const Background = styled.div`
    background-image: url(${PhoneImg});
    background-size: 454px 618px;
    height: 618px;
    margin-left: -35px;
    margin-right: -15px;
    flex-basis: 454px;
    @media (max-width: 875px) {
        display: none;
    }
`;

const Slider = styled.div`
    margin: 99px 0 0 151px;

    .background {
        opacity: 1;
        visibility: visible;
        position: absolute;
        z-index: 1;
    }

    .visible {
        opacity: 1;
        visibility: visible;
        transition: opacity 1.5s ease-in;
        z-index: 2;
    }
`;

const Image = styled.img`
    opacity: 0;
    visibility: hidden;
    position: absolute;
`;

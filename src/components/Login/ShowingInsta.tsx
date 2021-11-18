import styled from "styled-components";
import PhoneImg from "images/Login/home-phone.png";
import home from "images/Login/slider/home.jpg";
import Edit from "images/Login/slider/ImageEdit.jpg";
import takephoto from "images/Login/slider/takePhoto.jpg";
import talk from "images/Login/slider/talk.jpg";
import InstagramImg from "images/Login/slider/instagram.jpg";
import { useEffect, useState } from "react";

export function ShowingInstagram() {
    const [index, setIndex] = useState(-1);
    const imgLen = SlideImg.length;

    useEffect(() => {
        const TimerId = setInterval(() => {
            const updateIndex = index + 1 === imgLen ? 0 : index + 1;
            setIndex(updateIndex);
        }, 5000);

        return function clean() {
            clearInterval(TimerId);
        };
    }, [index]);

    return (
        <Background>
            <Slider>
                {SlideImg.map((img, order) => {
                    const isBackground = order === index ? true : false;
                    const isShow =
                        order === (index + 1) % imgLen ? true : false;
                    return (
                        <Image
                            key={order}
                            src={img}
                            background={isBackground}
                            show={isShow}
                        />
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

interface imgStateProps {
    show: Boolean;
    background: Boolean;
}

const Slider = styled.div`
    margin: 99px 0 0 151px;
`;

const Image = styled.img<imgStateProps>`
    position: absolute;
    opacity: ${(props) => (props.show || props.background ? 1 : 0)};
    z-index: ${(props) => (props.show ? 2 : 1)};
    visibility: ${(props) =>
        props.show || props.background ? `visible` : `hidden`};
    ${(props) => props.show && `transition: opacity 1.5s ease-in;`}
`;

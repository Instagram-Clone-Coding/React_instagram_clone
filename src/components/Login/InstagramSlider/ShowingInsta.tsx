import styled from "styled-components";
import PhoneImg from "assets/Images/home-phone.png";
import home from "assets/Images/slider/home.jpg";
import Edit from "assets/Images/slider/ImageEdit.jpg";
import takephoto from "assets/Images/slider/takePhoto.jpg";
import talk from "assets/Images/slider/talk.jpg";
import InstagramImg from "assets/Images/slider/instagram.jpg";
import { useState, useEffect } from "react";

/**
 * index로 배경 이미지, 애니메이션으로 보여줄 이미지를 선택한다.
 * 1) 애니메이션은 현재 보이는 사진을 배경으로 두고, 그 위에 렌더링되는 식으로 작동한다.
 * 2) 현재 보이는 이미지를 배경으로 만들고, 다음순서의 이미지를 보여주도록 설정한다.
 * 배경이미지: index === order,
 * 보여줄 이미지: index + 1 === order,
 *
 * 주의할 케이스
 * 1) 최초로 렌더링 될 때, 애니메이션 없이 첫 이미지만 보여야한다.
 *    --> 배경없이 첫 이미지만 보이게 하기위해 -1로 초기값을 설정한다.
 * 2) 마지막 이미지와 첫번째 이미지 연결
 * 마지막 이미지가 렌더링 된 후, 마지막 이미지를 배경으로 두고, 첫번째 이미지를 보여줘야한다.
 *    --> 모듈러 연산을 이용함.
 *
 */

const SliderContainer = styled.div`
    background-image: url(${PhoneImg});
    background-size: 454px 618px;
    height: 618px;
    margin-left: -35px;
    margin-right: -15px;
    flex-basis: 454px;
    align-self: center;
    @media (max-width: 875px) {
        display: none;
    }

    .slider {
        margin: 99px 0 0 151px;
    }
`;

const Image = styled.img<imageStateProps>`
    position: absolute;
    opacity: ${(props) => (props.show || props.background ? 1 : 0)};
    z-index: ${(props) => (props.show ? 2 : 1)};
    visibility: ${(props) =>
        props.show || props.background ? `visible` : `hidden`};
    ${(props) => props.show && `transition: opacity 1.5s ease-in;`}
`;

interface imageStateProps {
    show: boolean;
    background: boolean;
}

const SlideImage = [home, Edit, talk, takephoto, InstagramImg];
const IMAGE_LENGTH = SlideImage.length;

export default function ShowingInstagram() {
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        const TimerId = setInterval(() => {
            const updateIndex = index + 1 === IMAGE_LENGTH ? 0 : index + 1;
            setIndex(updateIndex);
        }, 5000);
        return function clean() {
            clearInterval(TimerId);
        };
    }, [index]);

    return (
        <SliderContainer>
            <div className="slider">
                {SlideImage.map((img, order) => {
                    const isBackground = order === index ? true : false;
                    const isShow =
                        order === (index + 1) % IMAGE_LENGTH ? true : false;
                    return (
                        <Image
                            key={order}
                            src={img}
                            background={isBackground}
                            show={isShow}
                        />
                    );
                })}
            </div>
        </SliderContainer>
    );
}

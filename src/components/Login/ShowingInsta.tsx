import styled from "styled-components";
import PhoneImg from "images/home-phone.png";

export function ShowingInstagram() {
    return (
        <Background>
            {/* <div>
                <Images />
            </div> */}
        </Background>
    );
}

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

import styled from "styled-components";
import { ReactComponent as InstagramLogoLoading } from "assets/Svgs/instagram-logo-loading.svg";

const StyledInstagramLoading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
`;

const InstagramLoading = () => {
    return (
        <StyledInstagramLoading>
            <InstagramLogoLoading />
        </StyledInstagramLoading>
    );
};

export default InstagramLoading;

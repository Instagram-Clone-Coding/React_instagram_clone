import styled from "styled-components";

const StyledAside = styled.aside`
    max-width: 293px;
    width: 100%;
    @media (max-width: 1000px) {
        display: none;
    }
`;

const HomeAside = () => {
    return <StyledAside>aside</StyledAside>;
};

export default HomeAside;

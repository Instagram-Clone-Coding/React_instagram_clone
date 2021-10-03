import styled from "styled-components";
import { NewCard } from "./LoginContent";
import { Link } from "react-router-dom";

export interface Linkdata {
    router: string;
    message: string;
    linker: string;
}

const LinkBox = ({ router, message, linker }: Linkdata) => {
    // size
    const Box = {
        radius: 1,
        height: 63,
    };

    // style
    const P = styled.p`
        margin: 15px;
        font-size: 14px;
        a {
            text-decoration: none;
        }
        span {
            font-weight: ${(props) => props.theme.font.bold};
            color: ${(props) => props.theme.color.blue};
            padding-left: 3px;
        }
    `;

    return (
        <NewCard radius={Box.radius} height={Box.height}>
            <div>
                <P>
                    {message}
                    <Link to={router}>
                        <span>{linker}</span>
                    </Link>
                </P>
            </div>
        </NewCard>
    );
};

export default LinkBox;

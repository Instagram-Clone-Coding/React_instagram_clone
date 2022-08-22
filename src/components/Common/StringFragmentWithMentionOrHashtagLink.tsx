import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMentionOrHashtagLink = styled(Link)`
    color: ${(props) => props.theme.font.link_blue};
    text-decoration: none;
`;

interface StringFragmentWithMentionOrHashtagLinkProps {
    str: string;
    mentions: string[];
    hashtags: string[];
}

const StringFragmentWithMentionOrHashtagLink = ({
    str,
    mentions,
    hashtags,
}: StringFragmentWithMentionOrHashtagLinkProps) => {
    return (
        <>
            {str.split(/([@#][^\s#@]+)/g).map((ele) => {
                for (const mention of mentions) {
                    if ("@" + mention === ele)
                        return (
                            <StyledMentionOrHashtagLink
                                to={`/profile/${mention}`}
                                key={mention}
                            >
                                {ele}
                            </StyledMentionOrHashtagLink>
                        );
                }
                for (const hashtag of hashtags) {
                    if ("#" + hashtag === ele)
                        return (
                            <StyledMentionOrHashtagLink
                                to={`/hashtag/${hashtag}`}
                                key={hashtag}
                            >
                                {ele}
                            </StyledMentionOrHashtagLink>
                        );
                }
                return ele;
            })}
        </>
    );
};

export default StringFragmentWithMentionOrHashtagLink;

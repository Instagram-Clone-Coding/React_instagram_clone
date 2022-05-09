import Aside from "components/Edit/Aside/Aside";
import Section from "components/Edit/Section/Section";
import React from "react";
import styled from "styled-components";
import theme from "styles/theme";

const Layout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;

    @media (max-width: 935px) {
        padding: 0;
    }
    .container {
        display: flex;

        width: 100%;
        max-width: 935px;
        background-color: #fff;

        aside {
            width: 250px;
            position: relative;
        }

        section {
            flex: 1 1 auto;
        }

        @media (max-width: 935px) {
            aside {
                width: 200px;
            }

            section {
            }
        }
    }
`;

const Edit = () => {
    const borderStyle = `1px solid ${theme.color.bd_gray}`;

    return (
        <Layout style={{ backgroundColor: theme.color.bg_gray }}>
            <div className="container" style={{ border: borderStyle }}>
                <aside style={{ borderRight: borderStyle }}>
                    <Aside />
                </aside>
                <section>
                    <Section />
                </section>
            </div>
        </Layout>
    );
};

export default Edit;

import styled from "styled-components";
import theme from "styles/theme";

import { useEffect, useState } from "react";
import AsideBody from "components/Direct/Aside/AsideBody";
import AsideHeader from "components/Direct/Aside/AsideHeader";
import SectionBody from "components/Direct/Section/SectionBody";
import SectionHeader from "components/Direct/Section/SectionHeader";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import InboxSection from "../../components/Direct/Section/InboxSection";


const Direct = () => {

    const [currentSectionView, setCurrentSectionView] = useState<Direct.currentSectionViewType>("chat");
    const [message, setMessage] = useState<string>("");
    const dispatch = useAppDispatch();
    const { view } = useAppSelector((state => state.direct));


    // title 변경해주는 역할
    // Todo: (1) 이 부분 데이터 받아서 안 읽은 메세지 개수로 처리해줘야 합니다.
    useEffect(() => {
        document.title = "(1) 받은 메세지함 · Direct";
    }, []);


    const borderStyle = `1px solid ${theme.color.bd_gray}`;
    return (
        <Layout style={{ backgroundColor: theme.color.bg_gray }}>
            <Container style={{ border: borderStyle }}>
                {/* aside */}
                <aside style={{ borderRight: borderStyle }}>
                    <AsideHeader />
                    <AsideBody />
                </aside>
                {/* body */}
                <section>
                    {
                        view === "inbox" ? <InboxSection /> : <>
                            <SectionHeader />
                            <SectionBody message={message} setMessage={setMessage} />
                        </>
                    }

                </section>
            </Container>
        </Layout>
    );
};

export default Direct;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 54px);
  padding: 20px;

  @media (max-width: 935px) {
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  max-width: 935px;
  background-color: #fff;

  aside {
    width: 350px;
  }

  section {
    flex: 1 1 auto;
  }

  @media (max-width: 935px) {
    aside {
      width: 300px;
    }

    section {
    }
  }
`;

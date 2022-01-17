import styled from "styled-components";
import { ReactComponent as ArrowUp } from "assets/Svgs/arrow-up.svg";
import { ReactComponent as DmWrite } from "assets/Svgs/dm-write.svg";
import theme from "styles/theme";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { openModal } from "app/ducks/direct/DirectSlice";
import NewChatModal from "components/Direct/Section/Modals/NewChatModal/NewChatModal";
import ConvertAccountModal from "components/Direct/Section/Modals/ConvertAccountModal";

const Container = styled.header`
  svg {
    cursor: pointer;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid ${theme.color.bd_gray};
`;

const NickWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  cursor: pointer;

  & > p {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(var(--i1d, 38, 38, 38), 1);
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Rotate = styled.span`
  display: inline-block;
  transform: rotate(180deg);
  padding: 8px;
`;


const AsideHeader = () => {

    const dispatch = useAppDispatch();
    const { modal } = useAppSelector((state => state.direct));

    return (
        <Container>
            <HeaderTop>
                <NickWrapper onClick={() => {
                    dispatch(openModal("convertAccount"));
                }}>
                    <p>minsoo_web</p>
                    <Rotate>
                        <ArrowUp />
                    </Rotate>
                </NickWrapper>
                <DmWrite onClick={() => {
                    dispatch(openModal("newChat"));
                }} />
            </HeaderTop>

            {
                modal === "newChat" && <NewChatModal visible={modal === "newChat"} />
            }
            {
                modal === "convertAccount" && <ConvertAccountModal visible={modal === "convertAccount"} />
            }
        </Container>
    );
};

export default AsideHeader;

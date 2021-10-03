import styled from "styled-components";

// interface
interface InputType {
    radius?: number;
    width?: number;
    height?: number;
    fontSize?: number;
    fontColor?: string;
}

interface FormType {
    description: string;
    inputType: string;
}

// styled component
const InputBox = styled.div<InputType>`
    margin: 0 40px 6px 40px;
    div {
        display: flex;
        align-items: center;
        margin: 0px;
        border: 0px;
        border: 1px solid ${(props) => props.theme.color.bd_gray};
        border-radius: ${(props) => props.radius || 3}px;
        background-color: ${(props) => props.theme.color.bg_gray};
        width: ${(props) => (props.width ? props.width : 268)}px;
        height: ${(props) => (props.height ? props.height : 38)}px;
        label {
            display: flex;
            position: relative;
            width: 100%;
            height: 100%;
            span {
                position: relative;
                padding-left: 9px;
                line-height: 36px;
                z-index: 2;
                font-size: ${(props) =>
                    props.fontSize ? props.fontSize : 12}px;
                color: ${(props) => props.fontColor || "#8e8e8e"};
            }
            input {
                width: ${(props) => (props.width ? props.width - 2 : 266)}px;
                height: ${(props) => (props.height ? props.height - 2 : 36)}px;
                position: absolute;
                z-index: 1;
                padding: 9px 0 7px 8px;
                font-size: 14px;
                border: 0;
            }
        }
        .checkState {
            width: auto;
            height: ${(props) => (props.height ? props.height - 2 : 38)}px;
            padding-right: 8px;
        }
    }
`;

export const Form = ({ description, inputType }: FormType) => {
    // const [event, setEvent] = useState(false);
    // const onChange = (e: any) => {
    //     let animation: boolean = false;
    //     if (e.target.value.length >= 1) {
    //         animation = true;
    //     }
    // };

    // transform: ${(props) =>
    //     props.animation
    //         ? undefined
    //         : " scale(.83333) translateY(-10px)"};

    return (
        <InputBox>
            <div>
                <label>
                    <span>{description}</span>
                    <input type={inputType} />
                </label>
                <div className="checkState"></div>
            </div>
        </InputBox>
    );
};

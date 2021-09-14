import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            bg_gray: string;
            bg_white: string;
            bd_gray: string;
            blue: string;
        };
        font: {
            bold: number;
        };
    }
}

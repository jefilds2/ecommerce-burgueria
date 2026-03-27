import styled from "styled-components";

export const FooterContainer = styled.footer`
    height: 50px;
    background-color: ${(props) => props.theme.darkPurple};
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        color: ${(props) => props.theme.white};
        font-size: 14px;
        font-weight: 300;
    }
`;
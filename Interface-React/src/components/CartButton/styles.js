import styled from "styled-components";

export const ConteinerButton = styled.button`
    background: ${(props) => props.theme.purple};
    width: 100%;
    height: 52px;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 30px;
    color: ${(props) => props.theme.white}fff;

    &:hover {
        background-color: #6f3575;
    }
`;
import styled from "styled-components";
import ReactSelect from "react-select";
import { Button } from "../../../components/Button";


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 89vh;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
`;

export const Form = styled.form`
    border-radius: 20px;
    background-color: ${(props) => props.theme.black};
    padding: 32px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

`;

export const Label = styled.label`
    color: ${(props) => props.theme.white};
    font-size: 14px;
`;

export const Input = styled.input`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    border: none;
    padding: 0 12px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 25px;
`;

export const ErrorMessage = styled.span`
    color: ${(props) => props.theme.darkRed};
    font-size: 14px;
    line-height: 80%;
    font-weight: 600;
`;

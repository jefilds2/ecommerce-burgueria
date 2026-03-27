import styled from 'styled-components';
import Texture from '../../assets/background-login.jpg';
import Backgroud from '../../assets/background.png';

export const Container = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.secondWhite};
    min-height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.9),
        rgba(255,255,255,0.9)), 
        url(${Backgroud});
`;

export const Banner = styled.div`
    background: url('${Texture}');
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.mainBlack};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 180px;

    img {
        height: 180px;
    }
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    padding-bottom: 12px;
    color: ${(props) => props.theme.gren};
    text-align: center;
    position: relative;

    &::after {
        content: '';
        width: 56px;
        height: 4px;
        background-color: ${(props) => props.theme.gren};
        position: absolute;
        bottom: 0;
        left: calc(50% + -28px);
    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 30%;
    gap: 40px;
    width: 100%;
    max-width: 1280px;
    padding: 40px;
    margin: 0 auto;
`;


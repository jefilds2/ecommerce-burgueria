import styled from "styled-components";
import BannerMenu from "../../assets/BannerMenu.svg"
import Background from '../../assets/background.png';
import { Link } from "react-router-dom";

export const Banner = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 480px;
   width: 100%;
   position: relative;

   background: url('${BannerMenu}') no-repeat;
   background-position: center;
   background-color: ${(props) => props.theme.mainBlack};
   background-size: cover;

   h1{
      font-family: "Road Rage", sans-serif;
      font-size: 80px;
      line-height: 65px;
      color: ${(props) => props.theme.white};

      position: absolute;
      right: 20%;
      top: 30%;

    span {
      display: block;
      color: ${(props) => props.theme.white};
      font-size: 20px;
      font-weight: 400;
    }  
   }
`;

export const Conteiner = styled.div`
   width: 100%;
   min-height: 100vh;
   background-color: ${(props) => props.theme.secondWhite};
    background: linear-gradient(
        rgba(255,255,255,0.9),
        rgba(255,255,255,0.9)), 
        url(${Background});   
   
`;

export const CategoryMenu = styled.div`
   display: flex;
   justify-content: center;
   gap: 50px;
   margin-top: 30px;
`;

export const ProductsConteiner = styled.div`
   display: grid;
   grid-template-columns: repeat(3,  1fr);
   padding: 40px;
   justify-content: center;
   max-width: 1280px;
   gap: 60px;
   margin: 50px auto;
`;

export const CategoryButton = styled(Link)`
   text-decoration: none;
   cursor: pointer;
   background: none;
   color: ${props =>
      props.$isActiveCategory
         ? (props) => props.theme.purple
         : '#696969'};
   font-size: 24px;
   font-weight: 500px;
   padding-bottom: 5px;
   line-height: 20px;
   border: none;
   border-bottom: ${props =>
      props.$isActiveCategory
      && `3px solid ${(props) => props.theme.purple}`};

`;

export const ReturnButton = styled(Link)`
   display: flex;
   justify-content: center;
   font-family: "Poppins", sans-serif;
   font-size: 16px;
   font-weight: 600;
   color: ${(props) => props.theme.darkPurple};
   background: none;
   border: none;
   cursor: pointer;
   width: 100%;
   padding: 35px 0; 
   text-decoration: none;

   &:hover {
      color: #696969;
   }
`;
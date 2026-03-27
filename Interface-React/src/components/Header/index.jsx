import { CartBadge, CartIconWrapper, Conteiner, Content, HeaderLink, LinkConteiner, Logout, Navigation, Options, Profile } from "./styles";
import { ShoppingCartIcon, UserCircleIcon } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import { useCart } from "../../hooks/CartContext";

export function Header() {
    const navigate = useNavigate();
    const { pathname } = useResolvedPath();
    const { logout, userInfo } = useUser();
    const { cartProducts } = useCart();

    const totalProductsInCart = cartProducts.reduce((acc, product) => {
        return acc + product.quantity;
    }, 0);

    function logoutUser() {
        logout();
        navigate("/login");
    }

    return (
        <Conteiner>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === "/"}>Home</HeaderLink>
                        <hr></hr>
                        <HeaderLink to="/cardapio" $isActive={pathname === "/cardapio"}>Cadápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>

                    <Profile>
                        <UserCircleIcon color="#fff" size={24} />
                        <div>
                            <p>Olá, <span>{userInfo.name}</span></p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>

                    <LinkConteiner>
                        <CartIconWrapper>
                            <ShoppingCartIcon size={24} color="#fff" />
                            {totalProductsInCart > 0 && (
                                <CartBadge>{totalProductsInCart}</CartBadge>
                            )}
                        </CartIconWrapper>

                        <HeaderLink to="/carrinho">Meu carrinho</HeaderLink>
                    </LinkConteiner>

                </Options>
            </Content>
        </Conteiner>
    );
}
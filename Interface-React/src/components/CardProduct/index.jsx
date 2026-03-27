import PropTypes from "prop-types";
import { CardImage, Conteiner } from "./styles";
import { CartButton } from "../CartButton";
import { useCart } from "../../hooks/CartContext";

export function CardProduct({ product }) {

    const { putProductInCart } = useCart();

    return (
        <Conteiner>
            <CardImage src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>{product.currencyValue}</strong>
            </div>
            <CartButton onClick={() => putProductInCart(product)}></CartButton>
        </Conteiner>
    );
}

CardProduct.propTypes = {
    product: PropTypes.object,
};
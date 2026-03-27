import Cart from '../../assets/cart.svg'
import { ConteinerButton } from './styles'

export function CartButton(props) {
    return (
        <ConteinerButton {...props}>
            <img src={Cart} alt="carrinho-de-compras" />
        </ConteinerButton>
    )
}

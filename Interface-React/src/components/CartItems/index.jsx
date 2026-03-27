import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../index';
import { ButtonGroup, EmptyCart, ProductImage, TotalPrice, TrashImage } from './styles';
import TrashIcon from '../../assets/trash.svg';

export function CartItems() {
    const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } = useCart();

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts?.length ? (
                    cartProducts.map((product) => (
                        <Table.Tr key={product.id}>
                            <Table.Td>
                                <ProductImage src={product.url} alt={product.name} />
                            </Table.Td>
                            <Table.Td> {product.name}</Table.Td>
                            <Table.Td> {product.currencyValue}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button title="deletar 1 item no carrinho" onClick={() => decreaseProduct(product.id)}>-</button>
                                    {product.quantity}
                                    <button title="adicionar 1 item no carrinho" onClick={() => increaseProduct(product.id)}>+</button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>
                                <TotalPrice>
                                    {formatPrice(product.price * product.quantity)}
                                </TotalPrice>
                            </Table.Td>
                            <Table.Td>
                                <TrashImage src={TrashIcon} alt="lixeira" title="Excluir item do carrinho" onClick={() => deleteProduct(product.id, true)} />
                            </Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={6}>
                            <EmptyCart>Nenhum produto no carrinho</EmptyCart>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Body>
        </Table.Root >
    );
}
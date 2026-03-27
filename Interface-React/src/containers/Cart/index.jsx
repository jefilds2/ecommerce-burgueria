import Logo from '../../assets/logo.png';
import { CartItems, CartResume } from '../../components';
import { Container, Title, Content, Banner } from './styles';

export function Cart() {
    return (
        <Container>
            <Banner>
                <img src={Logo} alt="logo-empresa" />
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content>
                <CartItems />
                <CartResume />
            </Content>
        </Container>
    );
}
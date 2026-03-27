import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/CartContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";

import { Conteiner } from "./styles"
import { Button } from "../Button"

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax, setDeliveryTax] = useState(0);

    const navigate = useNavigate();

    const { cartProducts, clearCart } = useCart();

    useEffect(() => {
        async function loadDeliveryTax() {
            try {
                const { data } = await api.get("/delivery-fee");

                // backend retorna 8.5, mas seu front parece trabalhar em centavos
                const deliveryTaxInCents = Math.round(Number(data.value) * 100);

                setDeliveryTax(deliveryTaxInCents);
            } catch (error) {
                toast.error("Erro ao carregar taxa de entrega");
                setDeliveryTax(0);
            }
        }

        loadDeliveryTax();
    }, []);


    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return acc + (current.price * current.quantity);
        }, 0);

        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    const submitOrder = async () => {
        const products = cartProducts.map(product => {
            return {
                id: product.id,
                quantity: product.quantity,
                price: product.price,
                deliveryTax: deliveryTax,
            };
        });

        try {
            const { data } = await api.post('/create-payment-intent', { products });

            navigate('/checkout', {
                state: data,
            });

        } catch (err) {
            toast.error('Erro, tente novamente!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    return (
        <div>
            <Conteiner>
                <div className="conteiner-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de Entrega</p>
                    <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
                </div>
                <div className="conteiner-bottom">
                    <p>Total</p>
                    <p>{formatPrice(finalPrice + deliveryTax)}</p>
                </div>
            </Conteiner >
            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </div>
    );
}
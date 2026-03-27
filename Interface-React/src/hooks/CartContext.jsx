import { useContext, createContext, useEffect, useState } from "react";


const CartContext = createContext({});


export const CartProvider = ({ children }) => {

    const [cartProducts, setCartProducts] = useState([]);

    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);

        let newCartProducts = [];

        if (cartIndex >= 0) {
            newCartProducts = cartProducts.map((prd) =>
                prd.id === product.id
                    ? { ...prd, quantity: prd.quantity + 1 }
                    : prd
            );
        } else {
            newCartProducts = [...cartProducts, { ...product, quantity: 1 }];
        }

        setCartProducts(newCartProducts);
        updateLocalStorage(newCartProducts);
    };


    const clearCart = () => {
        setCartProducts([]);
        updateLocalStorage([]);
    }

    const deleteProduct = (productId) => {
        const newCart = cartProducts.filter((prd) => prd.id !== productId);

        setCartProducts(newCart);
        updateLocalStorage(newCart);

    }

    const increaseProduct = (productId) => {

        const newCart = cartProducts.map(prd => {

            return prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd;
        });

        setCartProducts(newCart);
        updateLocalStorage(newCart);
    }

    const decreaseProduct = (productId) => {

        const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

        if (cartProducts[cartIndex].quantity > 1) {

            const newCart = cartProducts.map(prd => {

                return prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd;

            });

            setCartProducts(newCart);
            updateLocalStorage(newCart);

        } else {

            deleteProduct(productId);

        }

    }

    function updateLocalStorage(products) {
        localStorage.setItem("cartProducts", JSON.stringify(products));
    };

    useEffect(() => {
        const clientCartData = localStorage.getItem("cartProducts");

        if (clientCartData) {
            setCartProducts(JSON.parse(clientCartData));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cartProducts, putProductInCart, clearCart, deleteProduct, increaseProduct, decreaseProduct }}>
            {children}
        </CartContext.Provider>

    )
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a context provider");
    }

    return context;
}

import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, Menu, Cart, Checkout, Completepayment, Orders, NewProduct, EditProduct, Products, CategoriesProducts, TaxaEntrega } from "../containers";
import { UserLayout } from "../layouts/UserLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProtectedRoute } from "../components/index.js"



export function Router() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cardapio" element={<Menu />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/carrinho" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/pagamento" element={<Completepayment />} />
                </Route>
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/pedidos" element={<Orders />} />
                <Route path="/admin/novo-produto" element={<NewProduct />} />
                <Route path="/admin/editar-produto" element={<EditProduct />} />
                <Route path="/admin/produtos" element={<Products />} />
                <Route path="/admin/categorias" element={<CategoriesProducts />} />
                <Route path="/admin/tax-delivery" element={<TaxaEntrega />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />

        </Routes>


    )
};

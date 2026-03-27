import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Banner, CategoryButton, CategoryMenu, Conteiner, ProductsConteiner, ReturnButton } from "./styles";
import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/CardProduct";
import { useLocation, useNavigate } from "react-router-dom";

export function Menu() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const navigate = useNavigate();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);


    const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        const categoryId = Number(new URLSearchParams(search).get('categoria')) || 0;
        setActiveCategory(categoryId);
    }, [search]);

    useEffect(() => {

        async function loadCategories() {
            try { // AJUSTE: adicionado try/catch para tratar erro 401
                const { data } = await api.get('/categories');

                const newCategories = [{ id: 0, name: 'Todas' }, ...data];

                setCategories(newCategories);
            } catch (error) {
                if (error.response?.status === 401) { // AJUSTE: se retornar 401, redireciona para login
                    navigate('/login');
                    return;
                }

                console.error('Erro ao carregar categorias:', error); // AJUSTE: log de erro para outros casos
            }
        }

        async function loadProducts() {
            try { // AJUSTE: adicionado try/catch para tratar erro 401
                const { data } = await api.get('/products');

                const newProducts = data.map((product) => ({
                    currencyValue: formatPrice(product.price),
                    ...product,
                }));

                setProducts(newProducts);
            } catch (error) {
                if (error.response?.status === 401) { // AJUSTE: se retornar 401, redireciona para login
                    navigate('/login');
                    return;
                }

                console.error('Erro ao carregar produtos:', error); // AJUSTE: log de erro para outros casos
            }
        }

        const userData = JSON.parse(localStorage.getItem('burguer:userData') || '{}'); // AJUSTE: busca dados do usuário no localStorage


        loadCategories();
        loadProducts();

    }, [navigate]);

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(
                (product) => Number(product.category_id) === activeCategory,
            );

            setFilteredProducts(newFilteredProducts);
        }

    }, [products, activeCategory]);

    return (
        <Conteiner>
            <Banner>
                <h1>
                    O MELHOR
                    <br />
                    HAMBURGUER
                    <br />
                    ESTÁ AQUI

                    <span>
                        Esse cardápio está irresistível.
                    </span>
                </h1>


            </Banner>

            <CategoryMenu>
                {
                    categories.map((category) => (
                        <CategoryButton key={category.id}
                            $isActiveCategory={category.id === activeCategory}
                            onClick={() => {
                                navigate(
                                    {
                                        pathname: '/cardapio',
                                        search: `?categoria=${category.id}`,
                                    },
                                    {
                                        replace: true
                                    },

                                );

                                setActiveCategory(category.id);
                            }}
                        >{category.name}</CategoryButton>
                    ))
                }
            </CategoryMenu>

            <ProductsConteiner>
                {
                    filteredProducts.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))
                }
            </ProductsConteiner>
            <ReturnButton to="/">{'< Voltar'}</ReturnButton>

        </Conteiner>
    )
}
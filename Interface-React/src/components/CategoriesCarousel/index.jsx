/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CategoryButton, Container, ConteinerItems, Title } from "./styles";
import { Link, useNavigate } from "react-router-dom";



export function CategoriesCarousel() {
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            try {
                const userData = JSON.parse(localStorage.getItem("burguer:userData") || "{}");

                const { data } = await api.get("/categories");
                setCategories(data);
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Erro ao carregar categorias:", error);
                }
            }
        }

        loadCategories();
    }, [navigate]);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1280, min: 690 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 690, min: 0 },
            items: 2,
        },
    };

    return (
        <Container>
            <Title>Categorias</Title>

            <Carousel
                responsive={responsive}
                infinite={true}
                partialVisible={false}
                itemClass="carousel-item"
            >
                {categories.map((category) => (
                    <ConteinerItems key={category.id} $imageUrl={category.url}>
                        <CategoryButton
                            as={Link}
                            to={`/cardapio?categoria=${category.id}`}
                        >
                            {category.name}
                        </CategoryButton>
                    </ConteinerItems>
                ))}
            </Carousel>

        </Container>
    )
};
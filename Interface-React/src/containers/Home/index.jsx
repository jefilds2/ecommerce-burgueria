import { Banner, Conteiner } from "./styles";
import { CategoriesCarousel } from "../../components/CategoriesCarousel";
import { OffersCarousel } from "../../components/OffersCarousel";

export function Home() {
    return (
        <main>
            <Banner>
                <h1>Bem-Vindo(a)</h1>
            </Banner>
            <Conteiner>
                <div>
                    <CategoriesCarousel />
                    <OffersCarousel />
                </div>
            </Conteiner>
        </main>
    )
}
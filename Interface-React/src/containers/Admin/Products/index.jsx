import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { Container, DeletButton, EditButton, ProductImage } from "./styles";
import { formatPrice } from '../../../utils/formatPrice';
import { PencilLineIcon, TrashIcon, XCircleIcon, } from '@phosphor-icons/react';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { useNavigate } from 'react-router-dom';



export function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function loadProducts() {
            const { data } = await api.get('/products');

            setProducts(data);
        }

        loadProducts();

    }, []);

    function isOffer(offer) {
        if (offer) {
            return <CheckCircleIcon size={25} color='#61A120' />;
        } else {
            return <XCircleIcon size={25} color='#FF3205' />;
        }
    }

    function editProduct(product) {
        navigate('/admin/editar-produto', { state: { product } });
    }

    async function deleteProduct(productId) {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este produto?');

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/products/${productId}`);

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );

            alert('Produto deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            alert('Erro ao deletar o produto.');
        }
    }


    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produto em Oferta</TableCell>
                            <TableCell align="center">Imagem do Produto</TableCell>
                            <TableCell align="center">Editar</TableCell>
                            <TableCell align="center">Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                                <TableCell align="center"><ProductImage src={product.url} /></TableCell>
                                <TableCell align="center">
                                    <EditButton onClick={() => editProduct(product)}>
                                        <PencilLineIcon size={16} weight="duotone" />
                                    </EditButton>
                                </TableCell>
                                <TableCell align="center">
                                    <DeletButton onClick={() => deleteProduct(product.id)}>
                                        <TrashIcon size={16} />
                                    </DeletButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}
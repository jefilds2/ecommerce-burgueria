import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ImageIcon } from "@phosphor-icons/react"
import { Container, Form, Input, InputGroup, Label, LabelUploud, Select, SubmitButton, ErrorMessage } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { toast } from 'react-toastify'
import { formatCurrency, currencyToCents } from "../../../utils/formatCurrency"
import { useLocation, useNavigate } from 'react-router-dom'
import { formatPrice } from '../../../utils/formatPrice'
import { ContainerCheckbox } from './styles'


const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto'),
        price: yup
            .string()
            .required('Campo obrigatório')
            .test('valid-price', 'Informe um valor válido', (value) => {
                const cents = Number((value || '').replace(/\D/g, ''));
                return cents > 0;
            }),
        category: yup.object().required('Selecione uma categoria'),
        offer: yup.bool(),
    });

export function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const { state: { product } } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');
            setCategories(data);
        }
        loadCategories();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const productFormData = new FormData();

        productFormData.append('name', data.name);
        productFormData.append('price', currencyToCents(data.price));
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando produto',
            success: 'Produto editado com sucesso',
            error: 'Ocorreu um erro ao editar o produto'
        });

        setTimeout(() => {
            navigate('/admin/produtos');
        }, 2000);
    };

    const priceRegister = register('price');

    return (

        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register("name")} defaultValue={product.name} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="R$ 0,00"
                        {...priceRegister}
                        onChange={(e) => {
                            e.target.value = formatCurrency(e.target.value);
                            priceRegister.onChange(e);
                        }}
                        defaultValue={formatPrice(product.price)}
                    />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUploud>
                        <ImageIcon />
                        <input type="file"
                            {...register('file')}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value?.target?.files[0]?.name);
                                register('file').onChange(value);
                            }}

                        />
                        {fileName || 'Upload do Produto'}
                    </LabelUploud>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        name='category'
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => String(category.id)}
                                placeholder="Selecione uma categoria"
                                menuPortalTarget={document.body}
                                defaultValue={product.category}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>
                <InputGroup>
                    <ContainerCheckbox>
                        <input type='checkbox' defaultChecked={product.offer} {...register('offer')} />
                        <Label> Produto em oferta</Label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Salvar Edição</SubmitButton>

            </Form>
        </Container>

    )
}
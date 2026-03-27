import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ImageIcon } from "@phosphor-icons/react"
import { Container, Form, Input, InputGroup, Label, LabelUploud, Select, SubmitButton, ErrorMessage, ContainerCheckbox } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { toast } from 'react-toastify'
import { formatCurrency, currencyToCents } from "../../../utils/formatCurrency"
import { useNavigate } from 'react-router-dom'

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
        file: yup.mixed().test('required', 'Selecione uma imagem', (value) => {
            return value && value.length > 0;
        }).test('fileSize', 'Carregue uma imagem até 5MB', (value) => {
            return value && value.length > 0 && value[0].size <= 5000000;
        }).test('type', 'Carregue uma imagem PNG ou JPEG', (value) => {
            return (
                value &&
                value.length > 0 &&
                (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            );
        }),
    });

export function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);
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

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Cadastrando produto',
            success: 'Produto cadastrado com sucesso',
            error: 'Ocorreu um erro ao cadastrar o produto'
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
                    <Input type="text" {...register("name")} />
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
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => String(category.id)}
                                placeholder="Selecione uma categoria"
                                menuPortalTarget={document.body}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckbox>
                        <input type='checkbox' {...register('offer')} />
                        <Label> Produto em oferta</Label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Adicionar Produto</SubmitButton>

            </Form>
        </Container>

    )
}
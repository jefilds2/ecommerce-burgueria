import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ImageIcon, XIcon } from "@phosphor-icons/react"
import { Container, Form, Input, InputGroup, Label, LabelUploud, Select, SubmitButton, ErrorMessage } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { components } from "react-select";

const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto'),
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

export function CategoriesProducts() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    async function loadCategories() {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            toast.error('Erro ao carregar categorias');
        }
    }
    useEffect(() => {
        loadCategories();
    }, []);

    async function handleDeleteCategory(categoryId) {
        try {
            await toast.promise(
                api.delete(`/categories/${categoryId}`),
                {
                    pending: 'Excluindo categoria...',
                    success: 'Categoria excluída com sucesso',
                    error: 'Erro ao excluir categoria'
                }
            );

            setCategories((prev) => prev.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error(error);
        }
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const categorytFormData = new FormData();

        categorytFormData.append('name', data.name);
        categorytFormData.append('file', data.file[0]);;

        await toast.promise(api.post('/categories', categorytFormData), {
            pending: 'Cadastrando categoria',
            success: 'Categoria cadastrado com sucesso',
            error: 'Ocorreu um erro ao cadastrar a categoria'
        });

        setTimeout(() => {
            navigate('/admin/produtos');
        }, 1000);
    };

    const CustomOption = (props) => {
        const { data } = props;
        const { onDeleteCategory } = props.selectProps;

        return (
            <components.Option {...props}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <span>{data.name}</span>

                    <button
                        type="button"
                        onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onDeleteCategory(data.id);
                        }}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            padding: 0,
                        }}
                        aria-label={`Excluir categoria ${data.name}`}
                        title="Excluir categoria"
                    >
                        <XIcon size={16} weight="bold" />
                    </button>
                </div>
            </components.Option>
        );
    };


    return (

        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <InputGroup>
                    <Label>Nome da nova categoria</Label>
                    <Input type="text" {...register("name")} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
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
                    <Label>Categoria Cadastradas</Label>
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
                                components={{ Option: CustomOption }}
                                onDeleteCategory={handleDeleteCategory}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <SubmitButton>Adicionar Categoria</SubmitButton>

            </Form>
        </Container>

    )
}
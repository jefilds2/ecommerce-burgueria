import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { api } from "../../../services/api";
import {
    Container,
    Form,
    Input,
    InputGroup,
    Label,
    SubmitButton,
    ErrorMessage
} from "./styles";

const schema = yup.object({
    value: yup
        .string()
        .required("Campo obrigatório")
        .test("valid-price", "Informe um valor válido", (value) => {
            const cents = Number((value || "").replace(/\D/g, ""));
            return cents > 0;
        }),
});

function formatCurrency(value) {
    const onlyNumbers = value.replace(/\D/g, "");

    const numberValue = Number(onlyNumbers) / 100;

    return numberValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function parseCurrencyToNumber(value) {
    return Number((value || "").replace(/\D/g, "")) / 100;
}

export function TaxaEntrega() {
    const [currentFee, setCurrentFee] = useState(0);
    const [loadingFee, setLoadingFee] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            value: "",
        },
    });

    const valueRegister = register("value");

    async function loadDeliveryFee() {
        try {
            setLoadingFee(true);

            const { data } = await api.get("/delivery-fee");

            const fee = Number(data.value) || 0;
            setCurrentFee(fee);
        } catch (error) {
            toast.error("Erro ao carregar taxa de entrega");
        } finally {
            setLoadingFee(false);
        }
    }

    useEffect(() => {
        loadDeliveryFee();
    }, []);

    const onSubmit = async (formData) => {
        try {
            const parsedValue = parseCurrencyToNumber(formData.value);

            await toast.promise(
                api.put("/delivery-fee", {
                    value: parsedValue,
                }),
                {
                    pending: "Atualizando taxa de entrega...",
                    success: "Taxa de entrega atualizada com sucesso",
                    error: "Erro ao atualizar taxa de entrega",
                }
            );

            setCurrentFee(parsedValue);
            setValue("value", "");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Digite o novo valor da taxa</Label>
                    <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="R$ 0,00"
                        {...valueRegister}
                        onChange={(e) => {
                            e.target.value = formatCurrency(e.target.value);
                            valueRegister.onChange(e);
                        }}
                    />
                    <ErrorMessage>{errors?.value?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Valor atual da taxa</Label>
                    <Input
                        type="text"
                        value={
                            loadingFee
                                ? "Carregando..."
                                : currentFee.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })
                        }
                        disabled
                        readOnly
                    />
                </InputGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                    Alterar Taxa de Entrega
                </SubmitButton>
            </Form>
        </Container>
    );
}
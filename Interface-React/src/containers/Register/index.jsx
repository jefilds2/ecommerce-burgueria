/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { set, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from '../../services/api'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { LeftDiv } from '../../components/LeftContainer';
import { Container, Form, InputContainer, RightContainer, Title, Link } from './styles';
import { Button } from '../../components/Button';

export function Register() {
  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required('O nome é obrigatório'),
      email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
      password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required(),
      confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirmação de senha é obrigatória'),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {

    try {
      const { status } = await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      },

        {
          validateStatus: () => true,
        });

      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        toast.success('Conta criada com sucesso!');
      } else if (status === 409) {
        toast.error('Email já cadastrado! Faça login ou utilize outro email.');
      } else {
        throw new Error();
      }

    } catch (error) {
      toast.error('Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
    }
  };

  return (
    <Container>
      <LeftDiv></LeftDiv>

      <RightContainer>
        <Title>
          Criar Conta
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Nome</label>
            <input type="text" placeholder="Digite seu nome" {...register("name")} />
            <p>{errors.name?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" {...register("email")} />
            <p>{errors.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" {...register("password")} />
            <p>{errors.password?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Confirmar Senha</label>
            <input type="password" placeholder="Confirme sua senha" {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
          </InputContainer>

          <Button type="submit">Criar conta</Button>

          <p>
            Já possui conta? <Link to="/login"> Clique aqui.</Link>
          </p>
        </Form>
      </RightContainer>
    </Container>
  );
}

/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from '../../services/api'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/UserContext"

import { Container, Form, InputContainer, RightContainer, Title, Link } from './styles';
import { Button } from '../../components/Button';
import { LeftDiv } from '../../components/LeftContainer';

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
      password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required(),
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
      const { data: userData, status } = await api.post('/session', {
        email: data.email,
        password: data.password,
      },

        {
          validateStatus: () => true,
        });

      if (status === 200 || status === 201) {
        toast.success('Sessão iniciada, seja bem vindo 👌');
        setTimeout(() => {
          if (userData?.admin) {
            navigate('/admin/pedidos');
          } else {
            navigate('/');
          }
        }, 3000);

        putUserData(userData);

      } else if (status === 409) {
        toast.error('Email ou senha incorretos 🤯');
      } else {
        throw new Error();
      }

    } catch (error) {
      toast.error('Ops, algo deu errado! Tente novamente. 🤯');
    }

  };

  return (
    <Container>
      <LeftDiv></LeftDiv>

      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Javão Burguer.</span>
          <br />
          Acesse com seu <span>Login e senha.</span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <Button type="submit">Entrar</Button>

          <p>
            Não possui conta? <Link to="/cadastro"> Clique aqui.</Link>
          </p>
        </Form>
      </RightContainer>
    </Container>
  );
}

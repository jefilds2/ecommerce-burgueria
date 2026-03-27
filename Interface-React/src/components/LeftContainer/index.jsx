import { LeftContainer } from './styles';
import Logo from '../../assets/logo.png';

export function LeftDiv() {
    return (
        <LeftContainer>
            <img src={Logo} alt="logo-empresa" />
        </LeftContainer>
    )
}
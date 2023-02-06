import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";
import styled from "styled-components";
import { BackGround } from "../../Components/BackGround/BackGround";
import { CallCenterComponent } from "../../Components/CallCenterImageComponent/CallCenterComponent";
import { Navigation } from "../../Components/Navigation/Navigation";
import { ButtonWrapper } from "../../Components/Button/Button";
import { InputWrapper } from "../../Components/Input/Input";

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
padding-top: 300px;
`;

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                const { id, email, token } = data;
                localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
                setUser({ id, email });
                navigate('/');
                console.log(data);
            })
    }

    return (
        <>
        <BackGround />
        <CallCenterComponent />
        <Navigation />
            <StyledForm onSubmit={handleLogin}>
                <InputWrapper placeholder="Email" required type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <InputWrapper placeholder="Password" required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <ButtonWrapper>Log In</ButtonWrapper>
            </StyledForm>
        </>
    )
}

export default Login;
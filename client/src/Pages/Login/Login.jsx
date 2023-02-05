import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";
import styled from "styled-components";
import callcenter from '../../Components/image/callcenter.jpg';
import vectorgrid from '../../Components/image/vectorgrid.jpg';

const StyledImg = styled.img`
position: absolute;
width: 500px;
padding-top: 300px;
object-position: center;
margin-left: -250px;
margin-top: -250px;

`;

const StyledGridImg = styled.img`
position: absolute;
width: 760px;
margin-left: -400px;
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
padding-top: 300px;
`;

const StyledInput = styled.input`
position: relative;
display: flex;
width: 200px;
padding-top: 5px;
margin-top: 20px;
border-radius: 8px;
`;

const StyledButton = styled.button`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: 100px;
height: 30px;
margin-top: 25px;
border-radius: 5px;
box-shadow: 0.1em 0.1em 0.5em #124;
background-image: linear-gradient(lightgray, white);
:active {
    box-shadow: inset 0 0 0.5em #124,
    inset 0 0.5em 1em rgba(0,0,0,0.4);
}
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
            <StyledGridImg src={vectorgrid} alt='vector' />
            <StyledImg src={callcenter} alt='foto' />
            <StyledForm onSubmit={handleLogin}>
                <StyledInput placeholder="Email" required type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <StyledInput placeholder="Password" required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <StyledButton>Log In</StyledButton>
            </StyledForm>
        </>
    )
}

export default Login;
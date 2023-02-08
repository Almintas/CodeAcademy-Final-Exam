import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackGround from "../../Components/BackGround/BackGround";
import { ButtonWrapper } from "../../Components/Button/Button";
import { CallCenterComponent } from "../../Components/CallCenterImageComponent/CallCenterComponent";
import { InputWrapper } from "../../Components/Input/Input";
import { Navigation } from "../../Components/Navigation/Navigation";

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
margin-top: 180px;
`;

export const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name,
                surname
            })

        })
        .then(res => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then(data => {
            navigate('/login');
            setError('');
        })
        .catch((e) => {
            setError(e.message);
        })
    }

    return (
        <>
        <BackGround />
        <CallCenterComponent />
        <Navigation />
        <StyledForm onSubmit={handleRegister}>
            <h1>Register</h1>
            <InputWrapper 
            placeholder="Name" 
            required 
            onChange={(e) => setName(e.target.value)} 
            value = {name}
            />
            <InputWrapper 
            placeholder="Surname" 
            required 
            onChange={(e) => setSurname(e.target.value)} 
            value = {surname}
            />
            <InputWrapper 
            placeholder="Email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value = {email}
            />
            <InputWrapper 
            placeholder="Password" 
            required 
            type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            value = {password}
            />
            {error && <div>{error}</div>}
            <ButtonWrapper>Register</ButtonWrapper>
        </StyledForm>
        </>
    )
};
export default Register;
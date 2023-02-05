import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledInput = styled.input`
display: flex;
width: 200px;
padding-top: 5px;
margin-top: 10px;
border-radius: 8px;
`;

const StyledButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 100px;
height: 30px;
margin-top: 10px;
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
margin-top: 300px;
`;

export const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        .then(res => res.json())
        .then(data => {
            navigate('/login');
        })
    }

    return (
        <>
        <StyledForm onSubmit={handleRegister}>
            <StyledInput placeholder="Name" required onChange={(e) => setName(e.target.value)} 
            value = {name}
            />
            <StyledInput placeholder="Surname" required onChange={(e) => setSurname(e.target.value)} 
            value = {surname}
            />
            <StyledInput placeholder="Email" required onChange={(e) => setEmail(e.target.value)} 
            value = {email}
            />
            <StyledInput placeholder="Password" required onChange={(e) => setPassword(e.target.value)} 
            value = {password}
            />
            <StyledButton>Registruotis</StyledButton>
        </StyledForm>
        </>
    )
}

export default Register;
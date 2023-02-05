import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";
import styled from "styled-components";

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
margin-top: 300px;
`;

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

export const Form = () => {
    const [parcitipants, setParcitipants] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/parcitipants?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
        .then(res => res.json())
        .then(data => {
            setParcitipants(data);
        });
    }, [user.id]);

    const handleAddParcitipants = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/parcitipants`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                phoneNumber,
                userId: user.id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setParcitipants(data);
            }
        })
    }

    const handleDeleteParcitipants = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`${process.env.REACT_APP_API_URL}/parcitipants/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => {
                try {
                    return res.json();
                  } catch (error) {
                    console.error(error);
                  }
            })
            .then(data => {
                setParcitipants(data);
                console.log(data);
            })
        }
    };

    return (
        <>
        <StyledForm onSubmit={handleAddParcitipants}>
            <StyledInput placeholder="Name" required 
            onChange={(e) => setName(e.target.value)}
            value = {name}
            />
            <StyledInput placeholder="Surname" required 
            onChange={(e) => setSurname(e.target.value)}
            value = {surname}
            />
            <StyledInput placeholder="Email" required type='email'
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            />
            <StyledInput placeholder="Phone Number" required type='number'
            onChange={(e) => setPhoneNumber(e.target.value)}
            value ={phoneNumber}
            />
            <StyledButton>Prideti</StyledButton>
        </StyledForm>

        {parcitipants.map((exp) => (
            <div key={exp.id}>
                <h2>{exp.name}</h2>
                <h3>{exp.surname}</h3>
                <h4>{exp.email}</h4>
                <h4>{exp.phoneNumber}</h4>
                <button onClick={() => handleDeleteParcitipants(exp.id)}>DELETE</button>
            </div>
        ))}
        </>
    )
}

export default Form;
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";
import styled from "styled-components";
import { Navigation } from "../../Components/Navigation/Navigation";
import { InputWrapper } from "../../Components/Input/Input";
import ButtonWrapper from "../../Components/Button/Button";
import BackGround from "../../Components/BackGround/BackGround";

const StyledForm = styled.form`
display: flex;
flex-direction: column;
margin: 0 auto;
`;

const StyledDiv = styled.div`
padding-left: 500px;
margin-top: -200px;
`;

const StyledTable = styled.table`
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
        <BackGround />
        <Navigation />
        <StyledForm onSubmit={handleAddParcitipants}>
            <InputWrapper placeholder="Name" required 
            onChange={(e) => setName(e.target.value)}
            value = {name}
            />
            <InputWrapper placeholder="Surname" required 
            onChange={(e) => setSurname(e.target.value)}
            value = {surname}
            />
            <InputWrapper placeholder="Email" required type='email'
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            />
            <InputWrapper placeholder="Phone Number" required type='number'
            onChange={(e) => setPhoneNumber(e.target.value)}
            value ={phoneNumber}
            />
            <ButtonWrapper>Add</ButtonWrapper>
        </StyledForm>

        <StyledDiv>
            <StyledTable>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                </tr>
                </thead>
                <tbody>
                    {parcitipants.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{<button onClick={() => handleDeleteParcitipants(item.id)}>DELETE</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledDiv>
        </>
    )
}

export default Form;
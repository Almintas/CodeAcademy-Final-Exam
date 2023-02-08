import { useState, useContext, useEffect } from "react";
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
padding-left: 450px;
margin-top: -200px;
`;

const StyledTD = styled.td`
padding-right: 60px;
padding-top: 10px;
`;

const StyledTH = styled.th`
padding-right: 60px;
`;

const StyledDeleteButton = styled.button`
font-size: 1em;
width: 100px;
font-family: garamond;
`;

export const Form = () => {
    const [parcitipants, setParcitipants] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/parcitipants?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setParcitipants(data);
                }
            });
    }, [user.id]);

    const handleAddParcitipants = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/parcitipants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            .then(res => {
                if (res.status === 204) {
                    throw new Error('User already exists');
                }
    
                if (!res.ok) {
                    throw new Error('Something went wrong');
                }
    
                return res.json();
            })
            .then(data => {
                if (!data.error) {
                    setParcitipants(data);
                    setName('');
                    setSurname('');
                    setEmail('');
                    setPhoneNumber('');
                    setError('');
                }
                
            })
            .catch((e) => {
                setError(e.message);
            })
    };

    const handleDeleteParcitipants = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`${process.env.REACT_APP_API_URL}/parcitipants/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
                .then(res => res.json())
                .then(data => {
                    setParcitipants(data);
                });
        }
    };

    const alphabeticalParcitipants = [...parcitipants].sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    return (
        <>
            <BackGround />
            <Navigation />
            <StyledForm onSubmit={handleAddParcitipants}>
                <h1>New Parcitipants</h1>
                <InputWrapper 
                placeholder="Name" 
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                />
                <InputWrapper 
                placeholder="Surname" 
                required
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                />
                <InputWrapper 
                placeholder="Email" 
                required 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                <InputWrapper 
                placeholder="Phone Number" 
                required 
                type='number'
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                />
                <ButtonWrapper>Add</ButtonWrapper>
                {error && <div>{error}</div>}
            </StyledForm>
            <StyledDiv>
                <table>
                    <thead>
                        <tr>
                            <StyledTH>Line</StyledTH>
                            <StyledTH>Name</StyledTH>
                            <StyledTH>Surname</StyledTH>
                            <StyledTH>Email</StyledTH>
                            <StyledTH>Phone Number</StyledTH>
                        </tr>
                    </thead>
                    <tbody>
                        {alphabeticalParcitipants.map((item, index) => (
                            <tr key={item.id}>
                                <StyledTD>{index + 1}</StyledTD>
                                <StyledTD>{item.name}</StyledTD>
                                <StyledTD>{item.surname}</StyledTD>
                                <StyledTD>{item.email}</StyledTD>
                                <StyledTD>{item.phoneNumber}</StyledTD>
                                <StyledTD>{<StyledDeleteButton
                                    onClick={() => handleDeleteParcitipants(item.id)}>
                                    delete
                                </StyledDeleteButton>}
                                </StyledTD>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </StyledDiv>
        </>
    )
};
export default Form;
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";


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

    const handleParcitipants = (e) => {
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
                phoneNumber
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setParcitipants(data);
            }
        })
    }

    return (
        <>
        <form onSubmit={handleParcitipants}>
            <input placeholder="Name" required 
            onChange={(e) => setName(e.target.value)}
            value = {name}
            />
            <input placeholder="Surname" required 
            onChange={(e) => setSurname(e.target.value)}
            value = {surname}
            />
            <input placeholder="Email" required type='email'
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            />
            <input placeholder="Phone Number" required type='number'
            onChange={(e) => setPhoneNumber(e.target.value)}
            value ={phoneNumber}
            />
            <button>Prideti</button>
        </form>

        {parcitipants.map((exp) => (
            <div key={exp.id}>
                <h2>{exp.name}</h2>
                <h3>{exp.surname}</h3>
                <h4>{exp.email}</h4>
                <h4>{exp.phoneNumber}</h4>
            </div>
        ))}
        </>
    )
}

export default Form;
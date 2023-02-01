import { useState } from "react"


export const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <>
        <form onSubmit={handleRegister}>
            <input placeholder="Name" required onChange={(e) => setName(e.target.value)} 
            value = {name}
            />
            <input placeholder="Surname" required onChange={(e) => setSurname(e.target.value)} 
            value = {surname}
            />
            <input placeholder="Email" required onChange={(e) => setEmail(e.target.value)} 
            value = {email}
            />
            <input placeholder="Password" required onChange={(e) => setPassword(e.target.value)} 
            value = {password}
            />
            <button>Registruotis</button>
        </form>
        </>
    )
}
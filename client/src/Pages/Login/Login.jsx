import { useState } from "react"


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <>
        <form onSubmit={handleLogin}>
            <input placeholder="Email" required 
            onChange={(e) => setEmail(e.target.value)} 
            value = {email}
            />
            <input placeholder="Password" required
            onChange={(e) => setPassword(e.target.value)} 
            value = {password}
            />
            <button>Log In</button>
        </form>
        </>
    )
}
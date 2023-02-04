import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Components/UserContext/UserContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";


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
                'Content-Type' : 'application/json'
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
        <form onSubmit={handleLogin}>
            <input placeholder="Email" required type='email'
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

export default Login;
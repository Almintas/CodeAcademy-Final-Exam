import { useState } from "react";
import { useEffect } from "react"


export const Form = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/admins')
        .then(res => res.json())
        .then(data => {
            setAdmins(data);
        });
    }, []);

    return (
        <>
        <form>
            <input />
            <input />
            <input />
            <input />
            <button>Prideti</button>
        </form>

        {admins.map((exp) => (
            <div key={exp.id}>
                <h2>{exp.name}</h2>
                <h3>{exp.surname}</h3>
                <h4>{exp.email}</h4>
            </div>
        ))}
        </>
    )
}
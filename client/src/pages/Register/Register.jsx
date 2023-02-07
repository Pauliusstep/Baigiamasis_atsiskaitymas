import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import styled from "styled-components";

const RegisterContainer = styled.div`
    background-color: lightgreen;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormStyled = styled.form`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`;

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                name, 
                surname,
                password
            })
        })
        .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        });
    };

    return (
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister}>
                <h1>Registration for admins</h1>
                <Input 
                    placeholder="Your e-mail" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <Input 
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <Input 
                    placeholder="Your surname"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    required
                />
                <Input 
                    placeholder="Your password" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                 {error && <div>{error}</div>}
                <Button>Register</Button>
                <Link to="/login"> Have an account? Log in here</Link>
            </FormStyled>
        </RegisterContainer>
       
    )
}
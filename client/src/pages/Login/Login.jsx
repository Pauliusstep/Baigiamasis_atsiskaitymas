import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import styled from "styled-components";

const LoginContainer = styled.div`
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
`;

const FieldsetStyled = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    border: none;
    margin: 0;
`;

export const Login = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                password
            })
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }

            throw new Error('Incorrect username or passsword');
        })
        .then((data) => {
            onSuccess(data);
            setIsLoading(false);
        })
        .catch((e) => {
            setError(String(e));
            setIsLoading(false);
        })
    }

    return (
        <LoginContainer>
            <FormStyled onSubmit={handleLogin}>
                <h1>Events Organizer</h1>
                    <FieldsetStyled disabled={isLoading}>
                        <Input
                            placeholder="E-mail"
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
                            
                        />
                        <Input 
                            placeholder="Password" 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            
                        />
                        {error && <div>{error}</div>}
                        <Button>Login</Button>
                        <Link to="/register">Don't have an account? Register here</Link>
                    </FieldsetStyled>
                
            </FormStyled>
        </ LoginContainer>
    );
}
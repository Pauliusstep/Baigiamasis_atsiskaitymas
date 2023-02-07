import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContextWrapper";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";

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

const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

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
            if (res.status === 401) {
                throw new Error('Incorrect username or password');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            const { id, email, token } = data;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setUser({ id, email });
            setIsLoading(false);
            setError('');
            navigate('/'); 
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }

    return (
        <LoginContainer>
            <FormStyled onSubmit={handleLogin}>
                <h1>Events Organizer</h1>
                    <FieldsetStyled disabled={isLoading} column>
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
                        {error && <ErrorStyled>{error}</ErrorStyled>}
                        <Button>Login</Button>
                        <Link to="/register">Don't have an account? Register here</Link>
                    </FieldsetStyled>
                
            </FormStyled>
        </ LoginContainer>
    );
}
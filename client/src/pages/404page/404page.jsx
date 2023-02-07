import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundStyled = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: green;
    background-color: lightgreen;
    flex-direction: column;
`;

export const NotFound = () => {
    return (
        <NotFoundStyled>
            <h1>Sorry, no page here...</h1>
            <Link to='/'>Login</Link>
            <Link to='/register'>Register</Link>
        </NotFoundStyled>
    )
   
}
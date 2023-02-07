import styled from "styled-components"

const InputStyled = styled.input`
    font-size: 18px;
    padding: 8px 20px;
    border-radius: 10px;
    border: 1px solid lightgray;
    margin-right: 10px;
`;

export const Input = (props) => {
    return <InputStyled {...props}/>
}
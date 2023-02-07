import styled from "styled-components";

const ButtonStyled = styled.button`
   border-radius: 10px;
   padding: 10px 20px;
   font-size: 18px;
   border: 1px solid lightgray;
   background-color: green;
   color: white;
   cursor: pointer;

   &:disabled {
        opacity: 0.5;
   }
`;

export const Button = (props) => {
    return <ButtonStyled {...props} />
}
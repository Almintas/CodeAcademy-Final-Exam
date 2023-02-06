import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationStyledDiv = styled.div`
text-align: right;
margin-right: 100px;
margin-top: 50px;
`;

const NavigationStyled = styled(Link)`
text-decoration: none;
padding-right: 20px;
margin-right: 30px;
border: 2px solid;

`;

export const Navigation = () => {
    return (
        <>
        <NavigationStyledDiv>
        <NavigationStyled to='/login'>Login</NavigationStyled>
        <NavigationStyled to='/register'>Regsiter</NavigationStyled>
        </NavigationStyledDiv>
        </>
    )
}
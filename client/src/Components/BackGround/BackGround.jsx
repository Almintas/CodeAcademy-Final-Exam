import styled from "styled-components";
import image from '../image/image.jpg';

const StyledDiv = styled.div`
background-image: url(${image});
background-size: cover;
background-position: center;
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
z-index: -1;
`;

export const BackGround = () => {
    return <StyledDiv />
}

export default BackGround;
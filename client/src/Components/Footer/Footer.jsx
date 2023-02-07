import { FacebookCircle } from '@styled-icons/boxicons-logos/FacebookCircle';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';
import { Twitter } from '@styled-icons/boxicons-logos/Twitter';
import styled from 'styled-components';

export const Footer = () => {

    const StyledIconsDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 150px;
    `;

    return (
        <StyledIconsDiv>
            <FacebookCircle />
            <Instagram />
            <Twitter />
        </StyledIconsDiv>
    )
}

export default Footer;
import { FacebookCircle } from '@styled-icons/boxicons-logos/FacebookCircle';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';
import { Twitter } from '@styled-icons/boxicons-logos/Twitter';
import styled from 'styled-components';

const IconContainer = styled.div`
position: absolute;
bottom: 0;
display: flex;
justify-content: center;
width: 100%;
padding-bottom: 20px;
background-color: rgb(157, 192, 246);
opacity: 0.7;
`;

const StyledFacebook = styled(FacebookCircle)`
width: 50px;
padding-right: 30px;
color: rgb(18, 27, 172);
`;

const StyledInstagram = styled(Instagram)`
width: 50px;
padding-right: 30px;
color: rgb(18, 27, 172);
`;

const StyledTwitter = styled(Twitter)`
width: 50px;
padding-right: 30px;
color: rgb(18, 27, 172);
`;

export const Footer = () => {

    return (
        <IconContainer>
                <a href='https://facebook.com'>
                    <StyledFacebook />
                </a>
                <a href='https://Instagram.com'>
                    <StyledInstagram />
                </a>
                <a href='https://Twitter.com'>
                    <StyledTwitter />
                </a>
            </IconContainer>
    )
};
export default Footer;
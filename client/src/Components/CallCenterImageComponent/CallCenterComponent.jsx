import styled from "styled-components";
import callcenter from '../image/callcenter.jpg';

const CallCenterWrapper = styled.div`
background-image: url(${callcenter});
background-size: 400px;
background-repeat: no-repeat;
background-position: center;
position: fixed;
top: 0px;
left: 0;
bottom: 300px;
right: 0;
z-index: -1;
`;

export const CallCenterComponent = () => {
    return <CallCenterWrapper />
};
import React from 'react';
import styled from 'styled-components';

import PulseInuBtnBgImage from '../../assets/images/pulseinubtn.svg';

const StakeButtonDiv = styled.div`
  width: 40%;
  padding: 0px 20px 0px 20px;
  @media (max-width: 1044px) {
    width: 75%;
  }
`;

const StakeButtonDivTitle = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0.05em;
  text-align: center;
  background: linear-gradient(90deg, #307afe 0%, #d515a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StakeBtn = styled.button`
  width: 311px;
  height: 70px;
  padding: 14px 20px 14px 20px;
  border-radius: 100px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #d7e0ff;
  background: #4f30ff;
  background-image: url(${PulseInuBtnBgImage});
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  background-repeat: no-repeat;
  text-transform: uppercase;
  cursor: pointer;
  @media (max-width: 1044px) {
    width: 100%;
  }
`;

export default function StakeButton() {
  return (
    <StakeButtonDiv>
      <StakeButtonDivTitle>PLS Fee: 100,000 PLS</StakeButtonDivTitle>
      <StakeBtn>Stake Pulse Inu</StakeBtn>
    </StakeButtonDiv>
  );
}

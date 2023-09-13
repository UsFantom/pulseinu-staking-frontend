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
  position: relative;
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
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background: radial-gradient(
    farthest-corner at -17% 291%,
    #00e8fc 0%,
    #4f30ff 60%,
    #f00f8e 95%,
    #ff0000 100%
  );
  background-blend-mode: lighten;
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  overflow: hidden;
  @media (max-width: 1044px) {
    width: 100%;
  }
`;

const PulseInuBtnBgImg = styled.img`
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0.5;
`;

export default function StakeButton() {
  return (
    <StakeButtonDiv>
      <StakeButtonDivTitle>PLS Fee: 100,000 PLS</StakeButtonDivTitle>
      <StakeBtn>
        <PulseInuBtnBgImg src={PulseInuBtnBgImage} />
        Stake Pulse Inu
      </StakeBtn>
    </StakeButtonDiv>
  );
}

import React from 'react';
import styled from 'styled-components';

import PulseInuLogo from '../../assets/images/pulseinulogo.svg';
import TwitterLogo from '../../assets/images/twitter.svg';
import TelegramLogo from '../../assets/images/telegram.svg';
import MetaMaskLogo from '../../assets/images/metamask.svg';

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
  padding: 0px 20px 0px 20px;
`;

const HeaderLogoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    justify-content: center;
  }
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;

const HeaderLogoImg = styled.img`
  width: 70px;
  height: 70px;
`;

const HeaderLogoTitle = styled.h1`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
  color: #d7e0ff;
  margin-left: 20px;
`;

const HeaderMenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    justify-content: center;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const HeaderMenuItem = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0.02em;
  margin-right: 20px;
  text-align: center;
  color: #d7e0ff;
  cursor: pointer;
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;

const HeaderMenuIcon = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;

const HeaderConnectBtn = styled.button`
  width: 152px;
  height: 50px;
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
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  background: radial-gradient(
      farthest-corner at -17% 291%,
      #00e8fc 0%,
      #4f30ff 60%,
      #f00f8e 95%,
      #ff0000 100%
    ),
    linear-gradient(0deg, #ffffff, #ffffff);
`;

export default function AmountBurned() {
  return (
    <HeaderDiv>
      <HeaderLogoDiv>
        <HeaderLogoImg src={PulseInuLogo} />
        <HeaderLogoTitle>PULSE INU</HeaderLogoTitle>
      </HeaderLogoDiv>
      <HeaderMenuDiv>
        <HeaderMenuItem>0xa12E...</HeaderMenuItem>
        <HeaderMenuItem>WHITEPAPER</HeaderMenuItem>
        <HeaderMenuIcon src={TwitterLogo} width={19} height={17} />
        <HeaderMenuIcon src={TelegramLogo} width={21} height={21} />
        <HeaderMenuIcon src={MetaMaskLogo} width={25} height={25} />
        <HeaderConnectBtn>connect</HeaderConnectBtn>
      </HeaderMenuDiv>
    </HeaderDiv>
  );
}

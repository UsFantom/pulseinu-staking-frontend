import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header';
import Referrals from '../../components/Referrals';
import StakeAmountLength from '../../components/StakeAmountLength';
import StakeBonus from '../../components/StakeBonus';
import StakeButton from '../../components/StakeButton';
import StakeTable from '../../components/StakeTable';
import NavigateBack from '../../components/NavigateBack';
import BurnBgImg from '../../assets/images/burn_bg.svg';

const PageLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 1);
  background-image: linear-gradient(
    202.01deg,
    rgba(204, 19, 236, 0.26) 4.29%,
    rgba(0, 0, 0, 0.26) 43.63%,
    rgba(0, 181, 255, 0.1664) 97.51%
  );
  overflow-y: auto;
`;

const HeaderDiv = styled.div`
  width: 940px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: -150px;
  padding-top: 10px;
  padding-bottom: 30px;
  // background: #d7e0ff0d;
  // border-radius: 30px;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

const ContentDiv = styled.div`
  position: relative;
  width: 940px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  background: #d7e0ff0d;
  border-radius: 30px;
  @media (max-width: 1044px) {
    width: 87%;
  }
`;

const StakeTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 1044px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StakeTitle = styled.h2`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0.02em;
  text-align: left;
  background: linear-gradient(0deg, #696969, #696969),
    linear-gradient(90deg, #d7e0ff 0%, rgba(215, 224, 255, 0) 126.92%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StakeTitleBurnButton = styled.button`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #d7e0ff;
  width: 530px;
  height: 50px;
  padding: 14px 20px 14px 20px;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
  z-index: 1;
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
  @media (max-width: 600px) {
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
  }
`;

const BurnBgImage = styled.img`
  position: absolute;
  top: -50px;
  right: 0px;
  width: 540px;
  height: 180px;
`;

const StakeBonusDiv = styled.div`
  display: flex;
  justify-item: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
`;

const YourStakeTitle = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0.02em;
  text-align: left;
  background: linear-gradient(0deg, #d7e0ff, #d7e0ff),
    linear-gradient(90deg, #d7e0ff 0%, rgba(215, 224, 255, 0) 126.92%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  margin-left: 20px;
`;

export default function Stake() {
  const navigate = useNavigate();

  const navigateTo = (to) => {
    navigate(to);
  };

  const [showReferrals, setShowReferrals] = useState(false);

  const toggleReferrals = () => {
    setShowReferrals(!showReferrals);
  };

  useEffect(() => {
    setShowReferrals(false);
  }, []);

  return (
    <PageLayout>
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <NavigateBack title="STAKE PULSE INU" navigateTo="/" />
      <ContentDiv>
        <StakeTitleDiv>
          <BurnBgImage src={BurnBgImg} />
          <StakeTitle>Earn PLS APY or ...</StakeTitle>
          <StakeTitleBurnButton onClick={() => navigateTo('/burn')}>
            Burn PINU to get a PLS Yield Boost
          </StakeTitleBurnButton>
        </StakeTitleDiv>
        <Referrals showReferrals={showReferrals} toggleReferrals={() => toggleReferrals()} />
        <StakeTitleDiv>
          <StakeTitle>STAKE</StakeTitle>
        </StakeTitleDiv>
        <StakeAmountLength />
        <StakeTitleDiv>
          <StakeTitle>STAKE BONUSES</StakeTitle>
        </StakeTitleDiv>
        <StakeBonusDiv>
          <StakeBonus />
          <StakeButton />
        </StakeBonusDiv>
      </ContentDiv>
      <ContentDiv>
        <YourStakeTitle>Your Stakes</YourStakeTitle>
        <StakeTable />
      </ContentDiv>
    </PageLayout>
  );
}

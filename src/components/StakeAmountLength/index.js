import React, { useState } from 'react';
import styled from 'styled-components';

import MaxPinuImage from '../../assets/images/maxpinu.svg';
import CalendarImage from '../../assets/images/calendar.svg';
import { useStakingTokenUserBalance } from '../../queries/useStaking';

const StakeAmountLengthDiv = styled.div`
  width: 920px;
  height: 50px;
  padding: 0px;
  border-radius: 200px;
  position: relative;
  background: #d7e0ff0d;
  margin: auto;
  margin-bottom: 20px;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  @media (max-width: 1044px) {
    width: 89%;
  }
`;

const StakeAmountLengthInput = styled.input`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  width: Calc(100% - 30px);
  height: 100%;
  padding: 0 15px 0px 15px;
  margin: 0px;
  border: none;
  border-radius: 200px;
  background: transparent;
`;

const StakeAmountImg = styled.img`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 0px;
  right: 15px;
`;

const StakeLengthImg = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 15px;
  right: 30px;
`;

export default function StakeAmountLength() {
  const stakingTokenuserBalanceQuery = useStakingTokenUserBalance();

  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDays, setStakeDays] = useState('');

  return (
    <>
      <StakeAmountLengthDiv>
        <StakeAmountLengthInput
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder={
            stakingTokenuserBalanceQuery.data
              ? stakingTokenuserBalanceQuery.data
              : '-PINU available)'
          }
        />
        <StakeAmountImg src={MaxPinuImage} />
      </StakeAmountLengthDiv>
      <StakeAmountLengthDiv>
        <StakeAmountLengthInput
          value={stakeDays}
          onChange={(e) => setStakeDays(e.target.value)}
          placeholder="Stake Length in Days"
        />
        <StakeLengthImg src={CalendarImage} />
      </StakeAmountLengthDiv>
    </>
  );
}

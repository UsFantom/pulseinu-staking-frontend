import React from 'react';
import styled from 'styled-components';

import MaxPinuImage from '../../assets/images/maxpinu.svg';
import CalendarImage from '../../assets/images/calendar.svg';

const StakeAmountLengthDiv = styled.div`
  width: 860px;
  height: 40px;
  padding: 5px 30px 5px 30px;
  border-radius: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StakeAmountLengthTitle = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  text-transform: uppercase;
`;

const StakeAmountImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: -15px;
`;

const StakeLengthImg = styled.img`
  width: 18px;
  height: 18px;
`;

export default function StakeAmountLength() {
  return (
    <>
      <StakeAmountLengthDiv>
        <StakeAmountLengthTitle>Stake Amount in PINU (0.000 PINU available)</StakeAmountLengthTitle>
        <StakeAmountImg src={MaxPinuImage} />
      </StakeAmountLengthDiv>
      <StakeAmountLengthDiv>
        <StakeAmountLengthTitle>Stake Length in Days</StakeAmountLengthTitle>
        <StakeLengthImg src={CalendarImage} />
      </StakeAmountLengthDiv>
    </>
  );
}

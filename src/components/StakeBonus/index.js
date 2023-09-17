import React from 'react';
import styled from 'styled-components';

const StakeBonusDiv = styled.div`
  width: 60%;
  padding: 0px 20px 0px 20px;
`;

const BonusDivs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: ${(props) => (props.borderdisabled !== undefined ? 'none' : '0.5px solid')};
  border-image: linear-gradient(
      100.73deg,
      #413fff -0.17%,
      #00e8ff 23.82%,
      #e916cb 56.09%,
      rgba(0, 0, 0, 0) 121.96%
    )
    1;
`;

const BonusDetailDiv = styled.div``;

const BonusTitle = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  text-transform: uppercase;
  margin-top: 0px;
`;

const BonusData = styled.p`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  margin-top: 0px;
`;

export default function StakeBonus() {
  return (
    <StakeBonusDiv>
      <BonusDivs>
        <BonusDetailDiv>
          <BonusTitle>Length Bonus:</BonusTitle>
          <BonusData>+0.000 PINU</BonusData>
        </BonusDetailDiv>
        <BonusDetailDiv>
          <BonusTitle>NFT Bonuses:</BonusTitle>
          <BonusData>+0.000 PINU</BonusData>
        </BonusDetailDiv>
        <BonusDetailDiv>
          <BonusTitle>Total:</BonusTitle>
          <BonusData>0.000 PINU</BonusData>
        </BonusDetailDiv>
      </BonusDivs>
      <BonusDivs borderdisabled={true}>
        <BonusDetailDiv>
          <BonusTitle>Share price</BonusTitle>
          <BonusData>1,000 PINU/Share</BonusData>
        </BonusDetailDiv>
      </BonusDivs>
    </StakeBonusDiv>
  );
}

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import MaxPinuImage from '../../assets/images/maxpinu.svg';
import CalendarImage from '../../assets/images/calendar.svg';
import {
  useCalcShares,
  useGetLengthBonus,
  useGetUserBoostPercent,
  useStakingFee,
  useStakingSharePrice,
  useStakingTokenUserBalance
} from '../../queries/useStaking';

import PulseInuBtnBgImage from '../../assets/images/pulseinubtn.svg';
import { useStakeMutation } from '../../queries/useStakeMutation';
import { useWeb3React } from '@web3-react/core';
import { formatNumber } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

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

const StakeBonusDiv = styled.div`
  display: flex;
  justify-item: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
`;

const StakeBonusWrapDiv = styled.div`
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
  border: none;
  background-blend-mode: lighten;
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  overflow: hidden;
  cursor: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? 'not-allowed' : 'pointer'};
  color: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '#696969' : '#d7e0ff'};
  border: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '1px solid #696969' : 'none'};
  background: ${(props) =>
    props.disabled !== undefined && props.disabled === true
      ? 'transparent'
      : 'radial-gradient(farthest-corner at -17% 291%,#00e8fc 0%,#4f30ff 60%,#f00f8e 95%,#ff0000 100%)'};
  @media (max-width: 1044px) {
    width: 100%;
  }
  &:active {
    border: 0.5px solid var(--line-fill, #413fff);
    background: linear-gradient(
      270deg,
      rgba(252, 0, 33, 0.1) 0%,
      rgba(79, 48, 255, 0.1) 52.08%,
      rgba(240, 15, 142, 0.1) 100%
    );
  }
`;

const PulseInuBtnBgImg = styled.img`
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0.5;
`;

export default function StakeAmountLength() {
  const { referrer } = useParams();

  const stakingTokenuserBalanceQuery = useStakingTokenUserBalance();
  const stakingSharePrice = useStakingSharePrice();
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDays, setStakeDays] = useState('');

  const stakeMutation = useStakeMutation();
  const { account } = useWeb3React();

  const useAllTokenAmounts = () => {
    if (!stakingTokenuserBalanceQuery.data) return;
    setStakeAmount(stakingTokenuserBalanceQuery.data);
  };

  const getLengthBonusQuery = useGetLengthBonus(stakeAmount, stakeDays);
  const getNftBonusQuery = useGetUserBoostPercent();
  const stakingFeeQuery = useStakingFee();
  const calcSharesQuery = useCalcShares(stakeAmount, stakeDays, getNftBonusQuery.data);

  const getTotal = () => {
    if (getLengthBonusQuery.isFetching || getNftBonusQuery.isFetching) return '0';
    let total = 0;
    try {
      if (stakeAmount) total += parseFloat(stakeAmount);
    } catch (error) {
      console.log(error);
    }
    try {
      if (getLengthBonusQuery.data) total += parseFloat(getLengthBonusQuery.data);
    } catch (error) {
      console.log(error);
    }
    try {
      if (getNftBonusQuery.data && stakeAmount)
        total += stakeAmount * parseFloat(getNftBonusQuery.data / 1e4);
    } catch (error) {
      console.log(error);
    }
    return total;
  };

  const isInvalid = () => {
    return !account || !stakeAmount || !stakeDays || stakeDays < 2 || stakeDays > 1000;
  };

  const handleConfirm = useCallback(async () => {
    if (isInvalid()) {
      return;
    }
    try {
      const tx = await stakeMutation.mutateAsync({
        amount: stakeAmount,
        days: stakeDays,
        referrer: ethers.utils.isAddress(referrer) ? referrer : ethers.constants.AddressZero
      });
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  }, [stakeMutation, account, stakeAmount, stakeDays]);

  return (
    <>
      <StakeTitleDiv>
        <StakeTitle>STAKE</StakeTitle>
      </StakeTitleDiv>
      <StakeAmountLengthDiv>
        <StakeAmountLengthInput
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder={`( ${formatNumber(stakingTokenuserBalanceQuery.data)} PINU available)`}
        />
        <StakeAmountImg onClick={useAllTokenAmounts} src={MaxPinuImage} />
      </StakeAmountLengthDiv>
      <StakeAmountLengthDiv>
        <StakeAmountLengthInput
          value={stakeDays}
          min={2}
          max={1000}
          onChange={(e) => setStakeDays(e.target.value)}
          placeholder={`Stake Length in Days(2 to ${formatNumber(1000)})`}
        />
        <StakeLengthImg src={CalendarImage} />
      </StakeAmountLengthDiv>
      <StakeTitleDiv>
        <StakeTitle>STAKE BONUSES</StakeTitle>
      </StakeTitleDiv>
      <StakeBonusDiv>
        <StakeBonusWrapDiv>
          <BonusDivs>
            <BonusDetailDiv>
              <BonusTitle>Length Bonus:</BonusTitle>
              <BonusData>{`+${formatNumber(getLengthBonusQuery.data)} PINU`}</BonusData>
            </BonusDetailDiv>
            {account && (
              <BonusDetailDiv>
                <BonusTitle>NFT Bonuses:</BonusTitle>
                <BonusData>{`+${formatNumber(
                  (stakeAmount * getNftBonusQuery.data) / 1e4
                )} PINU`}</BonusData>
              </BonusDetailDiv>
            )}
            <BonusDetailDiv>
              <BonusTitle>Total:</BonusTitle>
              <BonusData>{`${formatNumber(getTotal())} PINU`}</BonusData>
            </BonusDetailDiv>
          </BonusDivs>
          <BonusDivs borderdisabled={true}>
            <BonusDetailDiv>
              <BonusTitle>Share price</BonusTitle>
              <BonusData>{`${formatNumber(stakingSharePrice.data)} PINU/Share`}</BonusData>
            </BonusDetailDiv>
            <BonusDetailDiv>
              <BonusTitle>Total shares</BonusTitle>
              <BonusData>{`${formatNumber(calcSharesQuery.data)}`}</BonusData>
            </BonusDetailDiv>
          </BonusDivs>
        </StakeBonusWrapDiv>
        <StakeButtonDiv>
          <StakeButtonDivTitle>{`PLS Fee: ${formatNumber(
            stakingFeeQuery.data
          )} PLS`}</StakeButtonDivTitle>
          <StakeBtn onClick={handleConfirm} disabled={isInvalid()}>
            <PulseInuBtnBgImg src={PulseInuBtnBgImage} />
            Stake Pulse Inu
          </StakeBtn>
        </StakeButtonDiv>
      </StakeBonusDiv>
    </>
  );
}

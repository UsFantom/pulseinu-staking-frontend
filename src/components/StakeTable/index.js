import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetUserRewards, useUserStakings } from '../../queries/useStaking';
import { ethers } from 'ethers';
import {
  DIALOG_TYPES,
  formatBigNumber,
  formatNumber,
  handleContractErrors,
  handleContractSuccess,
  showDialog
} from '../../utils/utils';
import { useUnStakeMutation } from '../../queries/useUnStakeMutation';
import { useWeb3React } from '@web3-react/core';
import { LoadableContent } from '../Custom/LoadableContent';

const StakeTableDiv = styled.div`
  width: Calc(100% - 40px);
  padding: 0px 20px 0px 20px;
`;

const StakeTableComp = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StakeTableRow = styled.tr`
  height: 50px;
  border-bottom: 0.5px solid #696969;
`;

const StakeTableHeader = styled.th`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  text-transform: uppercase;
`;

const StakeTableData = styled.td`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  text-transform: uppercase;
`;

const UnStakeButton = styled.button`
  width: 96px;
  height: 28px;
  border-radius: 100px;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: rgba(215, 224, 255, 1);
  text-transform: uppercase;
  margin-right: 2px;
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
    margin-right: 0px;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export default function StakeTable(props) {
  const [currentDay, setCurrentDay] = useState(props.currentDay);

  useEffect(() => {
    setCurrentDay(props.currentDay);
  }, [props.currentDay]);

  const stakingHistoryQuery = useUserStakings(props.updateTime);

  const userRewardsQuery = useGetUserRewards(stakingHistoryQuery.data?.stakingInfo?.length ?? 0);
  const unStakeMutation = useUnStakeMutation();
  const { account } = useWeb3React();

  const handleConfirm = useCallback(
    async (index) => {
      if (!account) {
        return;
      }
      showDialog(DIALOG_TYPES.PROGRESS, `Unstaking(${index})`);
      try {
        const tx = await unStakeMutation.mutateAsync(index);
        console.log(tx);
        handleContractSuccess(`You unstaked successfully`);
      } catch (err) {
        handleContractErrors(err);
      }
    },
    [unStakeMutation, account]
  );

  const renderStakingRow = (staking, index) => {
    const balance = staking[0];
    const shares = staking[1];
    const stakingDay = staking[4];
    const stakeDays = staking[5];
    return (
      <StakeTableRow key={index}>
        <StakeTableData>{formatNumber(stakingDay)}</StakeTableData>
        <StakeTableData>{formatNumber(stakeDays + stakingDay)}</StakeTableData>
        <StakeTableData>
          <LoadableContent query={stakingHistoryQuery} fallback={null}>
            <>
              {formatBigNumber(
                ethers.utils.formatUnits(balance, stakingHistoryQuery.data.decimals)
              )}
            </>
          </LoadableContent>
        </StakeTableData>
        <StakeTableData>
          <LoadableContent query={stakingHistoryQuery} fallback={null}>
            <>
              {formatBigNumber(ethers.utils.formatUnits(shares, stakingHistoryQuery.data.decimals))}
            </>
          </LoadableContent>
        </StakeTableData>
        <StakeTableData>
          <LoadableContent query={userRewardsQuery} fallback={null}>
            <>
              {formatBigNumber(
                userRewardsQuery.data?.length > index ? userRewardsQuery.data[index] : 0
              )}
            </>
          </LoadableContent>
        </StakeTableData>
        <LoadableContent
          query={[stakingHistoryQuery]}
          fallback={
            <StakeTableData>
              <UnStakeButton disabled={true}>Unstake</UnStakeButton>
            </StakeTableData>
          }>
          <StakeTableData>
            <UnStakeButton
              onClick={() => {
                handleConfirm(index);
              }}
              disabled={currentDay <= stakeDays + stakingDay || balance === 0}>
              Unstake
            </UnStakeButton>
          </StakeTableData>
        </LoadableContent>
      </StakeTableRow>
    );
  };

  return (
    <StakeTableDiv>
      <StakeTableComp>
        <StakeTableRow>
          <StakeTableHeader>Start</StakeTableHeader>
          <StakeTableHeader>End</StakeTableHeader>
          <StakeTableHeader>Pulse Inu</StakeTableHeader>
          <StakeTableHeader>Shares</StakeTableHeader>
          <StakeTableHeader>PLS Earned</StakeTableHeader>
          <StakeTableHeader />
        </StakeTableRow>
        {stakingHistoryQuery.data?.stakingInfo &&
          stakingHistoryQuery.data?.stakingInfo.map((staking, index) => {
            return renderStakingRow(staking, index);
          })}
      </StakeTableComp>
    </StakeTableDiv>
  );
}

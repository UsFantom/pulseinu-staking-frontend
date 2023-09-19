import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useGetCurrentDay, useStakingHistory, useStakingInfo } from '../../queries/useStaking';
import { ethers } from 'ethers';
import { formatNumber } from '../../utils/utils';
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
  @media (max-width: 1044px) {
    margin-right: 0px;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export default function StakeTable() {
  const stakingInfoQuery = useStakingInfo();

  const currentDayQuery = useGetCurrentDay();

  const stakingHistoryQuery = useStakingHistory();

  const unStakeMutation = useUnStakeMutation();
  const { account } = useWeb3React();

  const handleConfirm = useCallback(async () => {
    if (!account) {
      return;
    }
    try {
      const tx = await unStakeMutation.mutateAsync();
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  }, [unStakeMutation, account]);

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
        {stakingInfoQuery.data?.stakingInfo && stakingInfoQuery.data?.stakingInfo[0] > 0 && (
          <StakeTableRow>
            <StakeTableData>
              {formatNumber(stakingInfoQuery.data?.stakingInfo[3].toString())}
            </StakeTableData>
            <StakeTableData>
              {formatNumber(
                (
                  stakingInfoQuery.data?.stakingInfo[3] + stakingInfoQuery.data?.stakingInfo[4]
                ).toString()
              )}
            </StakeTableData>
            <StakeTableData>
              {formatNumber(
                ethers.utils.formatUnits(
                  stakingInfoQuery.data?.stakingInfo[0].toString(),
                  stakingInfoQuery.data.decimals
                )
              )}
            </StakeTableData>
            <StakeTableData>
              {formatNumber(
                ethers.utils.formatUnits(
                  stakingInfoQuery.data?.stakingInfo[1].toString(),
                  stakingInfoQuery.data.decimals
                )
              )}
            </StakeTableData>
            <StakeTableData>
              {formatNumber(
                ethers.utils.formatEther(stakingInfoQuery.data?.stakingInfo[2].toString())
              )}
            </StakeTableData>
            <LoadableContent
              query={[currentDayQuery, stakingInfoQuery, stakingHistoryQuery]}
              fallback={
                <StakeTableData>
                  <UnStakeButton disabled={true}>Unstake</UnStakeButton>
                </StakeTableData>
              }>
              <StakeTableData>
                <UnStakeButton
                  onClick={handleConfirm}
                  disabled={
                    currentDayQuery.data >=
                    stakingInfoQuery.data.stakingInfo[3] + stakingInfoQuery.data.stakingInfo[4]
                  }>
                  Unstake
                </UnStakeButton>
              </StakeTableData>
            </LoadableContent>
          </StakeTableRow>
        )}
        {stakingHistoryQuery.data?.stakingInfo &&
          stakingHistoryQuery.data?.stakingInfo.map((staking, index) => {
            return (
              <StakeTableRow key={index}>
                <StakeTableData>{formatNumber(staking[3].toString())}</StakeTableData>
                <StakeTableData>
                  {formatNumber((staking[3] + staking[4]).toString())}
                </StakeTableData>
                <StakeTableData>
                  {formatNumber(
                    ethers.utils.formatUnits(staking[0].toString(), stakingInfoQuery.data.decimals)
                  )}
                </StakeTableData>
                <StakeTableData>
                  {formatNumber(
                    ethers.utils.formatUnits(staking[1].toString(), stakingInfoQuery.data.decimals)
                  )}
                </StakeTableData>
                <StakeTableData>
                  {formatNumber(ethers.utils.formatEther(staking[2].toString()))}
                </StakeTableData>
                {stakingInfoQuery.data?.stakingInfo &&
                  stakingInfoQuery.data?.stakingInfo[0] > 0 && <StakeTableData />}
              </StakeTableRow>
            );
          })}
      </StakeTableComp>
    </StakeTableDiv>
  );
}

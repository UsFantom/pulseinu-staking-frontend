import React from 'react';
import styled from 'styled-components';
import { useStakingInfo } from '../../queries/useStaking';
import { ethers } from 'ethers';
import { formatNumber } from '../../utils/utils';

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

export default function StakeTable() {
  const stakingInfoQuery = useStakingInfo();
  return (
    <StakeTableDiv>
      <StakeTableComp>
        <StakeTableRow>
          <StakeTableHeader>Start</StakeTableHeader>
          <StakeTableHeader>End</StakeTableHeader>
          <StakeTableHeader>Pulse Inu</StakeTableHeader>
          <StakeTableHeader>Shares</StakeTableHeader>
          <StakeTableHeader>PLS Earned</StakeTableHeader>
        </StakeTableRow>
        {stakingInfoQuery.data?.stakingInfo && stakingInfoQuery.data?.stakingInfo[0] > 0 && (
          <StakeTableRow>
            <StakeTableData>
              {formatNumber(stakingInfoQuery.data?.stakingInfo[3].toString())}
            </StakeTableData>
            <StakeTableData>
              {formatNumber(stakingInfoQuery.data?.stakingInfo[4].toString())}
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
          </StakeTableRow>
        )}
      </StakeTableComp>
    </StakeTableDiv>
  );
}

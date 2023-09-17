import { useWeb3React } from '@web3-react/core';
import React from 'react';
import styled from 'styled-components';
import { useStakingReferrals } from '../../queries/useStaking';

const ReferralsTableDiv = styled.div`
  width: 860px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-x: auto;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

const ReferralsTableRowDiv = styled.div`
  width: 860px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: ${(props) => (props.borderdisabled !== undefined ? 'none' : '0.5px solid')};
  border-color: #696969;
  border-image: ${(props) => (props.border !== undefined ? props.border : 'none')};
`;

const ReferralsTableAddressDiv = styled.div`
  width: 75%;
`;

const ReferralsTableComissionDiv = styled.div`
  width: 25%;
`;

const ReferralsTableHeader = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  text-transform: uppercase;
`;

const ReferralsTableAddressCell = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 300;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ReferralsTableComissionCell = styled.p`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  margin: 8px 0 8px 0;
`;

const ReferralsTableTotalComissionCell = styled.p`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0.05em;
  text-align: left;
  background: linear-gradient(0deg, #00e8fc 0%, #0096ff 40%, #ce13ec 67.33%, #ff0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function ReferralsTable() {
  const { account } = useWeb3React();
  const stakingReferralsQuery = useStakingReferrals();
  console.log(stakingReferralsQuery);

  return (
    <ReferralsTableDiv>
      <ReferralsTableRowDiv>
        <ReferralsTableAddressDiv>
          <ReferralsTableHeader>Address</ReferralsTableHeader>
        </ReferralsTableAddressDiv>
        <ReferralsTableComissionDiv>
          <ReferralsTableHeader>Comission</ReferralsTableHeader>
        </ReferralsTableComissionDiv>
      </ReferralsTableRowDiv>
      <ReferralsTableRowDiv>
        <ReferralsTableAddressDiv>
          <ReferralsTableAddressCell>{account ?? ''}</ReferralsTableAddressCell>
        </ReferralsTableAddressDiv>
        <ReferralsTableComissionDiv>
          <ReferralsTableComissionCell>10,000 PLS</ReferralsTableComissionCell>
        </ReferralsTableComissionDiv>
      </ReferralsTableRowDiv>
      <ReferralsTableRowDiv border="linear-gradient(100.73deg, #413FFF -0.17%, #00E8FF 23.82%, #E916CB 56.09%, rgba(0, 0, 0, 0) 121.96%) 1">
        <ReferralsTableAddressDiv>
          <ReferralsTableAddressCell>0xa12E...</ReferralsTableAddressCell>
        </ReferralsTableAddressDiv>
        <ReferralsTableComissionDiv>
          <ReferralsTableComissionCell>10,000 PLS</ReferralsTableComissionCell>
        </ReferralsTableComissionDiv>
      </ReferralsTableRowDiv>
      <ReferralsTableRowDiv borderdisabled={true}>
        <ReferralsTableAddressDiv>
          <ReferralsTableAddressCell></ReferralsTableAddressCell>
        </ReferralsTableAddressDiv>
        <ReferralsTableComissionDiv>
          <ReferralsTableTotalComissionCell>= 20,000 PLS</ReferralsTableTotalComissionCell>
        </ReferralsTableComissionDiv>
      </ReferralsTableRowDiv>
    </ReferralsTableDiv>
  );
}

import React from 'react';
import styled from 'styled-components';

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
        <StakeTableRow>
          <StakeTableData>841</StakeTableData>
          <StakeTableData>6396</StakeTableData>
          <StakeTableData></StakeTableData>
          <StakeTableData>2.555</StakeTableData>
          <StakeTableData>25,964</StakeTableData>
        </StakeTableRow>
        <StakeTableRow>
          <StakeTableData>614</StakeTableData>
          <StakeTableData>2689</StakeTableData>
          <StakeTableData></StakeTableData>
          <StakeTableData>30.432</StakeTableData>
          <StakeTableData>398,286</StakeTableData>
        </StakeTableRow>
        <StakeTableRow>
          <StakeTableData>600</StakeTableData>
          <StakeTableData>5528</StakeTableData>
          <StakeTableData></StakeTableData>
          <StakeTableData>81.998</StakeTableData>
          <StakeTableData>875,353</StakeTableData>
        </StakeTableRow>
      </StakeTableComp>
    </StakeTableDiv>
  );
}

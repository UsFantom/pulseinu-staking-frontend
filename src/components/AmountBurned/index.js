import React from 'react';
import PercentBar from '../PercentBar';
import styled from 'styled-components';

const AmountBurnedDiv = styled.div`
  width: 96%;
  border-radius: 30px;
  background: rgba(215, 224, 255, 0.05);
  margin-left: 2%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const AmountBurnedTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountBurnedTitle = styled.h2`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #d7e0ff;
  margin-top: 0px;
  margin-left: 20px;
`;

const AmountBurnedPercent = styled.h2`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: right;
  background: linear-gradient(
    93.69deg,
    #fc031c -3.8%,
    #f10d80 16.55%,
    #ac1dbd 38.03%,
    #6e29e8 57.81%,
    #3c5bfe 79.28%,
    #0dc9fc 104.72%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 0px;
  margin-right: 20px;
`;

const AmountBurnedSpan = styled.span`
  font-family: Poppins;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
`;

const AmountBurnedSpanTitle1 = styled(AmountBurnedSpan)`
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 700;
  background: linear-gradient(0deg, #696969, #696969);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AmountBurnedSpanContent1 = styled(AmountBurnedSpan)`
  margin-right: 20px;
  font-weight: 400;
  background: linear-gradient(0deg, #f60954, #f60954);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AmountBurnedSpanTitle2 = styled(AmountBurnedSpan)`
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 700;
  background: linear-gradient(0deg, #696969, #696969);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AmountBurnedSpanContent2 = styled(AmountBurnedSpan)`
  margin-right: 20px;
  font-weight: 400;
  background: linear-gradient(
    93.69deg,
    #fc031c 50%,
    #f10d80 60.26%,
    #ac1dbd 71.09%,
    #6e29e8 81.06%,
    #3c5bfe 91.89%,
    #0dc9fc 104.72%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function AmountBurned() {
  return (
    <AmountBurnedDiv>
      <AmountBurnedTitleDiv>
        <AmountBurnedTitle>AMOUNT BURNED</AmountBurnedTitle>
        <AmountBurnedPercent>43.23%</AmountBurnedPercent>
      </AmountBurnedTitleDiv>
      <PercentBar percent="43.23" />
      <AmountBurnedTitleDiv>
        <AmountBurnedSpanTitle1>
          BURNED:<AmountBurnedSpanContent1>&nbsp;99,000,000</AmountBurnedSpanContent1>
        </AmountBurnedSpanTitle1>
        <AmountBurnedSpanTitle2>
          TOTAL SUPPLY:<AmountBurnedSpanContent2>&nbsp;100,000,000</AmountBurnedSpanContent2>
        </AmountBurnedSpanTitle2>
      </AmountBurnedTitleDiv>
    </AmountBurnedDiv>
  );
}

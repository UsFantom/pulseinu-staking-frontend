import React from 'react';
import styled from 'styled-components';
import UpArrow from '../../assets/images/uparrow.svg';
import DownArrow from '../../assets/images/downarrow.svg';

const StatisticDataDiv = styled.div`
  display: block;
  margin-bottom: 10px;
  @media (max-width: 650px) {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const StatisticTitle = styled.h2`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  @media (max-width: 650px) {
    text-align: center;
  }
`;

const StatisticAmount = styled.p`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  margin-top: 0px;
  margin-bottom: 0px;
  @media (max-width: 650px) {
    text-align: center;
    margin-bottom:;
  }
`;

const StatisticAmountUnit = styled.span`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  @media (max-width: 650px) {
    text-align: center;
  }
`;

const StatisticAmountEquals = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  margin-top: 0px;
  margin-bottom: 0px;
  @media (max-width: 650px) {
    text-align: center;
  }
`;

const StatisticDay = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
  @media (max-width: 650px) {
    text-align: center;
    justify-content: space-evenly;
  }
`;

const StatisticDayUnit = styled.span`
  display: block;
  width: 40px;
  margin: 0px;
  @media (max-width: 650px) {
    text-align: center;
  }
`;

const StatisticDiffAmount = styled.span`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  @media (max-width: 650px) {
    text-align: center;
  }
`;

const StatisticDiffAmountUp = styled(StatisticDiffAmount)`
  color: #34da6c;
`;

const StatisticDiffAmountDown = styled(StatisticDiffAmount)`
  color: #fc4646;
`;

const ArrowImage = styled.img`
  width: 8px;
  height: 9px;
  margin: 0px 9px 1px 5px;
`;

export default function StatisticData(props) {
  return (
    <StatisticDataDiv>
      <StatisticTitle>{props.title}</StatisticTitle>
      <StatisticAmount>
        {props.amount}&nbsp;{props.unit && <StatisticAmountUnit>PINU</StatisticAmountUnit>}
      </StatisticAmount>
      <StatisticAmountEquals>{props.equals}</StatisticAmountEquals>
      {props.amountDiff && props.amountDiff['24h'] && (
        <StatisticDay>
          <StatisticDayUnit>24h %</StatisticDayUnit>
          {props.amountDiff['24h'] > 0 ? (
            <StatisticDiffAmountUp>
              <ArrowImage src={UpArrow} />
              {props.amountDiff['24h']}%
            </StatisticDiffAmountUp>
          ) : (
            <StatisticDiffAmountDown>
              <ArrowImage src={DownArrow} />
              {-1 * props.amountDiff['24h']}%
            </StatisticDiffAmountDown>
          )}
        </StatisticDay>
      )}
      {props.amountDiff && props.amountDiff['72h'] && (
        <StatisticDay>
          <StatisticDayUnit>72h %</StatisticDayUnit>
          {props.amountDiff['72h'] > 0 ? (
            <StatisticDiffAmountUp>
              <ArrowImage src={UpArrow} />
              {props.amountDiff['72h']}%
            </StatisticDiffAmountUp>
          ) : (
            <StatisticDiffAmountDown>
              <ArrowImage src={DownArrow} />
              {-1 * props.amountDiff['72h']}%
            </StatisticDiffAmountDown>
          )}
        </StatisticDay>
      )}
    </StatisticDataDiv>
  );
}

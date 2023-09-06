import React from 'react';
import styled from 'styled-components';

const PulseInuDistributionDiv = styled.div`
  display: block;
  margin-bottom: 10px;
  @media (max-width: 650px) {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const PulseInuDistributionTitle = styled.h2`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: ${(props) => props.color};
  @media (max-width: 650px) {
    text-align: center;
  }
`;

const PulseInuDistributionAmount = styled.p`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  letter-spacing: 0.05em;
  text-align: left;
  color: ${(props) => props.color};
  margin-top: 0px;
  margin-bottom: 0px;
  @media (max-width: 650px) {
    text-align: center;
    margin-bottom:;
  }
`;

const PulseInuDistributionEquals = styled.p`
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

export default function PulseInuDistribution(props) {
  return (
    <PulseInuDistributionDiv>
      <PulseInuDistributionTitle color={props.color}>{props.title}</PulseInuDistributionTitle>
      <PulseInuDistributionAmount color={props.color}>{props.amount}</PulseInuDistributionAmount>
      <PulseInuDistributionEquals>{props.equals}</PulseInuDistributionEquals>
    </PulseInuDistributionDiv>
  );
}

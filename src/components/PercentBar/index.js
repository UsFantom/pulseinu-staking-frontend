import React from 'react';
import styled from 'styled-components';

const PercentBarDiv = styled.div`
  width: 95%;
  height: 20px;
  border-radius: 30px;
  background: rgba(18, 0, 21, 1);
  margin-left: 2.5%;
`;

const Percent = styled.div`
  width: ${(props) => props.percent}%;
  height: 20px;
  border-radius: 30px;
  background: linear-gradient(
    90deg,
    #fc031c 0%,
    #f10d80 18.41%,
    #ac1dbd 36.81%,
    #6e29e8 55.22%,
    #3c5bfe 73.62%,
    #0dc9fc 92.03%
  );
`;

export default function PercentBar(props) {
  return (
    <PercentBarDiv>
      <Percent percent={props.percent} />
    </PercentBarDiv>
  );
}

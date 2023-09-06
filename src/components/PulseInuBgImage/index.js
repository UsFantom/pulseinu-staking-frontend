import React from 'react';
import styled from 'styled-components';

import PULSEINULOGO from '../../assets/images/pulseinu.svg';

const PulseInuImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  opacity: 0.05;
`;

export default function PulseInuBgImage() {
  return <PulseInuImg src={PULSEINULOGO} />;
}

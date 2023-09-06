import React from 'react';
import styled from 'styled-components';

import NavigateBack from '../../components/NavigateBack';

const PageLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 1);
  background-image: linear-gradient(
    202.01deg,
    rgba(204, 19, 236, 0.26) 4.29%,
    rgba(0, 0, 0, 0.26) 43.63%,
    rgba(0, 181, 255, 0.1664) 97.51%
  );
  overflow-y: auto;
`;

const ContentDiv = styled.div`
  width: 940px;
  margin: auto;
  margin-top: 40px;
  padding-top: 10px;
  padding-bottom: 30px;
  background: #d7e0ff0d;
  border-radius: 30px;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

export default function Stake() {
  return (
    <PageLayout>
      <NavigateBack title="STAKE PULSE INU" navigateTo="/" />
      <ContentDiv></ContentDiv>
    </PageLayout>
  );
}

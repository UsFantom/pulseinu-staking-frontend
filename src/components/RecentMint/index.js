import React from 'react';
import styled from 'styled-components';

import MintedNFTs from '../../components/MintedNFTs';

const RecentMintDiv = styled.div``;

const RecentMintTitleDiv = styled.div`
  position: relative;
  width: 940px;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 20px;
  padding: 10px 0px 0px 0px;
  border-bottom: 0.5px solid #696969;
  @media (max-width: 1044px) {
    width: 87%;
  }
`;

const RecentMintTitle = styled.h1`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #696969;
  text-transform: uppercase;
`;

export default function RecentMint() {
  return (
    <RecentMintDiv>
      <RecentMintTitleDiv>
        <RecentMintTitle>Recently Minted</RecentMintTitle>
      </RecentMintTitleDiv>
      <MintedNFTs />
    </RecentMintDiv>
  );
}

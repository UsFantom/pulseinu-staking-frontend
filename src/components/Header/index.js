import React, { useCallback } from 'react';
import styled from 'styled-components';

import PulseInuLogo from '../../assets/images/pulseinulogo.svg';
import TwitterLogo from '../../assets/images/twitter.svg';
import TelegramLogo from '../../assets/images/telegram.svg';
import MetaMaskLogo from '../../assets/images/metamask.svg';
import WalletConnectButton from './connect';
import { useWeb3React } from '@web3-react/core';
import { useCorrectChain } from '../../hooks/useProvider';
import { useStakingTokenMutation } from '../../queries/useTokenMutation';
import { Link } from 'react-router-dom';

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
  padding: 0px 20px 0px 20px;
`;

const HeaderLogoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    justify-content: center;
  }
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;

const HeaderLogoImg = styled.img`
  width: 70px;
  height: 70px;
`;

const HeaderLogoTitle = styled.h1`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
  color: #d7e0ff;
  margin-left: 20px;
`;

const HeaderMenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    justify-content: center;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const HeaderMenuItem = styled.a`
  text-decoration: none;
  color: #d7e0ff;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.28px;
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;

const HeaderMenuIcon = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;

export default function AmountBurned() {
  const { account, library } = useWeb3React();
  const correctChain = useCorrectChain();
  const stakingTokenMutation = useStakingTokenMutation();

  const addToken = async (token) => {
    try {
      const wasAdded = await library.provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: token
        }
      });
      console.log(wasAdded);
    } catch (error) {
      console.error(error);
    }
  };

  const openUrl = (url) => {
    window.open(url, '_blank');
  };

  const handleAddToken = useCallback(async () => {
    if (!correctChain) return;
    try {
      const token = await stakingTokenMutation.mutateAsync();
      addToken(token);
    } catch (err) {
      console.log(err);
    }
  }, [correctChain]);
  return (
    <HeaderDiv>
      <HeaderLogoDiv>
        <Link to="/">
          <HeaderLogoImg src={PulseInuLogo} />
        </Link>
        <HeaderLogoTitle>PULSE INU</HeaderLogoTitle>
      </HeaderLogoDiv>
      <HeaderMenuDiv>
        <HeaderMenuItem>{account ? `${account.substring(0, 6)}...` : ''}</HeaderMenuItem>
        <HeaderMenuItem href="https://pulseinu.org/whitepaper.pdf" target="_blank">
          WHITEPAPER
        </HeaderMenuItem>
        <HeaderMenuIcon
          src={TwitterLogo}
          width={19}
          height={17}
          onClick={() => openUrl('https://twitter.com/PulseInu')}
        />
        <HeaderMenuIcon
          src={TelegramLogo}
          width={21}
          height={21}
          onClick={() => openUrl('https://t.me/+Z5uINrmzvE9lNjNh')}
        />
        <HeaderMenuIcon src={MetaMaskLogo} width={25} height={25} onClick={handleAddToken} />
        <WalletConnectButton />
      </HeaderMenuDiv>
    </HeaderDiv>
  );
}

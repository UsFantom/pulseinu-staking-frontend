import React from 'react';
import styled from 'styled-components';

import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { getConfig } from '../../config';
import { useCorrectChain } from '../../hooks/useProvider';

const HeaderConnectBtn = styled.button`
  min-width: 152px;
  height: 50px;
  padding: 14px 20px 14px 20px;
  border-radius: 100px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  cursor: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? 'not-allowed' : 'pointer'};
  color: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '#696969' : '#d7e0ff'};
  border: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '1px solid #696969' : 'none'};
  background: ${(props) =>
    props.disabled !== undefined && props.disabled === true
      ? 'transparent'
      : 'radial-gradient(farthest-corner at -17% 291%,#00e8fc 0%,#4f30ff 60%,#f00f8e 95%,#ff0000 100%),linear-gradient(0deg, #ffffff, #ffffff)'};
  &:active {
    border: 0.5px solid var(--line-fill, #413fff);
    background: linear-gradient(
      270deg,
      rgba(252, 0, 33, 0.1) 0%,
      rgba(79, 48, 255, 0.1) 52.08%,
      rgba(240, 15, 142, 0.1) 100%
    );
  }
`;

const Injected = new InjectedConnector();

export default function WalletConnectButton() {
  const { active, activate, deactivate, library } = useWeb3React();
  const correctChain = useCorrectChain();

  const switchNetwork = async () => {
    const config = getConfig();
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.network.chainId }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [config.network]
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const onClicked = () => {
    if (active) {
      if (correctChain) {
        deactivate();
      } else {
        switchNetwork();
      }
    } else {
      activate(Injected);
    }
  };

  const content = () => {
    if (active) {
      if (correctChain) {
        return 'Disconnect';
      } else {
        return 'Switch Network';
      }
    } else {
      return 'Connect';
    }
  };

  return (
    <HeaderConnectBtn onClick={onClicked} disabled={false}>
      {content()}
    </HeaderConnectBtn>
  );
}

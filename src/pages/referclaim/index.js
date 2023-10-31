import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';
import { useWeb3React } from '@web3-react/core';
import { useCorrectChain } from '../../hooks/useProvider';
import {
  DIALOG_TYPES,
  getParameterCaseInsensitive,
  handleContractErrors,
  handleContractSuccess,
  makeTimeString,
  showDialog
} from '../../utils/utils';
import { ADOPTERS, REFERRER_DICT } from '../../const';
import { useStakingTokenContractInfo } from '../../queries/stakingToken';
import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'js-sha3';
import { useReferrerClaimMutation } from '../../queries/useReferrerClaimMutation';
import { useEarlyAdapterClaimMutation } from '../../queries/useEarlyAdapterClaimMutation';

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

const HeaderDiv = styled.div`
  width: 940px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: -150px;
  padding-top: 10px;
  padding-bottom: 30px;
  // background: #d7e0ff0d;
  // border-radius: 30px;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

const ContentDiv = styled.div`
  position: relative;
  width: 940px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  background: transparent;
  border-radius: 30px;
  @media (max-width: 1044px) {
    width: 87%;
  }
`;

const ReferClaimH2 = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 39px;
  margin-top: 4%;
  color: #d7e0ff;
`;

const ClaimsDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  margin-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ClaimsItemDiv = styled.div`
  @media (max-width: 900px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const ClaimBtn = styled.button`
  width: 280px;
  height: 58px;
  padding: 14px 20px 14px 20px;
  border-radius: 50px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  margin-right: 20px;
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  cursor: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? 'not-allowed' : 'pointer'};
  color: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '#696969' : '#d9d9d9'};
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

const ClaimP = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #fff;
`;

const ClaimTitle = styled.p`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

export default function ReferClaim() {
  const { account } = useWeb3React();
  const correctChain = useCorrectChain();
  const stakingTokenContractInfoQuery = useStakingTokenContractInfo();

  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const eligibleForReferral = useMemo(() => {
    if (!account || !correctChain || !stakingTokenContractInfoQuery.data) return false;
    return Boolean(getParameterCaseInsensitive(REFERRER_DICT, account));
  }, [correctChain, account, stakingTokenContractInfoQuery]);

  const eligibleForEarlyAdapter = useMemo(() => {
    if (!account || !correctChain || !stakingTokenContractInfoQuery.data) return false;
    return (
      ADOPTERS.findIndex((item) => account.toString().toLowerCase() === item.toLowerCase()) > -1
    );
  }, [correctChain, account, stakingTokenContractInfoQuery]);

  const mintEndTime = useMemo(() => {
    if (!stakingTokenContractInfoQuery.data) return null;
    return Number(stakingTokenContractInfoQuery.data.mintEndTime._hex) * 1000;
  }, [stakingTokenContractInfoQuery]);

  const referrerClaimMutation = useReferrerClaimMutation();
  const earlyAdapterClaimMutation = useEarlyAdapterClaimMutation();

  const referrerClaim = useCallback(async () => {
    showDialog(DIALOG_TYPES.PROGRESS, `Referrer Claiming`);
    try {
      let percent = getParameterCaseInsensitive(REFERRER_DICT, account);
      if (percent == undefined) {
        percent = 0;
      }
      const addresses = Object.keys(REFERRER_DICT);

      let leafNodes = [];

      for (let i = 0; i < addresses.length; i++) {
        leafNodes.push(keccak256(addresses[i] + REFERRER_DICT[addresses[i]]));
      }

      let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      console.log('referrer merkle tree: ', merkleTree.getRoot().toString('hex'));

      let hashedAddress = keccak256(account + percent);

      let proof = merkleTree.getHexProof(hashedAddress);
      percent = parseInt('0x' + percent, 16);

      const tx = await referrerClaimMutation.mutateAsync({
        proof: proof,
        percent: percent
      });
      handleContractSuccess(`You claimed successfully`);
      console.log(tx);
    } catch (err) {
      handleContractErrors(err);
    }
  }, [referrerClaimMutation]);

  const earlyAdapterClaim = useCallback(async () => {
    showDialog(DIALOG_TYPES.PROGRESS, `Early Adapter Claiming`);
    try {
      let addresses = ADOPTERS; // early adopter addresses

      console.log('keccak:', keccak256(addresses[0]).toString('hex'));
      // Hash leaves
      let leaves = addresses.map((addr) => keccak256(addr));

      // Create tree
      let merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      console.log('early adapter merkle tree: ', merkleTree.getRoot().toString('hex'));
      // 'Serverside' code
      let hashedAddress = keccak256(account);
      let proof = merkleTree.getHexProof(hashedAddress);

      const tx = await earlyAdapterClaimMutation.mutateAsync({
        proof: proof
      });
      console.log(tx);
      handleContractSuccess(`You claimed successfully`);
    } catch (err) {
      handleContractErrors(err);
    }
  }, [referrerClaimMutation]);

  return (
    <PageLayout>
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <ContentDiv>
        <ReferClaimH2>Referrer & Early Adopter Claims</ReferClaimH2>
        <ClaimsDiv>
          <ClaimsItemDiv>
            <ClaimBtn
              disabled={!eligibleForReferral || !mintEndTime || mintEndTime >= currentTime}
              onClick={referrerClaim}>
              Referrer Claim
            </ClaimBtn>
            {!eligibleForReferral || !mintEndTime ? (
              <ClaimP>Not Eligible For Referrer</ClaimP>
            ) : (
              <ClaimTitle>{`Ends in ${makeTimeString(mintEndTime - currentTime)}`}</ClaimTitle>
            )}
          </ClaimsItemDiv>
          <ClaimsItemDiv>
            <ClaimBtn
              disabled={!eligibleForEarlyAdapter || !mintEndTime || mintEndTime >= currentTime}
              onClick={earlyAdapterClaim}>
              Early Adopter Claim
            </ClaimBtn>
            {!eligibleForEarlyAdapter || !mintEndTime ? (
              <ClaimP>Not Eligible For Early Adopter</ClaimP>
            ) : (
              <ClaimTitle>{`Ends in ${makeTimeString(mintEndTime - currentTime)}`}</ClaimTitle>
            )}
          </ClaimsItemDiv>
        </ClaimsDiv>
      </ContentDiv>
    </PageLayout>
  );
}

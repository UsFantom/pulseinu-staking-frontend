import React, { useState } from 'react';
import styled from 'styled-components';

import ReferralsTable from '../ReferralsTable';
import ToggleUpImage from '../../assets/images/toggleup.svg';
import ToggleDownImage from '../../assets/images/toggledown.svg';
import { useWeb3React } from '@web3-react/core';
import { isValidValue } from '../../utils';

const ReferralsDiv = styled.div``;

const ReferralsToggleDiv = styled.div`
  width: 860px;
  height: 40px;
  padding: 5px 30px 5px 30px;
  border-radius: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d7e0ff0d;
  margin: auto;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  @media (max-width: 1044px) {
    width: 89%;
  }
`;

const ReferralTitle = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #696969;
  text-transform: uppercase;
`;

const ReferralToggleImg = styled.img`
  width: 18px;
  height: 18px;
`;

const ReferralDetailDiv = styled.div`
  padding: 20px;
`;

const ReferralDetailTitle = styled.h3`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 300;
  line-height: 26px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #696969;
`;

const ReferralLinkDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1044px) {
    flex-direction: column-reverse;
  }
`;

const ReferralLinkCopyBtn = styled.button`
  width: 170px;
  height: 50px;
  padding: 14px 20px 14px 20px;
  border-radius: 25px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #d9d9d9;
  margin-right: 20px;
  cursor: pointer;
  background: linear-gradient(
    270deg,
    rgba(252, 0, 33, 0.1) 0%,
    rgba(79, 48, 255, 0.1) 52.08%,
    rgba(240, 15, 142, 0.1) 100%
  );
  border: 0.5px solid;
  border-color: linear-gradient(
      100.73deg,
      #413fff -0.17%,
      #00e8ff 23.82%,
      #e916cb 56.09%,
      rgba(0, 0, 0, 0) 121.96%
    )
    1;
`;

const ReferralLinkCopiedBtn = styled.button`
  width: 170px;
  height: 50px;
  padding: 14px 20px 14px 20px;
  border-radius: 25px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #d9d9d9;
  margin-right: 20px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  background: radial-gradient(
      farthest-corner at -17% 291%,
      #00e8fc 0%,
      #4f30ff 60%,
      #f00f8e 95%,
      #ff0000 100%
    ),
    linear-gradient(0deg, #ffffff, #ffffff);
`;

const ReferralLink = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #d7e0ff;
  width: 700px;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  @media (max-width: 1044px) {
    text-align: center;
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`;

export default function Referrals(props) {
  const [copied, setCopied] = useState(false);
  const { account } = useWeb3React();

  const copyToClipboard = () => {
    if (!isValidValue(account)) {
      return;
    }
    setCopied(true);
    navigator.clipboard.writeText(`${process.env.REACT_APP_WEB_LINK}/referrals/${account}`);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <ReferralsDiv>
      <ReferralsToggleDiv onClick={() => props.toggleReferrals()}>
        <ReferralTitle>Referrals</ReferralTitle>
        {props.showReferrals ? (
          <ReferralToggleImg src={ToggleUpImage} />
        ) : (
          <ReferralToggleImg src={ToggleDownImage} />
        )}
      </ReferralsToggleDiv>
      {props.showReferrals && (
        <ReferralDetailDiv>
          <ReferralDetailTitle>Your referral link</ReferralDetailTitle>
          <ReferralLinkDiv>
            {copied ? (
              <ReferralLinkCopiedBtn>Copied</ReferralLinkCopiedBtn>
            ) : (
              <ReferralLinkCopyBtn onClick={() => copyToClipboard()}>Copy</ReferralLinkCopyBtn>
            )}
            <ReferralLink>{`${process.env.REACT_APP_WEB_LINK}/referrals/${
              account ?? ''
            }`}</ReferralLink>
          </ReferralLinkDiv>
          <ReferralDetailTitle>Your referrals</ReferralDetailTitle>
          <ReferralsTable />
        </ReferralDetailDiv>
      )}
    </ReferralsDiv>
  );
}

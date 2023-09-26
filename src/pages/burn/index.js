import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';
import NavigateBack from '../../components/NavigateBack';
import LegendaryCollectorSelect from '../../components/LegendaryCollectorSelect';
import RecentMint from '../../components/RecentMint';

import BurnImage from '../../assets/images/burn.svg';
import { useBoostNftTokenTypesPrices } from '../../queries/useBoostNft';
import { useWeb3React } from '@web3-react/core';
import { useMintMutation } from '../../queries/useMintMutation';
import { useStakingTokenUserBalance } from '../../queries/useStaking';
import {
  DIALOG_TYPES,
  handleContractErrors,
  handleContractSuccess,
  showDialog
} from '../../utils/utils';

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
  background: #d7e0ff0d;
  border-radius: 30px;
  @media (max-width: 1044px) {
    width: 87%;
  }
`;

const BurnContentTitle = styled.h1`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
  color: #d7e0ff;
  margin-left: 20px;
  position: relative;
  z-index: 1;
`;

const BurnContentDetail = styled.p`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #696969;
  width: 498px;
  margin-left: 20px;
  position: relative;
  z-index: 1;
  @media (max-width: 1044px) {
    width: 53%;
  }
`;

const BurnImg = styled.img`
  position: absolute;
  top: -20px;
  right: 10px;
`;

const BurnConfirmDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
`;

const BurnConfirmTitleDiv = styled.div`
  width: 48%;
  @media (max-width: 1044px) {
    width: 96%;
  }
`;

const BurnConfirmButtonDiv = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1044px) {
    align-items: center;
  }
`;

const BurnConfirmBtn = styled.button`
  width: 200px;
  height: 50px;
  padding: 14px 20px 14px 20px;
  border-radius: 25px;
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

const BurnCancelBtn = styled.button`
  width: 200px;
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
  margin-bottom: 20px;
`;

export default function Burn() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (select) => {
    setSelected(select);
  };

  const stakingTokenuserBalanceQuery = useStakingTokenUserBalance();

  const boostNftTokenTypesPricesQuery = useBoostNftTokenTypesPrices();
  const { account } = useWeb3React();
  const mintMutation = useMintMutation();

  const [updateTime, setUpdateTime] = useState(new Date().getMilliseconds());

  const valid = () => {
    if (stakingTokenuserBalanceQuery.data && boostNftTokenTypesPricesQuery.data && account) {
      if ((!selected && selected !== 0) || !boostNftTokenTypesPricesQuery.data) {
        return false;
      }
      return stakingTokenuserBalanceQuery.data >= boostNftTokenTypesPricesQuery.data[selected];
    }
    return false;
  };

  const handleConfirm = useCallback(async () => {
    if (!account || (!selected && selected !== 0) || !boostNftTokenTypesPricesQuery.data) {
      return;
    }
    showDialog(DIALOG_TYPES.PROGRESS, 'Burning');
    try {
      const tx = await mintMutation.mutateAsync({
        type: selected,
        amount: boostNftTokenTypesPricesQuery.data[selected]
      });
      console.log(tx);
      handleContractSuccess(
        `You burnt ${boostNftTokenTypesPricesQuery.data[selected]} PINU successfully`
      );
      setUpdateTime(new Date().getMilliseconds());
    } catch (err) {
      handleContractErrors(err);
    }
  }, [mintMutation, account, selected, boostNftTokenTypesPricesQuery.data]);

  return (
    <PageLayout>
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <NavigateBack title="BURN PULSE INU" navigateTo="/stake" />
      <ContentDiv>
        {selected === null ? (
          <>
            <BurnContentTitle>Burn Pulse Inu, get yield boosting NFTs!</BurnContentTitle>
            <BurnContentDetail>
              Pulse Inu NFTs are a fun way to earn yield on all Pulse Inu ecosystem projects
            </BurnContentDetail>
          </>
        ) : (
          <BurnConfirmDiv>
            <BurnConfirmTitleDiv>
              <BurnContentTitle>Confirm selection</BurnContentTitle>
              <BurnContentDetail>
                Are you sure want to proceed with selected tier?
              </BurnContentDetail>
            </BurnConfirmTitleDiv>
            <BurnConfirmButtonDiv>
              <BurnCancelBtn onClick={() => handleSelect(null)}>Cancel</BurnCancelBtn>
              <BurnConfirmBtn onClick={handleConfirm} disabled={false && !valid()}>
                Confirm
              </BurnConfirmBtn>
            </BurnConfirmButtonDiv>
          </BurnConfirmDiv>
        )}
        <BurnImg src={BurnImage} />
      </ContentDiv>
      <LegendaryCollectorSelect selected={selected} setSelected={(value) => handleSelect(value)} />
      <RecentMint updateTime={updateTime} />
    </PageLayout>
  );
}

import { useWeb3React } from '@web3-react/core';
import { useStakingPoolContract, useERC20Contract } from '../hooks/useContract';
import { useQuery } from 'react-query';
import { getConfig } from '../config';
import { ethers } from 'ethers';
import { isValidValue } from '../utils';

export const useStakingToken = () => {
  const config = getConfig();
  const stakingToken = config?.contracts?.stakingToken;
  return useQuery(['stakingToken', stakingToken], () => stakingToken, {
    enabled: Boolean(stakingToken)
  });
};

export const useBurnAddress = () => {
  const config = getConfig();
  const burnAddress = config?.contracts?.burnAddress;
  return useQuery(['useBurnAddress', burnAddress], () => burnAddress, {
    enabled: Boolean(burnAddress)
  });
};

export const useStakingTokenUserBalance = () => {
  const { account } = useWeb3React();
  const query = useStakingToken();
  const contract = useERC20Contract(query.data);

  return useQuery(
    ['useStakingTokenUserBalance', account],
    async () => await Promise.all([contract.balanceOf(account), contract.decimals()]),
    {
      enabled: Boolean(contract && account),
      select: ([balance, decimals]) => ethers.formatUnits(balance, decimals)
    }
  );
};

export const useGetLengthBonus = () => {
  const contract = useStakingPoolContract();
  const stakingTokenQuery = useStakingToken();
  const erc20Contract = useERC20Contract(stakingTokenQuery.data);
  return useQuery(
    ['useGetLengthBonus'],
    async () => await Promise.all([contract.getLengthBonus(), erc20Contract.decimals()]),
    {
      enabled: Boolean(contract && erc20Contract && stakingTokenQuery.data),
      select: ([lengthBonus, decimals]) => ethers.formatUnits(lengthBonus, decimals)
    }
  );
};

export const useStakingTotalReward = () => {
  const contract = useStakingPoolContract();

  return useQuery(['useStakingTotalReward'], async () => await contract.totalReward(), {
    enabled: Boolean(contract),
    select: (totalReward) => ethers.formatUnits(totalReward, 18)
  });
};

export const useStakingTotalStaked = () => {
  const contract = useStakingPoolContract();
  const stakingTokenQuery = useStakingToken();
  const erc20Contract = useERC20Contract(stakingTokenQuery.data);
  return useQuery(
    ['useStakingTotalStaked', stakingTokenQuery.data],
    async () => await Promise.all([contract.totalStaked(), erc20Contract.decimals()]),
    {
      enabled: Boolean(contract && erc20Contract && stakingTokenQuery.data),
      select: ([totalStaked, decimals]) => ethers.formatUnits(totalStaked, decimals)
    }
  );
};

export const useStakingReferrals = () => {
  const { account } = useWeb3React();
  const contract = useStakingPoolContract();
  return useQuery(['useStakingReferrals', account], async () => await contract.referrals(account), {
    enabled: Boolean(contract && account),
    select: (referrals) => referrals
  });
};

export const useStakingInfo = () => {
  const { account } = useWeb3React();
  const contract = useStakingPoolContract();
  const stakingTokenQuery = useStakingToken();
  const erc20Contract = useERC20Contract(stakingTokenQuery.data);
  return useQuery(
    ['useStakingInfo', stakingTokenQuery.data, account],
    async () => await Promise.all([contract.userStakingInfo(account), erc20Contract.decimals()]),
    {
      enabled: Boolean(contract && erc20Contract && stakingTokenQuery.data && account),
      select: ([stakingInfo, decimals]) => {
        return {
          stakingInfo: stakingInfo,
          decimals
        };
      }
    }
  );
};

export const useStakingTokenBurnedAmount = () => {
  const stakingTokenQuery = useStakingToken();
  const burnAddressQuery = useBurnAddress();
  const contract = useERC20Contract(stakingTokenQuery.data);
  return useQuery(
    ['useStakingTokenBurnedAmount', stakingTokenQuery.data, burnAddressQuery.data],
    async () => await Promise.all([contract.balanceOf(burnAddressQuery.data), contract.decimals()]),
    {
      enabled: Boolean(contract && burnAddressQuery.data && stakingTokenQuery.data),
      select: ([balance, decimals]) => ethers.formatUnits(balance, decimals)
    }
  );
};

export const useStakingTokenTotalSupply = () => {
  const stakingTokenQuery = useStakingToken();
  const contract = useERC20Contract(stakingTokenQuery.data);
  return useQuery(
    ['useStakingTokenTotalSupply', stakingTokenQuery.data],
    async () => await Promise.all([contract.totalSupply(), contract.decimals()]),
    {
      enabled: Boolean(contract && stakingTokenQuery.data),
      select: ([totalSupply, decimals]) => ethers.formatUnits(totalSupply, decimals)
    }
  );
};

export const useStakingTokenBurnPercent = () => {
  const stakingTokenBurnedAmountQuery = useStakingTokenBurnedAmount();
  const stakingTokenTotalSupply = useStakingTokenTotalSupply();
  return useQuery(
    [
      'useStakingTokenBurnPercent',
      stakingTokenBurnedAmountQuery.data,
      stakingTokenTotalSupply.data
    ],
    () => (stakingTokenBurnedAmountQuery.data / stakingTokenTotalSupply.data) * 100,
    {
      enabled: Boolean(
        isValidValue(stakingTokenBurnedAmountQuery.data) &&
          isValidValue(stakingTokenTotalSupply.data)
      ),
      select: (percent) => percent
    }
  );
};

export const useStakingTokenUserAllowance = () => {
  const { account } = useWeb3React();
  const query = useStakingToken();
  const contract = useERC20Contract(query.data);
  const config = getConfig();

  return useQuery(
    ['useStakingTokenUserAllowance', account],
    async () => await contract.allowance(account, config.contracts.stakingPool.address),
    {
      enabled: Boolean(contract && account && query.data)
    }
  );
};

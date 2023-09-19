import { useWeb3React } from '@web3-react/core';
import { useStakingPoolContract, useERC20Contract } from '../hooks/useContract';
import { useQuery } from 'react-query';
import { getConfig } from '../config';
import { ethers } from 'ethers';
import { isValidValue } from '../utils';
import { formatNumber } from '../utils/utils';

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
      select: ([balance, decimals]) => ethers.utils.formatUnits(balance, decimals)
    }
  );
};

export const useGetUserBoostPercent = (amount) => {
  const { account } = useWeb3React();
  const contract = useStakingPoolContract(false);
  return useQuery(
    ['useGetUserBoostPercent', amount],
    async () => await contract.getUserBoostPercent(account),
    {
      enabled: Boolean(contract && amount && account),
      select: (userBoostPercent) => {
        return formatNumber(amount * parseFloat(userBoostPercent));
      }
    }
  );
};

export const useGetLengthBonus = (amount, days) => {
  const contract = useStakingPoolContract();
  const stakingTokenQuery = useStakingToken();
  const erc20Contract = useERC20Contract(stakingTokenQuery.data);
  return useQuery(
    ['useGetLengthBonus', amount, days],
    async () => {
      const decimals = await erc20Contract.decimals();
      return [
        decimals,
        ...[await contract.getLengthBonus(ethers.utils.parseUnits(amount, decimals), days)]
      ];
    },
    {
      enabled: Boolean(contract && erc20Contract && stakingTokenQuery.data && amount && days),
      select: ([decimals, lengthBonus]) =>
        formatNumber(ethers.utils.formatUnits(lengthBonus, decimals))
    }
  );
};

export const useStakingTotalReward = () => {
  const contract = useStakingPoolContract();

  return useQuery(['useStakingTotalReward'], async () => await contract.totalReward(), {
    enabled: Boolean(contract),
    select: (totalReward) => ethers.utils.formatEther(totalReward)
  });
};

export const useStakingFee = () => {
  const contract = useStakingPoolContract();

  return useQuery(['useStakingFee'], async () => await contract.stakingFee(), {
    enabled: Boolean(contract),
    select: (stakingFee) => ethers.utils.formatEther(stakingFee)
  });
};

export const useStakingTotalRewardPaid = () => {
  const contract = useStakingPoolContract();

  return useQuery(['useStakingTotalRewardPaid'], async () => await contract.totalRewardPaid(), {
    enabled: Boolean(contract),
    select: (totalRewardPaid) => ethers.utils.formatEther(totalRewardPaid)
  });
};

export const useStakingShareRateBasis = () => {
  const contract = useStakingPoolContract();

  return useQuery(['useStakingShareRateBasis'], async () => await contract.getShareRateBasis(), {
    enabled: Boolean(contract),
    select: (shareRateBasis) => shareRateBasis
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
      select: ([totalStaked, decimals]) => ethers.utils.formatUnits(totalStaked, decimals)
    }
  );
};

export const useStakingUserReferrals = () => {
  const { account } = useWeb3React();
  const contract = useStakingPoolContract();
  const stakingTokenQuery = useStakingToken();
  const stakingFeeQuery = useStakingFee();
  return useQuery(
    ['useStakingUserReferrals', account],
    async () =>
      await Promise.all([contract.getUserReferrals(account), contract.getStakingReferrerPercent()]),
    {
      enabled: Boolean(contract && stakingFeeQuery.data && stakingTokenQuery.data && account),
      select: ([userReferrals, stakingReferrerPercent]) => {
        return userReferrals.map((referral) => {
          return {
            address: referral,
            amount: (stakingFeeQuery.data * stakingReferrerPercent) / 1e4
          };
        });
      }
    }
  );
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
      select: ([balance, decimals]) => ethers.utils.formatUnits(balance, decimals)
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
      select: ([totalSupply, decimals]) => ethers.utils.formatUnits(totalSupply, decimals)
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

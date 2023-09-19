import { useWeb3React } from '@web3-react/core';
import { useERC20Contract, useStakingPoolContract } from '../hooks/useContract';
import { useStakingToken } from './useStaking';
import { useMutation } from 'react-query';
import { getConfig } from '../config';
import { ethers } from 'ethers';

export const useStakeMutation = () => {
  const config = getConfig();
  const { account } = useWeb3React();
  const contract = useStakingPoolContract(false);
  const stakingToken = useStakingToken();
  const tokenContract = useERC20Contract(stakingToken.data, false);

  return useMutation('stakeMutation', async ({ amount, days, referrer }) => {
    const decimals = await tokenContract.decimals();
    amount = ethers.utils.parseUnits(amount.toString(), decimals);
    const allowance = await tokenContract.allowance(account, config.contracts.stakingPool.address);
    if (allowance < amount) {
      const tx = await tokenContract.approve(config.contracts.stakingPool.address, amount);
      try {
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    }
    const stakingFee = await contract.stakingFee();
    const tx = await contract.stake(amount, days, referrer, stakingFee);
    try {
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    return tx;
  });
};

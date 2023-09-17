import { useWeb3React } from '@web3-react/core';
import { useERC20Contract, useStakingPoolContract } from '../hooks/useContract';
import { useStakingToken } from './useStaking';
import { useMutation } from 'react-query';
import { getConfig } from '../config';

export const useStakeMutation = () => {
  const config = getConfig();
  const { account } = useWeb3React();
  const contract = useStakingPoolContract();
  const stakingToken = useStakingToken();
  const tokenContract = useERC20Contract(stakingToken.data, false);

  return useMutation('stakeMutation', async ({ amount, days }) => {
    const allowance = await tokenContract.allowance(account, config.contracts.stakingPool.address);
    if (allowance < amount) {
      const tx = await tokenContract.approve(config.contracts.stakingPool.address, amount);
      await tx.wait();
    }
    const tx = await contract.stake(amount, days);
    await tx.wait();

    return tx;
  });
};

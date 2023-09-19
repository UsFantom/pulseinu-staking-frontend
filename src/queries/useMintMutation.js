import { useWeb3React } from '@web3-react/core';
import { useBoostNftContract, useERC20Contract } from '../hooks/useContract';
import { useStakingToken } from './useStaking';
import { useMutation } from 'react-query';
import { getConfig } from '../config';
import { ethers } from 'ethers';

export const useMintMutation = () => {
  const config = getConfig();
  const { account } = useWeb3React();
  const contract = useBoostNftContract(false);
  const stakingToken = useStakingToken();
  const tokenContract = useERC20Contract(stakingToken.data, false);

  return useMutation('mintMutation', async ({ type, amount }) => {
    const decimals = await tokenContract.decimals();
    amount = ethers.utils.parseUnits(amount.toString(), decimals);
    const allowance = await tokenContract.allowance(account, config.contracts.boostNft.address);
    if (allowance < amount) {
      const tx = await tokenContract.approve(config.contracts.boostNft.address, amount);
      try {
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    }
    const tx = await contract.mint(type);
    try {
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    return tx;
  });
};

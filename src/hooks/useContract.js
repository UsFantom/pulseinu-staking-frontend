import { useMemo } from 'react';
import { getConfig } from '../config';
import { ERC20Contract } from '../services/contracts/erc20Contract/erc20Contract';
import { StakingPoolContract } from '../services/contracts/stackingPoolContract/stakingPoolContract';
import { useProvider } from './useProvider';
import { BoostNftContract } from '../services/contracts/boostNft/boostNft';
import { StakingTokenContract } from '../services/contracts/stakingTokenContract/stakingTokenContract';
import { useStakingToken } from '../queries/useStaking';

export const useStakingPoolContract = (readOnly = true) => {
  const provider = useProvider(readOnly);
  const config = getConfig();
  return useMemo(
    () =>
      provider ? new StakingPoolContract(config.contracts.stakingPool.address, provider) : null,
    [provider]
  );
};

export const useBoostNftContract = (readOnly = true) => {
  const provider = useProvider(readOnly);
  const config = getConfig();
  return useMemo(
    () => (provider ? new BoostNftContract(config.contracts.boostNft.address, provider) : null),
    [provider]
  );
};

export const useERC20Contract = (tokenAddress, readOnly = true) => {
  const provider = useProvider(readOnly);
  return useMemo(
    () => (tokenAddress && provider ? new ERC20Contract(tokenAddress, provider) : null),
    [tokenAddress, provider]
  );
};

export const useStakingTokenContract = (readOnly = true) => {
  const provider = useProvider(readOnly);
  const stakingTokenQuery = useStakingToken();
  return useMemo(() => {
    if (!provider || !stakingTokenQuery.data) return null;
    return new StakingTokenContract(stakingTokenQuery.data, provider);
  }, [stakingTokenQuery.data, provider]);
};

import { useMemo } from 'react';
import { getConfig } from '../config';
import { ERC20Contract } from '../services/contracts/erc20Contract/erc20Contract';
import { StakingPoolContract } from '../services/contracts/stackingPoolContract/stakingPoolContract';
import { useProvider } from './useProvider';

export const useStakingPoolContract = (readOnly = true) => {
  const provider = useProvider(readOnly);
  const config = getConfig();
  return useMemo(
    () =>
      provider ? new StakingPoolContract(config.contracts.stakingPool.address, provider) : null,
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

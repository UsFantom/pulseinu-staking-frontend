import { getConfig } from '../config';
import { useERC20Contract } from '../hooks/useContract';
import { useStakingToken } from './useStaking';
import { useMutation } from 'react-query';

export const useStakingTokenMutation = () => {
  const stakingToken = useStakingToken();
  const config = getConfig();
  const stakingTokenImage = config?.contracts?.stakingTokenImage;
  const tokenContract = useERC20Contract(stakingToken.data, false);

  return useMutation('stakingTokenMutation', async () => {
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();

    return { symbol, decimals, address: stakingToken.data, image: stakingTokenImage };
  });
};

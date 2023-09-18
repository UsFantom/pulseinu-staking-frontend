import { useQuery } from 'react-query';
import { getConfig } from '../config';
import { useBoostNftContract, useERC20Contract } from '../hooks/useContract';
import { useStakingToken } from './useStaking';
import { ethers } from 'ethers';

export const useBoostNftTokenTypesPrices = () => {
  const config = getConfig();
  const tokenTypes = config?.contracts?.boostNft?.tokenTypes;
  const contract = useBoostNftContract(config?.contracts?.boostNft?.address);
  const stakingTokenQuery = useStakingToken();
  const erc20Contract = useERC20Contract(stakingTokenQuery.data);

  return useQuery(
    ['useBoostNftTokenTypesPrices'],
    async () =>
      await Promise.all(
        [erc20Contract.decimals()].concat(
          tokenTypes.map((tokenType) => contract.tokenTypePrice(tokenType))
        )
      ),
    {
      enabled: Boolean(contract && erc20Contract && config?.contracts?.boostNft?.tokenTypes),
      select: ([decimals, ...prices]) => {
        return prices.map((price) => ethers.utils.formatUnits(price, decimals));
      }
    }
  );
};

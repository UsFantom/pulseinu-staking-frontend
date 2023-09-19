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

export const useBoostNftTotalSupply = () => {
  const config = getConfig();
  const contract = useBoostNftContract(config?.contracts?.boostNft?.address);
  const stakingTokenQuery = useStakingToken();
  const erc20Contract = useERC20Contract(stakingTokenQuery.data);
  const tokenBoostNftTokenTypesPricesQuery = useBoostNftTokenTypesPrices();

  return useQuery(
    ['useBoostNftTotalSupply'],
    async () => {
      let totalSupply = await contract.totalSupply();
      totalSupply = parseInt(totalSupply);
      const promises = [];
      const ids = [];
      for (let i = totalSupply - 1; i >= Math.max(0, totalSupply - 10); i--) {
        promises.push(contract.tokenIdToType(i));
        ids.push(i);
      }
      const types = await Promise.all(promises);
      const nfts = types.map((type, index) => {
        return {
          id: ids[index],
          type: parseInt(type),
          price: tokenBoostNftTokenTypesPricesQuery.data[parseInt(type)]
        };
      });
      return nfts;
    },
    {
      enabled: Boolean(contract && erc20Contract && tokenBoostNftTokenTypesPricesQuery.data),
      select: (prices) => prices
    }
  );
};

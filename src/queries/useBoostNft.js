import { getConfig } from '../config';
import { useBoostNftContract } from '../hooks/useContract';

export const useBoostNftTokenTypesPrices = () => {
  const config = getConfig();
  const tokenTypes = config.boostNft.tokenTypes;
  const contract = useBoostNftContract(config.boostNft.address);

  return useQuery(['useBoostNftTokenTypesPrices', account], async () => await Promise.all([]), {
    enabled: Boolean(contract && account),
    select: ([balance, decimals]) => ethers.formatUnits(balance, decimals)
  });
};

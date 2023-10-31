import { useQuery } from 'react-query';
import { useStakingTokenContract } from '../hooks/useContract';

export const useStakingTokenContractInfo = () => {
  const contract = useStakingTokenContract();

  return useQuery(
    ['useStakingTokenContractInfo'],
    async () => {
      try {
        return await contract.contractInfo();
      } catch (error) {
        return null;
      }
    },
    {
      enabled: Boolean(contract),
      select: (contractInfo) => {
        if (!contractInfo) return null;
        return {
          airdropAmount: contractInfo.airdropAmount,
          mintEndTime: contractInfo.mintEndTime,
          pricePINU: contractInfo.pricePINU,
          referrerPercent: contractInfo.referrerPercent
        };
      }
    }
  );
};

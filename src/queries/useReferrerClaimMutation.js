import { useStakingTokenContract } from '../hooks/useContract';
import { useMutation } from 'react-query';

export const useReferrerClaimMutation = () => {
  const stakingTokenContract = useStakingTokenContract(false);

  return useMutation('referrerClaimMutation', async ({ proof, percent }) => {
    const tx = await stakingTokenContract.claimReferrer(proof, percent);
    try {
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    return tx;
  });
};

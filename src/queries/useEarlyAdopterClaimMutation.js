import { useStakingTokenContract } from '../hooks/useContract';
import { useMutation } from 'react-query';

export const useEarlyAdopterClaimMutation = () => {
  const stakingTokenContract = useStakingTokenContract(false);

  return useMutation('earlyAdopterClaimMutation', async ({ proof }) => {
    const tx = await stakingTokenContract.claimFirstAdopter(proof);
    try {
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    return tx;
  });
};

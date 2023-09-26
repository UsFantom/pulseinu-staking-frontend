import { useStakingPoolContract } from '../hooks/useContract';
import { useMutation } from 'react-query';

export const useUnStakeMutation = () => {
  const contract = useStakingPoolContract(false);

  return useMutation('stakeMutation', async (index) => {
    const tx = await contract.unstake(index);
    try {
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    return tx;
  });
};

import { useQuery } from 'react-query';
import { DEXTOOL_API_KEY, DEXTOOL_API_URL, getConfig } from '../config';

export const usestakingTokenToWrapperInfo = () => {
  const config = getConfig();
  const pair = config.stakingTokenToWrapper;
  const chainSlug = config.chainSlug;

  return useQuery(
    ['usestakingTokenToWrapperInfo'],
    async () => {
      const headers = {
        accept: 'application/json',
        'X-API-Key': DEXTOOL_API_KEY,
        mode: 'cors'
      };
      const response = await fetch(`${DEXTOOL_API_URL}/pair?chain=${chainSlug}&address/${pair}`, {
        method: 'GET',
        headers: headers
      });
      return await response.json();
    },
    {
      enabled: Boolean(pair && chainSlug && DEXTOOL_API_KEY && DEXTOOL_API_URL),
      select: (result) => result
    }
  );
};

export const useStakingTokenToUSDCInfo = () => {
  const config = getConfig();
  const pair = config.stakingTokenToUSDC;
  const chainSlug = config.chainSlug;

  return useQuery(
    ['useStakingTokenToUSDCInfo'],
    async () => {
      const headers = {
        accept: 'application/json',
        'X-API-Key': DEXTOOL_API_KEY,
        mode: 'cors'
      };
      const response = await fetch(`${DEXTOOL_API_URL}/pair?chain=${chainSlug}&address/${pair}`, {
        method: 'GET',
        headers: headers
      });
      return await response.json();
    },
    {
      enabled: Boolean(pair && chainSlug && DEXTOOL_API_KEY && DEXTOOL_API_URL),
      select: (result) => result
    }
  );
};

import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { DEFAULT_CHAIN_ID, getConfig } from '../config';

export const useProvider = (readOnly = true) => {
  if (readOnly) {
    const config = getConfig();
    return new JsonRpcProvider(config?.rpcUrl);
  }
  const { connector } = useWeb3React();

  const providerQuery = useQuery(
    ['provider'],
    async () => {
      const provider = await connector.getProvider();
      return provider;
    },
    {
      enabled: Boolean(connector),
      select: (provider) => new Web3Provider(provider)
    }
  );

  return useMemo(() => providerQuery.data, [providerQuery]);
};

export const useCorrectChain = () => {
  const { chainId } = useWeb3React();
  const chainQuery = useQuery(['chain', chainId], () => chainId, {
    enabled: Boolean(chainId)
  });
  return useMemo(
    () => chainQuery.data === DEFAULT_CHAIN_ID,
    [chainQuery.data, DEFAULT_CHAIN_ID, chainId]
  );
};

export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

if (typeof INFURA_KEY === 'undefined') {
  throw new Error('REACT_APP_INFURA_KEY must be a defined in .env file\n');
}

export const CONFIG = {
  11155111: {
    contracts: {
      stakingPool: {
        address: '0x9F2bb1749C0ACEf5df711B4Ff25DBe11Fd1cEBC5'
      },
      boostNft: {
        address: '0xcC1424a159118de710a4f011feBf663ed9A5e8b4'
      },
      stakingToken: '0xbFb94A0736681D35EA3AE16838F50378788d5182',
      burnAddress: '0x000000000000000000000000000000000000dEaD'
    },
    rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    network: {
      chainId: '0xAA36A7',
      rpcUrls: ['https://sepolia.infura.io/v3'],
      chainName: 'Sepolia test network',
      nativeCurrency: { name: 'SepoliaETH', decimals: 18, symbol: 'ETH' },
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
      iconUrls: ['https://chainlist.org/unknown-logo.png']
    }
  },
  369: {
    contracts: {},
    network: {
      chainId: 369,
      rpcUrls: ['https://pulsechain.publicnode.com'],
      chainName: 'PulseChain',
      nativeCurrency: { name: 'PLS', decimals: 18, symbol: 'PLS' },
      blockExplorerUrls: ['https://scan.pulsechain.com'],
      iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_pulse.jpg']
    }
  }
};

const SUPPORTED_CHAIN_ID_LIST = Object.keys(CONFIG);

if (!SUPPORTED_CHAIN_ID_LIST.includes(process.env.REACT_APP_CHAIN_ID)) {
  throw new Error(
    `Chain Id ${
      process.env.REACT_APP_CHAIN_ID
    } is wrong\nSupported chain ids are ${SUPPORTED_CHAIN_ID_LIST.join(
      ', '
    )}\nPlease set correct REACT_APP_CHAIN_ID in .env file\n`
  );
}

export const DEFAULT_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID);

export const getConfig = (chainId = process.env.REACT_APP_CHAIN_ID) => {
  return CONFIG[chainId] ?? null;
};

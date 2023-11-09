export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

if (typeof INFURA_KEY === 'undefined') {
  throw new Error('REACT_APP_INFURA_KEY must be a defined in .env file\n');
}

export const DEXTOOL_API_URL = process.env.REACT_APP_DEXTOOL_API_URL;

// if (typeof DEXTOOL_API_URL === 'undefined') {
//   throw new Error('REACT_APP_DEXTOOL_API_URL must be a defined in .env file\n');
// }

export const DEXTOOL_API_KEY = process.env.REACT_APP_DEXTOOL_API_KEY;

// if (typeof DEXTOOL_API_KEY === 'undefined') {
//   throw new Error('REACT_APP_DEXTOOL_API_KEY must be a defined in .env file\n');
// }

export const CONFIG = {
  11155111: {
    contracts: {
      stakingPool: {
        address: '0xC58E79587B5CdB4E8649E02D678EF1Cc2CdB0079'
      },
      boostNft: {
        address: '0x7AaF731E0275705298EA0f541C0C455aE8E4Bd88',
        tokenTypes: [0, 1]
      },
      stakingToken: '0xbFb94A0736681D35EA3AE16838F50378788d5182',
      burnAddress: '0x000000000000000000000000000000000000dEaD'
    },
    chainSlug: 'sepolia',
    stakingTokenToWrapper: '0x3c617dfe0685b5269395be095c307b02c7ec418a',
    stakingTokenToUSDC: '0x3e520cc96a444256d6d8bd220233554daec51e42',
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
    contracts: {
      stakingPool: {
        address: '0x41550ba6b244C1e67F8C385a2738D60d9C927167'
      },
      boostNft: {
        address: '0x2B307dB5C0b745B0D77d424479f1F4D37980383F',
        tokenTypes: [0, 1]
      },
      stakingToken: '0xa12e2661ec6603cbbb891072b2ad5b3d5edb48bd',
      stakingTokenImage: 'https://pulseinu.org/assets/images/pinu_small.png',
      burnAddress: '0x000000000000000000000000000000000000dEaD'
    },
    chainSlug: 'pulse',
    stakingTokenToWrapper: '0x3c617dfe0685b5269395be095c307b02c7ec418a',
    stakingTokenToUSDC: '0x3e520cc96a444256d6d8bd220233554daec51e42',
    rpcUrl: `https://pulsechain.publicnode.com`,
    network: {
      chainId: '0x171',
      rpcUrls: ['https://pulsechain.publicnode.com'],
      chainName: 'PulseChain',
      nativeCurrency: { name: 'PLS', decimals: 18, symbol: 'PLS' },
      blockExplorerUrls: ['https://scan.pulsechain.com'],
      iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_pulse.jpg']
    }
  },
  943: {
    contracts: {
      stakingPool: {
        address: '0x90C84185EC7977aa54C824c3120cDA86f88aA7c3'
      },
      boostNft: {
        address: '0xcC1424a159118de710a4f011feBf663ed9A5e8b4',
        tokenTypes: [0, 1]
      },
      stakingToken: '0x6eB0864C8568dC4361CC8A56703F154cC44dF353',
      stakingTokenImage: 'https://pulseinu.org/assets/images/pinu_small.png',
      burnAddress: '0x000000000000000000000000000000000000dEaD'
    },
    chainSlug: 'pulse',
    stakingTokenToWrapper: '0x3c617dfe0685b5269395be095c307b02c7ec418a',
    stakingTokenToUSDC: '0x3e520cc96a444256d6d8bd220233554daec51e42',
    rpcUrl: `https://pulsechain-testnet.publicnode.com`,
    network: {
      chainId: '0x3AF',
      rpcUrls: ['https://pulsechain-testnet.publicnode.com'],
      chainName: 'PulseChain Testnet v4',
      nativeCurrency: { name: 'tPLS', decimals: 18, symbol: 'tPLS' },
      blockExplorerUrls: ['https://scan.v4.testnet.pulsechain.com'],
      iconUrls: ['https://chainlist.org/unknown-logo.png']
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

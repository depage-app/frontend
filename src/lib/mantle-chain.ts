import { Chain } from "wagmi";

export const mantle = {
  id: 5001,
  name: "Mantle Testnet",
  network: "mantle_testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BIT",
    symbol: "BIT",
  },
  rpcUrls: {
    public: { http: ["https://rpc.testnet.mantle.xyz"] },
    default: { http: ["https://rpc.testnet.mantle.xyz"] },
  },
  //   blockExplorers: {
  //     etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  //     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  //   },
  //   contracts: {
  //     multicall3: {
  //       address: '0xca11bde05977b3631167028862be2a173976ca11',
  //       blockCreated: 11_907_934,
  //     },
  //   },
} as const satisfies Chain;

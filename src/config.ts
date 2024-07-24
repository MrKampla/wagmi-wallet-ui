import { http } from 'wagmi';
import { polygon, base, hardhat } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'Wagmi Wallet UI',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [polygon, base, hardhat],
  transports: {
    [polygon.id]: http('https://polygon-pokt.nodies.app'),
    [base.id]: http(),
    [hardhat.id]: http('http://localhost:8545'),
  },
});

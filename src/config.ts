import { http } from 'wagmi';
import { polygon, base } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'Wagmi Wallet UI',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [polygon, base],
  transports: {
    [polygon.id]: http('https://polygon-pokt.nodies.app'),
    [base.id]: http(),
  },
});

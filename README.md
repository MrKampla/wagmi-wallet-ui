# Wagmi Wallet UI

Fully customizable wallet UI for Wagmi dapps.

If you have native account abstraction built into your dapp, you can use this wallet UI to allow users to interact with their funds stored on integrated wallets.

This wallet UI is built with React and TypeScript and it requires your built in wallet to follow Wagmi api but is not opinionated on how you implement connectors. You can use Wagmi Wallet UI with Rainbowkit, default wagmi connectors, account abstraction or implement your own connectors.

## Installation

```bash
npm install wagmi-wallet-ui @tanstack/react-query viem wagmi
```

In order to work wagmi-wallet-ui needs viem, wagmi (at least v2) and @tanstack/react-query as peer dependencies.

## Usage

1. Setup `wagmi` and make sure to only use `WagmiWalletUI` inside `WagmiProvider` from `wagmi` and `QueryClientProvider` from `@tanstack/react-query`. `WagmiWalletUi` will automatically pick up context of your `wagmi` setup.

2. Configure the wallet ui component with props. Only one prop is required: `tokens` which is an array of objects with following properties:

   ```ts
   export type Token = {
     name: string;
     symbol: string;
     address: string;
     decimals: number;
     img?: ReactNode | string;
   };
   ```

   This is the list of tokens that user can send. If you want to send native token, you can use `withNativeToken` prop.

   > Make sure to never render WagmiWalletUI if no wallet is connected. You can use `useAccount` hook from `wagmi` to check if user is connected by destructuring the `isConnected` property.

3. Enjoy the wallet UI!

### Example with Rainbowkit connectors

```tsx
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useChainId, useChains, WagmiProvider, http } from 'wagmi';
import { polygon, base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RainbowKitProvider,
  useChainModal,
  getDefaultConfig,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const config = getDefaultConfig({
  appName: 'Wagmi Wallet UI',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [polygon, base],
  transports: {
    [polygon.id]: http('https://polygon-pokt.nodies.app'),
    [base.id]: http(),
  },
});

import { WagmiWalletUI } from 'wagmi-wallet-ui';

const queryClient = new QueryClient();

const Wallet = () => {
  const { isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const chainId = useChainId();
  const chains = useChains();
  const selectedChain = chains.find(chain => chain.id === chainId);

  if (!isConnected) {
    return (
      <div className="ww-w-full ww-flex ww-h-screen ww-justify-center ww-items-center">
        <ConnectButton />
      </div>
    );
  }

  const tokens =
    selectedChain?.id === base.id
      ? [
          {
            address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            decimals: 6,
            name: 'USD Coin',
            symbol: 'USDC',
            img: 'https://etherscan.io/token/images/centre-usdc_28.png',
            chainId: 137,
          },
        ]
      : [
          {
            address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            decimals: 6,
            name: 'USD Coin',
            symbol: 'USDC',
            img: 'https://etherscan.io/token/images/centre-usdc_28.png',
            chainId: 8453,
          },
        ];

  return (
    <div className="ww-w-full ww-flex ww-h-screen ww-justify-center ww-items-center">
      <WagmiWalletUI
        tokens={tokens}
        nativeTokenImg={
          selectedChain?.id === base.id
            ? 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png'
            : 'https://cdn-icons-png.freepik.com/512/12114/12114233.png'
        }
        // Override translations (example in Polish)
        // translations={{
        //   AMOUNT: 'Ilość',
        //   DISCONNECT: 'Rozłącz',
        //   MAX: 'MAX',
        //   SEND: 'Wyślij',
        //   SELECT_TOKEN_TO_SEND: 'Wybierz token do wysłania...',
        //   TO_ADDRESS: 'Na adres',
        //   TOKEN: 'Token',
        //   TOKENS: 'Tokeny',
        //   ENTER_VALID_WALLET: 'Wprowadź poprawny adres portfela',
        //   ADD: 'Dodaj',
        //   DECIMALS: 'Miejsca dziesiętne',
        //   IMPORT_TOKENS: 'Importuj tokeny',
        //   PRECISION: 'Precyzja',
        //   SYMBOL: 'Symbol',
        //   REFRESH_LIST: 'Odśwież listę',
        //   TOKEN_ADDRESS: 'Adres tokena',
        //   UNKNOWN_CHAIN: 'Nieznana sieć',
        //   AMOUNT_EXCEEDS_BALANCE: 'Kwota przekracza saldo',
        // }}
        withNativeToken
        onSendErc20Token={(token, _txRequest) => {
          toast.loading(`Sending ${token.symbol}...`, {
            id: 'send-erc20-token',
          });
          // you can modify txRequest here and override tx properties
          return { ..._txRequest, gas: 200_000n, chain: selectedChain! };
        }}
        onSendNativeToken={_txRequest => {
          toast.loading('Sending native token...', {
            id: 'send-native-token',
          });
          // you can modify txRequest here and override tx properties
          return { ..._txRequest, gas: 21_000n, chain: selectedChain! };
        }}
        onTxFail={error => {
          toast.error(error.message);
        }}
        onTxSuccess={() => {
          toast.success('ERC20 token sent!');
        }}
        onTxSettle={() => {
          toast.dismiss();
        }}
        onTxInclusion={receipt => {
          toast.success(`Tx hash: ${receipt.transactionHash}`);
        }}
        onChainSelectorClick={openChainModal}
        onDisconnect={() => console.log('disconnecting')}
        onCloseWalletUI={() => console.log('closing UI drawer')}
      >
        {/* wallet ui trigger */}
        <Button>OPEN WALLET</Button>
      </WagmiWalletUI>
    </div>
  );
};

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Wallet />
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Custom styling

By default, Wagmi Wallet UI uses Shadcn/ui black and white theme. You can override the default styles by setting custom css variables on the root html element:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
```

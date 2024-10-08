import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useChainId, useChains, WagmiProvider } from 'wagmi';
import { WagmiWalletUI } from '../lib';
import { config } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { RainbowKitProvider, useChainModal } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { base, polygon } from 'viem/chains';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleHelpIcon } from 'lucide-react';

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
            chainId: base.id,
          },
        ]
      : [
          {
            address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            decimals: 6,
            name: 'USD Coin',
            symbol: 'USDC',
            img: 'https://etherscan.io/token/images/centre-usdc_28.png',
            chainId: polygon.id,
          },
        ];

  return (
    <div className="ww-w-full ww-flex ww-h-screen ww-justify-center ww-items-center">
      <WagmiWalletUI
        tokens={tokens}
        infoComponent={
          <Alert className="ww-mt-10 ww-flex">
            <CircleHelpIcon className="ww-mr-4 ww-my-auto" />
            <div>
              <AlertTitle>Do I need native token?</AlertTitle>
              <AlertDescription>
                This wallet works with account abstraction so if it is properly set up,
                you don't!
              </AlertDescription>
            </div>
          </Alert>
        }
        activities={[
          {
            amount: 100_000000n,
            chainId: selectedChain?.id!,
            date: new Date(),
            status: 'success',
            title: 'Send USDC',
            token: {
              symbol: 'USDC',
              decimals: 6,
            },
            type: 'send',
            txLink:
              'https://polygonscan.com/tx/0xe551d3b7836e914f040542be37a8a7732c16a911eed2e9fff9113d7ae6233b78',
          },
          {
            amount: 50_000000n,
            chainId: selectedChain?.id!,
            date: new Date('2021-10-10'),
            status: 'fail',
            title: 'Receive USDC',
            token: {
              symbol: 'USDC',
              decimals: 6,
            },
            type: 'receive',
          },
          {
            amount: 0n,
            chainId: selectedChain?.id!,
            date: new Date('2023-03-2 2:00:00'),
            status: 'pending',
            title: 'Stake ETH',
            token: {
              symbol: 'ETH',
              decimals: 18,
            },
            type: 'contract-interaction',
          },
          {
            amount: 1000000000000000n,
            chainId: selectedChain?.id!,
            date: new Date('2023-03-2 12:00:00'),
            status: 'success',
            title: 'Stake ETH',
            token: {
              symbol: 'ETH',
              decimals: 18,
            },
            type: 'contract-interaction',
          },
        ]}
        nativeTokenImg={
          selectedChain?.id === base.id
            ? 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png'
            : 'https://cdn-icons-png.freepik.com/512/12114/12114233.png'
        }
        // Override translations (example in Polish)
        translations={{
          AMOUNT: 'Ilość',
          DISCONNECT: 'Rozłącz',
          MAX: 'MAX',
          SEND: 'Wyślij',
          SELECT_TOKEN_TO_SEND: 'Wybierz token do wysłania...',
          TO_ADDRESS: 'Na adres',
          TOKEN: 'Token',
          TOKENS: 'Tokeny',
          ENTER_VALID_WALLET: 'Wprowadź poprawny adres portfela',
          ADD: 'Dodaj',
          DECIMALS: 'Miejsca dziesiętne',
          IMPORT_TOKENS: 'Importuj tokeny',
          PRECISION: 'Precyzja',
          SYMBOL: 'Symbol',
          REFRESH_LIST: 'Odśwież listę',
          TOKEN_ADDRESS: 'Adres tokena',
          UNKNOWN_CHAIN: 'Nieznana sieć',
          AMOUNT_EXCEEDS_BALANCE: 'Kwota przekracza saldo',
          ACTIVITY: 'Aktywność',
          FAIL: 'Niepowodzenie',
          PENDING: 'Oczekiwanie',
          SUCCESS: 'Potwierdzone',
          TOKEN_ALREADY_ADDED: 'Token już został dodany',
          ENTER_VALID_TOKEN_ADDRESS: 'Wprowadź poprawny adres tokena',
          ADDRESS_NOT_A_TOKEN: 'Adres nie jest tokenem',
          INVALID_AMOUNT: 'Niepoprawna kwota',
        }}
        withNativeToken
        onSendErc20Token={(token, _txRequest) => {
          toast.loading(`Sending ${token.symbol}...`, {
            id: 'send-erc20-token',
          });

          return { ..._txRequest, gas: 200_000n, chain: selectedChain! };
        }}
        onSendNativeToken={_txRequest => {
          toast.loading('Sending native token...', {
            id: 'send-native-token',
          });
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

export default App;

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
import { base } from 'viem/chains';

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
          },
        ]
      : [
          {
            address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            decimals: 6,
            name: 'USD Coin',
            symbol: 'USDC',
            img: 'https://etherscan.io/token/images/centre-usdc_28.png',
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
        // }}
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

import { createContext } from 'react';
import { WagmiWalletUIState } from './types';
import en from '@/locales/en.json';

export const WagmiWalletUiStore = createContext<WagmiWalletUIState>({
  isOpen: false,
  withNativeToken: false,
  nativeTokenImg: undefined,
  customTokensStorageId: 'wagmi-wallet-ui-custom-tokens',
  tokens: [],
  setCurrentView: () => {},
  translations: en,
  onDisconnect: undefined,
  onChainSelectorClick: undefined,
  onSendErc20Token: (_, txRequest) => txRequest,
  onSendNativeToken: txRequest => txRequest,
  onTxFail: undefined,
  onTxSuccess: undefined,
  onTxInclusion: undefined,
  onTxSettle: undefined,
});

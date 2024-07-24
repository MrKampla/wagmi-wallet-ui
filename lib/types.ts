import { ReactNode } from 'react';
import {
  SendTransactionParameters,
  WaitForTransactionReceiptReturnType,
} from 'viem';
import { UseWriteContractReturnType } from 'wagmi';
import { Translations } from './helpers/useTranslation';

export type Token = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId: number;
  img?: ReactNode | string;
};

export type WagmiWalletUIState = {
  isOpen?: boolean;
  withNativeToken?: boolean;
  nativeTokenImg?: React.ReactNode | string;
  customTokensStorageId?: string;
  tokens: Token[];
  // views
  setCurrentView: (view: 'wallet' | 'send' | 'add-token') => void;
  onCloseWalletUI?: () => void;
  translations?: Translations;
  // wallet actions
  onDisconnect?: () => void;
  onChainSelectorClick?: () => void;
  // transactions
  onSendErc20Token: (
    token: Token,
    txRequest: Parameters<UseWriteContractReturnType['writeContractAsync']>[0],
  ) =>
    | Parameters<UseWriteContractReturnType['writeContractAsync']>[0]
    | Promise<Parameters<UseWriteContractReturnType['writeContractAsync']>[0]>;
  onSendNativeToken: (
    txRequest: SendTransactionParameters,
  ) => SendTransactionParameters | Promise<SendTransactionParameters>;
  onTxFail?: (error: Error) => void | Promise<void>;
  onTxSuccess?: (txHash: string) => void | Promise<void>;
  onTxInclusion?: (
    response: WaitForTransactionReceiptReturnType,
  ) => void | Promise<void>;
  onTxSettle?: () => void | Promise<void>;
};

export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

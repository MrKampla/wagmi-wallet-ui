import { ReactNode } from 'react';
import { SendTransactionParameters, WaitForTransactionReceiptReturnType } from 'viem';
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

export type Activity = {
  date: Date;
  type: 'send' | 'receive' | 'contract-interaction';
  chainId: number;
  status: 'pending' | 'success' | 'fail';
  title: string;
  amount: bigint;
  token: Pick<Token, 'symbol' | 'decimals'>;
  txLink?: string;
};

export type WagmiWalletUIState = {
  tokens: Token[];
  isOpen?: boolean;
  withNativeToken?: boolean;
  nativeTokenImg?: React.ReactNode | string;
  customTokensStorageId?: string;
  activities?: Activity[];
  infoComponent?: ReactNode;
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
  onTxInclusion?: (response: WaitForTransactionReceiptReturnType) => void | Promise<void>;
  onTxSettle?: () => void | Promise<void>;
};

export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

type OmitKeyof<
  TObject,
  TKey extends TStrictly extends 'safely'
    ?
        | keyof TObject
        | (string & Record<never, never>)
        | (number & Record<never, never>)
        | (symbol & Record<never, never>)
    : keyof TObject,
  TStrictly extends 'strictly' | 'safely' = 'strictly',
> = Omit<TObject, TKey>;

export type OptionalKeys<TTarget, TKey extends keyof TTarget> = Pick<
  Partial<TTarget>,
  TKey
> &
  OmitKeyof<TTarget, TKey>;

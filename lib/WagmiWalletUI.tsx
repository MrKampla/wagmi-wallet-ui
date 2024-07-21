import './index.module.css';
import { PropsWithChildren, useState } from 'react';
import { useDisconnect } from 'wagmi';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Drawer, DrawerContent, DrawerTrigger } from './components/ui/drawer';
import WalletView from './views/walletView/WalletView';
import SendView from './views/sendView/SendView';
import { WagmiWalletUiStore } from './store';
import { WagmiWalletUIState, ReplaceReturnType } from './types';
import { Optional } from '@tanstack/react-query';

type Handlers = Pick<
  WagmiWalletUIState,
  'onSendErc20Token' | 'onSendNativeToken'
>;

export type WagmiWalletUIProps = PropsWithChildren &
  Omit<
    WagmiWalletUIState,
    'setCurrentView' | 'onSendErc20Token' | 'onSendNativeToken'
  > &
  // make handlers optional and allow them to return void or modified txRequest
  Partial<
    Optional<
      {
        [Property in keyof Handlers]: ReplaceReturnType<
          Handlers[Property],
          ReturnType<Handlers[Property]> | void | Promise<void>
        >;
      },
      'onSendErc20Token' | 'onSendNativeToken'
    >
  >;

const WagmiWalletUI = ({
  children,
  isOpen,
  withNativeToken,
  nativeTokenImg,
  translations,
  tokens = [],
  onCloseWalletUI,
  onDisconnect,
  onChainSelectorClick,
  onSendErc20Token = (_, txRequest) => txRequest,
  onSendNativeToken = txRequest => txRequest,
  onTxFail,
  onTxSuccess,
  onTxInclusion,
  onTxSettle,
}: WagmiWalletUIProps) => {
  const [currentView, setCurrentView] = useState<'wallet' | 'send'>('wallet');
  const { disconnect } = useDisconnect();

  return (
    <WagmiWalletUiStore.Provider
      value={{
        isOpen: isOpen,
        withNativeToken,
        nativeTokenImg,
        translations,
        tokens,
        setCurrentView,
        onCloseWalletUI,
        onDisconnect: () => {
          onDisconnect?.();
          disconnect();
        },
        onChainSelectorClick,
        onSendErc20Token: async (token, txRequest) =>
          (await onSendErc20Token?.(token, txRequest)) || txRequest,
        onSendNativeToken: async txRequest =>
          (await onSendNativeToken?.(txRequest)) || txRequest,
        onTxFail,
        onTxSuccess,
        onTxInclusion,
        onTxSettle,
      }}
    >
      <Drawer
        noBodyStyles
        dismissible={false}
        // reset view on close
        onOpenChange={v => (v === false ? setCurrentView('wallet') : undefined)}
        open={isOpen}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="!ww-h-[95%]">
          <DialogTitle />
          {currentView === 'wallet' && <WalletView />}
          {currentView === 'send' && <SendView />}
        </DrawerContent>
      </Drawer>
    </WagmiWalletUiStore.Provider>
  );
};

export default WagmiWalletUI;

import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerHeader } from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';
import ChainBadge from './ChainBadge';
import WalletAddressBadge from './WalletAddressBadge';
import AddressBalance from './AddressBalance';
import ActionButtons from './ActionButtons';
import WalletTabs from './walletTabs/WalletTabs';
import { useContext } from 'react';
import { WagmiWalletUiStore } from '@/store';

const WalletView = () => {
  const { onCloseWalletUI } = useContext(WagmiWalletUiStore);
  return (
    <div className="ww-overflow-auto sm:ww-container">
      <DrawerHeader className="!ww-flex ww-flex-row ww-justify-between">
        <ChainBadge />
        <Button onClick={onCloseWalletUI} variant="ghost">
          <DrawerClose asChild className="ww-w-fit ww-size-fit">
            <XIcon />
          </DrawerClose>
        </Button>
      </DrawerHeader>

      <div className="ww-p-4">
        <div className="ww-flex ww-flex-col ww-justify-center ww-w-full ww-items-center">
          <WalletAddressBadge />

          <AddressBalance />

          <ActionButtons />
        </div>

        <WalletTabs />
      </div>
    </div>
  );
};

export default WalletView;

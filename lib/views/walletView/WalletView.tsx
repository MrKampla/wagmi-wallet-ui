import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerHeader } from '@/components/ui/drawer';
import { PlusIcon, RefreshCwIcon, XIcon } from 'lucide-react';
import ChainBadge from './ChainBadge';
import WalletAddressBadge from './WalletAddressBadge';
import AddressBalance from './AddressBalance';
import ActionButtons from './ActionButtons';
import WalletTabs from './walletTabs/WalletTabs';
import { useContext } from 'react';
import { WagmiWalletUiStore } from '@/store';
import { useTranslation } from '@/helpers/useTranslation';
import { useRefetchQueries } from '@/helpers/useRefetchQueries';
import { cn } from '@/lib/utils';

const WalletView = () => {
  const { onCloseWalletUI, setCurrentView } = useContext(WagmiWalletUiStore);
  const { refetchQueries, isFetching } = useRefetchQueries();
  const t = useTranslation();
  return (
    <div className="ww-overflow-auto sm:ww-container ww-h-full ww-flex ww-flex-col">
      <DrawerHeader className="!ww-flex ww-flex-row ww-justify-between">
        <ChainBadge />
        <DrawerClose asChild className="ww-w-fit ww-size-fit">
          <Button onClick={onCloseWalletUI} variant="ghost">
            <XIcon />
          </Button>
        </DrawerClose>
      </DrawerHeader>

      <div className="ww-p-4">
        <div className="ww-flex ww-flex-col ww-justify-center ww-w-full ww-items-center">
          <WalletAddressBadge />

          <AddressBalance />

          <ActionButtons />
        </div>

        <WalletTabs />
      </div>

      <div className="ww-mt-auto ww-space-y-4 ww-pb-4 ww-flex ww-flex-col ww-justify-start ">
        <Button
          onClick={() => setCurrentView('add-token')}
          variant="ghost"
          className="ww-w-fit"
        >
          <PlusIcon className="ww-mr-2" />
          {t('IMPORT_TOKENS')}
        </Button>
        <Button
          onClick={() => refetchQueries()}
          variant="ghost"
          className="ww-w-fit"
        >
          <RefreshCwIcon
            className={cn('ww-mr-2', {
              'ww-animate-spin': isFetching,
            })}
          />
          {t('REFRESH_LIST')}
        </Button>
      </div>
    </div>
  );
};

export default WalletView;

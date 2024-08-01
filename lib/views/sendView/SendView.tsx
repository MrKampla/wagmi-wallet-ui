import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerHeader } from '@/components/ui/drawer';
import { WagmiWalletUiStore } from '@/store';
import { ArrowLeftIcon, XIcon } from 'lucide-react';
import { useContext } from 'react';
import { SendForm } from './SendForm';

const SendView = () => {
  const { tokens, setCurrentView, onCloseWalletUI } =
    useContext(WagmiWalletUiStore);
  return (
    <div className="ww-overflow-auto sm:ww-container">
      <DrawerHeader className="!ww-flex ww-flex-row ww-justify-between">
        <Button variant="ghost" onClick={() => setCurrentView('wallet')}>
          <ArrowLeftIcon className="ww-size-6" />
        </Button>
        <DrawerClose asChild className="ww-w-fit ww-size-fit">
          <Button onClick={onCloseWalletUI} variant="ghost">
            <XIcon />
          </Button>
        </DrawerClose>
      </DrawerHeader>

      <div className="ww-p-4">
        <div className="ww-flex ww-flex-col ww-justify-center ww-w-full ww-items-center">
          <SendForm tokens={tokens} />
        </div>
      </div>
    </div>
  );
};

export default SendView;

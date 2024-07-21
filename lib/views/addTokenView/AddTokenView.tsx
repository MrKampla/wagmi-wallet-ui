import { Button } from '@/components/ui/button';
import { DrawerHeader, DrawerClose } from '@/components/ui/drawer';
import { WagmiWalletUiStore } from '@/store';
import { ArrowLeftIcon, XIcon } from 'lucide-react';
import { useContext } from 'react';
import { AddTokenForm } from './AddTokenForm';

const AddTokenView = () => {
  const { setCurrentView, onCloseWalletUI } = useContext(WagmiWalletUiStore);
  return (
    <div className="ww-overflow-auto sm:ww-container">
      <DrawerHeader className="!ww-flex ww-flex-row ww-justify-between">
        <Button variant="ghost" onClick={() => setCurrentView('wallet')}>
          <ArrowLeftIcon className="ww-size-6" />
        </Button>
        <Button onClick={onCloseWalletUI} variant="ghost">
          <DrawerClose asChild className="ww-w-fit ww-size-fit">
            <XIcon />
          </DrawerClose>
        </Button>
      </DrawerHeader>

      <div className="ww-p-4">
        <div className="ww-flex ww-flex-col ww-justify-center ww-w-full ww-items-center">
          <AddTokenForm />
        </div>
      </div>
    </div>
  );
};

export default AddTokenView;

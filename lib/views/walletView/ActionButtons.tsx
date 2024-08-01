import { Button } from '@/components/ui/button';
import { useTranslation } from '@/helpers/useTranslation';
import { WagmiWalletUiStore } from '@/store';
import { SendIcon, UnplugIcon } from 'lucide-react';
import { useContext } from 'react';

const ActionButtons = () => {
  const { setCurrentView, onDisconnect } = useContext(WagmiWalletUiStore);
  const t = useTranslation();

  return (
    <div className="ww-flex ww-mt-8 ww-justify-center ww-space-x-4">
      <div className="ww-flex ww-flex-col ww-items-center">
        <Button className="ww-h-14 ww-w-14" onClick={() => setCurrentView('send')}>
          <SendIcon className="ww-size-6" />
        </Button>
        <div>{t('SEND')}</div>
      </div>
      <div className="ww-flex ww-flex-col ww-items-center">
        <Button className="ww-h-14 ww-w-14" onClick={onDisconnect}>
          <UnplugIcon className="ww-size-6" />
        </Button>
        <div>{t('DISCONNECT')}</div>
      </div>
    </div>
  );
};

export default ActionButtons;

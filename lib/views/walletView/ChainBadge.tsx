import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/helpers/useTranslation';
import { WagmiWalletUiStore } from '@/store';
import { useContext } from 'react';
import { useAccount } from 'wagmi';

const ChainBadge = () => {
  const { onChainSelectorClick } = useContext(WagmiWalletUiStore);
  const { chain } = useAccount();
  const t = useTranslation();

  return (
    <Badge
      onClick={onChainSelectorClick}
      // vaul adds pointer-events: none; to the body which prevents from using the chain selector
      onMouseOver={() => {
        const body = document.querySelector('body');
        if (body) {
          body.style.pointerEvents = 'auto';
        }
      }}
      variant={chain ? 'default' : 'destructive'}
      className={'ww-w-fit ww-cursor-pointer ww-rounded-md'}
    >
      {chain?.name ?? t('UNKNOWN_CHAIN')}
    </Badge>
  );
};

export default ChainBadge;

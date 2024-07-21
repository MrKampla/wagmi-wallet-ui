import { Badge } from '@/components/ui/badge';
import { WagmiWalletUiStore } from '@/store';
import { useContext } from 'react';
import { useChainId, useChains } from 'wagmi';

const ChainBadge = () => {
  const { onChainSelectorClick } = useContext(WagmiWalletUiStore);
  const chainId = useChainId();
  const chains = useChains();
  const defaultChain = chains[0];
  const selectedChain =
    chains.find(chain => chain.id === chainId) ?? defaultChain;

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
      variant="default"
      className="ww-w-fit ww-cursor-pointer ww-rounded-md"
    >
      {selectedChain.name}
    </Badge>
  );
};

export default ChainBadge;

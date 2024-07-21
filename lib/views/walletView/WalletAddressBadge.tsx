import { Badge } from '@/components/ui/badge';
import { shortenAddress } from '@/helpers/shortenAddress';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useAccount } from 'wagmi';

const WalletAddressBadge = () => {
  const { address } = useAccount();
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Badge
      variant="secondary"
      className="ww-w-fit ww-p-2 ww-cursor-pointer ww-rounded-md"
      onClick={() => {
        copyToClipboard(address!);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }}
    >
      {shortenAddress(address!)}
      {isCopied ? (
        <CheckIcon className="ww-ml-2 ww-size-4" />
      ) : (
        <CopyIcon className="ww-ml-2 ww-size-4" />
      )}
    </Badge>
  );
};

export default WalletAddressBadge;

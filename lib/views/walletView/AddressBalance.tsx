import * as viem from 'viem';
import { LoaderIcon } from 'lucide-react';
import { useAccount, useBalance } from 'wagmi';

const AddressBalance = () => {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
  });
  return (
    <div className="ww-mt-4 ww-flex ww-justify-center ww-text-4xl ww-space-x-2 ww-text-center ww-font-bold ww-text-primary  ww-break-all ww-flex-wrap">
      {isLoading ? (
        <LoaderIcon className="ww-animate-spin ww-size-8 ww-mt-2" />
      ) : (
        <>
          <div>{viem.formatUnits(balance?.value || 0n, balance?.decimals || 18)} </div>
          <div>{balance?.symbol}</div>
        </>
      )}
    </div>
  );
};

export default AddressBalance;

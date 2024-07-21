import { Token } from '@/types';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import * as viem from 'viem';
import { LoaderIcon } from 'lucide-react';
import { useContext } from 'react';
import { WagmiWalletUiStore } from '@/store';
import TokenIcon from '@/components/TokenIcon';

const TokenBalance = ({
  token,
  balance,
  isLoading,
}: {
  token: Pick<Token, 'img' | 'name' | 'symbol' | 'decimals'>;
  balance: bigint | undefined;
  isLoading: boolean;
}) => {
  return (
    <div className="ww-w-full ww-flex ww-items-center ww-space-x-2 ww-bg-secondary ww-p-2 ww-px-4 ww-rounded-md">
      <TokenIcon img={token.img} />
      <div className="ww-ml-2 ww-min-w-fit">{token.name}</div>
      <div className="ww-w-full ww-flex ww-justify-end">
        {isLoading ? (
          <LoaderIcon className="ww-animate-spin" />
        ) : (
          <div className="ww-flex ww-space-x-2">
            <div className="ww-break-all ww-text-right ww-flex-wrap">
              {viem.formatUnits(balance || 0n, token.decimals)}
            </div>
            <div>{token.symbol}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Erc20TokenBalance = ({ token }: { token: Token }) => {
  const { address } = useAccount();
  const { data: balance, isLoading } = useReadContract({
    abi: viem.erc20Abi,
    functionName: 'balanceOf',
    address: token.address as `0x${string}`,
    args: [address!],
  });

  return <TokenBalance token={token} balance={balance} isLoading={isLoading} />;
};

export const NativeTokenBalance = () => {
  const { nativeTokenImg } = useContext(WagmiWalletUiStore);
  const { address, chain } = useAccount();

  const { data: balance, isLoading } = useBalance({
    address,
  });

  return (
    <TokenBalance
      token={{
        name: chain?.nativeCurrency.name!,
        symbol: chain?.nativeCurrency.symbol!,
        decimals: chain?.nativeCurrency.decimals!,
        img: nativeTokenImg,
      }}
      balance={balance?.value}
      isLoading={isLoading}
    />
  );
};

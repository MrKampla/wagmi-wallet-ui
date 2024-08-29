import { Token } from '@/types';
import { useAccount, useBalance, useChainId, useChains, useReadContract } from 'wagmi';
import * as viem from 'viem';
import { DeleteIcon, LoaderIcon } from 'lucide-react';
import { useContext } from 'react';
import { WagmiWalletUiStore } from '@/store';
import TokenIcon from '@/components/TokenIcon';
import { Button } from '@/components/ui/button';
import { useCustomTokens } from '@/helpers/useCustomTokens';
import { truncateDecimalPlaces } from '@/helpers/truncateDecimalPlaces';

const TokenBalance = ({
  token,
  balance,
  isLoading,
}: {
  token: Pick<Token, 'img' | 'name' | 'symbol' | 'decimals' | 'address'>;
  balance: bigint | undefined;
  isLoading: boolean;
}) => {
  const { customTokens, removeCustomToken } = useCustomTokens();
  const isCustomToken = customTokens.some(
    customToken => customToken.address === token.address,
  );

  return (
    <div className="ww-flex ww-items-center">
      <div className="ww-w-full ww-flex ww-items-center ww-space-x-2 ww-bg-secondary ww-p-2 ww-px-4 ww-rounded-md">
        <TokenIcon img={token.img} symbol={token.symbol} />
        <div className="ww-ml-2 ww-min-w-fit">{token.name}</div>
        <div className="ww-w-full ww-flex ww-justify-end">
          {isLoading ? (
            <LoaderIcon className="ww-animate-spin" />
          ) : (
            <div className="ww-flex ww-space-x-2">
              <div className="ww-break-all ww-text-right ww-flex-wrap">
                {truncateDecimalPlaces(viem.formatUnits(balance || 0n, token.decimals))}
              </div>
              <div>{token.symbol}</div>
            </div>
          )}
        </div>
      </div>
      {isCustomToken && (
        <Button
          onClick={() => removeCustomToken(token.address)}
          variant="destructive"
          className="!ww-p-2 !ww-ml-2"
        >
          <DeleteIcon />
        </Button>
      )}
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
  const { address } = useAccount();
  const chains = useChains();
  const chainId = useChainId();
  const chain = chains.find(chain => chain.id === chainId);

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
        address: viem.zeroAddress,
      }}
      balance={balance?.value}
      isLoading={isLoading}
    />
  );
};

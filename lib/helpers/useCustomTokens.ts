import { WagmiWalletUiStore } from '@/store';
import { Token } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useContext } from 'react';
import { useChainId } from 'wagmi';

export const useCustomTokens = () => {
  const chainId = useChainId();
  const { customTokensStorageId } = useContext(WagmiWalletUiStore);
  const [customTokens, saveCustomTokens] = useLocalStorage<Token[]>(
    customTokensStorageId!,
    [],
  );

  const removeCustomToken = (tokenAddress: string) => {
    saveCustomTokens(
      customTokens.filter(customToken => customToken.address !== tokenAddress),
    );
  };
  const addCustomToken = (token: Token) => {
    saveCustomTokens(
      [...customTokens, token].filter(
        (token, index, allTokens) =>
          allTokens.findIndex(t => t.address === token.address) === index,
      ),
    );
  };

  return {
    customTokens: customTokens.filter(token => token.chainId === chainId),
    saveCustomTokens,
    removeCustomToken,
    addCustomToken,
  };
};

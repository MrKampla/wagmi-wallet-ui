import { WagmiWalletUiStore } from '@/store';
import { Token } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useContext } from 'react';

export const useCustomTokens = () => {
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
    saveCustomTokens([...customTokens, token]);
  };

  return { customTokens, saveCustomTokens, removeCustomToken, addCustomToken };
};

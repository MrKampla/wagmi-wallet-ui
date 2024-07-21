import en from '@/locales/en.json';
import { WagmiWalletUiStore } from '@/store';
import { useContext } from 'react';

export type Translations = typeof en;

export const useTranslation = () => {
  const { translations } = useContext(WagmiWalletUiStore);

  return (key: keyof Translations) => {
    return (translations ?? en)[key] ?? key;
  };
};

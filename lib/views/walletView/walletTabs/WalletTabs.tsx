import {
  Erc20TokenBalance,
  NativeTokenBalance,
} from '@/views/walletView/walletTabs/TokenBalance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WagmiWalletUiStore } from '@/store';
import { useContext } from 'react';
import { useTranslation } from '@/helpers/useTranslation';
import ActivityTab from './ActivityTab';

const WalletTabs = () => {
  const { withNativeToken, tokens, activities } = useContext(WagmiWalletUiStore);
  const shouldShowActivity = (activities?.length ?? 0) > 0;
  const t = useTranslation();

  return (
    <Tabs defaultValue="tokens" className="ww-w-full ww-mt-8">
      <TabsList className="ww-w-full">
        <TabsTrigger value="tokens" className="ww-w-full">
          {t('TOKENS')}
        </TabsTrigger>
        {shouldShowActivity && (
          <TabsTrigger value="activity" className="ww-w-full">
            {t('ACTIVITY')}
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="tokens">
        <div className="ww-flex ww-flex-col ww-space-y-2">
          {withNativeToken && <NativeTokenBalance />}
          {tokens.map(token => (
            <Erc20TokenBalance key={token.address} token={token} />
          ))}
        </div>
      </TabsContent>
      {shouldShowActivity && (
        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default WalletTabs;

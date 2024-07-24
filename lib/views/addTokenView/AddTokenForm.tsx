import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as viem from 'viem';
import { useChainId, useReadContract } from 'wagmi';
import { useContext, useEffect } from 'react';
import { useTranslation } from '@/helpers/useTranslation';
import { LoaderIcon } from 'lucide-react';
import { WagmiWalletUiStore } from '@/store';
import { useCustomTokens } from '@/helpers/useCustomTokens';

export function AddTokenForm() {
  const { setCurrentView } = useContext(WagmiWalletUiStore);
  const { addCustomToken } = useCustomTokens();
  const chainId = useChainId();

  const t = useTranslation();

  const formSchema = z.object({
    address: z
      .string()
      .length(42, {
        message: t('ENTER_VALID_WALLET'),
      })
      .refine(
        value =>
          value.startsWith('0x') &&
          viem.isAddress(value, {
            strict: false,
          }),
        {
          message: t('ENTER_VALID_WALLET'),
        },
      ),
    symbol: z.string().min(1),
    precision: z.number().min(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      symbol: '',
      precision: 18,
    },
  });

  const tokenAddress = form.watch('address');

  const { data: tokenSymbol, isLoading: isLoadingTokenSymbol } =
    useReadContract({
      abi: viem.erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'symbol',
      query: {
        enabled: viem.isAddress(tokenAddress, { strict: false }),
      },
    });

  const { data: tokenDecimals, isLoading: isLoadingTokenDecimals } =
    useReadContract({
      abi: viem.erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'decimals',
      query: {
        enabled: viem.isAddress(tokenAddress, { strict: false }),
      },
    });

  const { data: tokenName } = useReadContract({
    abi: viem.erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'name',
    query: {
      enabled: viem.isAddress(tokenAddress, { strict: false }),
    },
  });

  useEffect(
    function setTokenSymbolAndDecimalsWhenFetchedAfterAddressIsPassed() {
      if (tokenSymbol) {
        form.setValue('symbol', tokenSymbol);
      }
      if (tokenDecimals) {
        form.setValue('precision', tokenDecimals);
      }
    },
    [tokenSymbol, tokenDecimals],
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    addCustomToken({
      address: values.address,
      symbol: values.symbol,
      decimals: values.precision,
      name: tokenName || values.symbol,
      img: '',
      chainId,
    });
    setCurrentView('wallet');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="ww-w-full ww-p-4 ww-space-y-6"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('TOKEN_ADDRESS')}:</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ww-flex ww-items-center">
                {t('SYMBOL')}:{' '}
                {isLoadingTokenSymbol && (
                  <LoaderIcon className="ww-ml-1 ww-animate-spin ww-size-3" />
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder={t('SYMBOL')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="precision"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ww-flex ww-items-center">
                {t('PRECISION')}:{' '}
                {isLoadingTokenDecimals && (
                  <LoaderIcon className="ww-ml-1 ww-animate-spin ww-size-3" />
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder={t('DECIMALS')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="ww-flex ww-justify-end">
          <Button type="submit">{t('ADD')}</Button>
        </div>
      </form>
    </Form>
  );
}

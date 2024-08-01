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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Token } from '@/types';
import {
  useAccount,
  useBalance,
  useChainId,
  useChains,
  usePrepareTransactionRequest,
  usePublicClient,
  useReadContract,
  useSendTransaction,
  useSimulateContract,
  useWriteContract,
} from 'wagmi';
import { useContext, useEffect } from 'react';
import { WagmiWalletUiStore } from '@/store';
import { LoaderIcon } from 'lucide-react';
import TokenIcon from '@/components/TokenIcon';
import { useTranslation } from '@/helpers/useTranslation';

export function SendForm({ tokens }: { tokens: Token[] }) {
  const {
    onSendErc20Token,
    onTxFail,
    onTxSuccess,
    onTxInclusion,
    onTxSettle,
    withNativeToken,
    nativeTokenImg,
    onSendNativeToken,
    setCurrentView,
  } = useContext(WagmiWalletUiStore);
  const t = useTranslation();
  const { address } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const selectedChain = chains.find(chain => chain.id === chainId);

  const { data: nativeTokenBalance } = useBalance({
    address,
  });

  const FormSchema = z.object({
    token: z.string().min(1, {
      message: t('SELECT_TOKEN_TO_SEND'),
    }),
    targetAddress: z
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
    amount: z.string().min(1),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: '',
      targetAddress: '',
      amount: '0',
    },
  });

  const tokenAddress = form.watch('token');
  const isNativeTransferSelected = tokenAddress === viem.zeroAddress;
  const selectedToken = tokens.find(token => token.address === tokenAddress);

  const { data: tokenBalance } = useReadContract({
    abi: viem.erc20Abi,
    address: selectedToken?.address as `0x${string}`,
    functionName: 'balanceOf',
    args: [address!],
  });

  const { data: transferSimulation, isLoading: isLoadingTransferSimulation } =
    useSimulateContract({
      abi: viem.erc20Abi,
      address: selectedToken?.address as `0x${string}`,
      functionName: 'transfer',
      args: [
        form.watch('targetAddress') as `0x${string}`,
        viem.parseUnits(form.watch('amount'), selectedToken?.decimals || 18),
      ],
      type: 'eip1559',
      account: address!,
    });
  const { writeContractAsync: sendTokenAsync, isPending: isSendingErc20Token } =
    useWriteContract();

  const {
    data: transactionRequest,
    isLoading: isLoadingTransactionRequest,
    error,
  } = usePrepareTransactionRequest({
    to: form.watch('targetAddress') as `0x${string}`,
    value: viem.parseUnits(form.watch('amount'), selectedToken?.decimals || 18),
  });
  const { sendTransactionAsync, isPending: isSendingNativeToken } = useSendTransaction();

  const publicClient = usePublicClient();

  async function onSubmit() {
    if (isNativeTransferSelected ? !transactionRequest : !transferSimulation?.request) {
      return;
    }

    try {
      const txHash = await (isNativeTransferSelected
        ? sendTransactionAsync(await onSendNativeToken(transactionRequest!))
        : sendTokenAsync(
            await onSendErc20Token(selectedToken!, transferSimulation?.request!),
          ));

      await onTxSuccess?.(txHash);

      const receipt = await publicClient!.waitForTransactionReceipt({
        hash: txHash,
      });
      await onTxInclusion?.(receipt);
      setCurrentView('wallet');
    } catch (error) {
      await onTxFail?.(error as Error);
    }
    await onTxSettle?.();
  }

  const selectOptions = withNativeToken
    ? [
        {
          name: selectedChain?.nativeCurrency.name,
          symbol: selectedChain?.nativeCurrency.symbol,
          address: viem.zeroAddress,
          decimals: selectedChain?.nativeCurrency.decimals,
          img: nativeTokenImg,
        },
        ...tokens,
      ]
    : tokens;

  useEffect(
    function setErrorOnFormForSmartAccounts() {
      console.log;
      if (isNativeTransferSelected) {
        const currentNativeTokenBalance = nativeTokenBalance?.value || 0n;
        const selectedAmount = viem.parseUnits(
          form.watch('amount'),
          selectedToken?.decimals || 18,
        );
        if (
          currentNativeTokenBalance === 0n ||
          selectedAmount > currentNativeTokenBalance
        ) {
          form.setError('amount', {
            message: t('AMOUNT_EXCEEDS_BALANCE'),
          });
        }
        if (currentNativeTokenBalance >= selectedAmount) {
          form.clearErrors('amount');
        }
      } else {
        if (!selectedToken) {
          form.clearErrors('amount');
          return;
        }
        const currentTokenBalance = tokenBalance || 0n;
        const selectedAmount = viem.parseUnits(
          form.watch('amount'),
          selectedToken?.decimals || 18,
        );
        if (currentTokenBalance === 0n || selectedAmount > currentTokenBalance) {
          form.setError('amount', {
            message: t('AMOUNT_EXCEEDS_BALANCE'),
          });
        }
        if (currentTokenBalance >= selectedAmount) {
          form.clearErrors('amount');
        }
      }
    },
    [
      isNativeTransferSelected,
      form.watch('amount'),
      nativeTokenBalance?.value,
      selectedToken?.decimals,
      tokenBalance,
    ],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="ww-w-full ww-p-4 ww-space-y-6"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('TOKEN')}:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('SELECT_TOKEN_TO_SEND')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectOptions.map(token => (
                    <SelectItem key={token.address} value={token.address}>
                      <div className="ww-flex ww-flex-row ww-items-center">
                        <TokenIcon img={token.img} symbol={token.symbol} />
                        <div className="ww-ml-2">{token.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('TO_ADDRESS')}:</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ww-w-full ww-flex ww-items-center">
                <div>{t('AMOUNT')}:</div>
                <Button
                  type="button"
                  variant="ghost"
                  className="ww-ml-auto"
                  onClick={() => {
                    form.setValue(
                      'amount',
                      viem.formatUnits(
                        isNativeTransferSelected
                          ? nativeTokenBalance?.value || 0n
                          : tokenBalance || 0n,
                        isNativeTransferSelected
                          ? nativeTokenBalance?.decimals || 18
                          : selectedToken?.decimals || 18,
                      ),
                    );
                  }}
                >
                  {t('MAX')}
                </Button>
              </FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="ww-flex ww-justify-end">
          <div className="ww-w-full ww-text-destructive">
            {(error as any)?.cause?.shortMessage}
          </div>
          <Button
            disabled={
              isSendingErc20Token ||
              isSendingNativeToken ||
              !!Object.keys(form.formState.errors).length
            }
            type="submit"
          >
            {((isNativeTransferSelected
              ? isLoadingTransactionRequest
              : isLoadingTransferSimulation) ||
              isSendingErc20Token ||
              isSendingNativeToken) && (
              <LoaderIcon className="ww-animate-spin ww-size-4 ww-mr-2" />
            )}
            {t('SEND')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

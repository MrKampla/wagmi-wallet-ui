import { groupBy } from '@/helpers/groupBy';
import { useTranslation } from '@/helpers/useTranslation';
import { cn } from '@/lib/utils';
import { WagmiWalletUiStore } from '@/store';
import { Activity } from '@/types';
import { ArrowDownLeftIcon, ArrowUpRightIcon, GitCompareArrowsIcon } from 'lucide-react';
import { useContext } from 'react';
import * as viem from 'viem';

const ActivityRow = ({ activity: a }: { activity: Activity }) => {
  const t = useTranslation();
  return (
    <div
      onClick={a.txLink ? () => window.open(a.txLink, '_blank') : undefined}
      className={cn(
        'ww-grid ww-grid-cols-[min-content_auto_auto] ww-w-full ww-p-4 hover:ww-bg-muted ww-transition ww-duration-200',
        { 'ww-cursor-pointer': !!a.txLink },
      )}
    >
      <div className="ww-size-12 ww-my-auto ww-rounded-md ww-bg-primary">
        {a.type === 'send' ? (
          <ArrowUpRightIcon className="ww-size-8 ww-m-2 ww-text-primary-foreground" />
        ) : a.type === 'receive' ? (
          <ArrowDownLeftIcon className="ww-size-8 ww-m-2 ww-text-primary-foreground" />
        ) : (
          <GitCompareArrowsIcon className="ww-size-8 ww-m-2 ww-text-primary-foreground" />
        )}
      </div>
      <div className="ww-ml-2 ww-flex ww-flex-col ww-truncate">
        <div className="ww-font-bold">{a.title}</div>
        <div
          className={cn('ww-mt-auto ww-text-sm', {
            'ww-text-destructive': a.status === 'fail',
            'ww-text-accent-foreground': a.status === 'success',
            'ww-text-muted-foreground ww-animate-pulse': a.status === 'pending',
          })}
        >
          {t(a.status.toUpperCase() as Uppercase<typeof a.status>)}
        </div>
      </div>
      <div className="ww-flex ww-items-center ww-justify-end ww-break-all">
        {viem.formatUnits(a.amount, a.token.decimals)} {a.token.symbol}
      </div>
    </div>
  );
};

const ActivityTab = () => {
  const { activities } = useContext(WagmiWalletUiStore);
  const activitiesByDate = groupBy(
    (activities || []).toSorted((a, b) => b.date.getTime() - a.date.getTime()),
    a => a.date.toISOString().split('T')[0],
  );

  return (
    <div>
      {Object.keys(activitiesByDate).map(date => (
        <div key={date}>
          <h2 className="ww-pl-4 ww-font-bold ww-my-1">{date}</h2>
          {activitiesByDate[date].map(a => (
            <ActivityRow key={a.date.getTime()} activity={a} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActivityTab;

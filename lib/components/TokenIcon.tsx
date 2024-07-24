const TokenIcon = ({
  img,
  symbol,
}: {
  img: React.ReactNode | string;
  symbol?: string;
}) => {
  if (img) {
    return typeof img === 'string' ? (
      <img src={img} className="ww-w-8 ww-h-8 ww-rounded-full" />
    ) : (
      img
    );
  }
  return (
    <div className="ww-w-fit">
      <div className="ww-bg-primary ww-text-sm ww-text-primary-foreground ww-flex ww-h-8 ww-w-8 ww-items-center ww-justify-center ww-rounded-full">
        {symbol?.slice(0, 3) ?? '?'}
      </div>
    </div>
  );
};

export default TokenIcon;

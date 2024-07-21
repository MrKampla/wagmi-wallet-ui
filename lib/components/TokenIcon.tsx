const TokenIcon = ({ img }: { img: React.ReactNode | string }) => {
  return typeof img === 'string' ? (
    <img src={img} className="ww-w-8 ww-h-8 ww-rounded-full" />
  ) : (
    img
  );
};

export default TokenIcon;

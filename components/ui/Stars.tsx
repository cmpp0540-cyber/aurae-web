type Props = {
  count?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZES = { sm: 'text-[12px]', md: 'text-[14px]', lg: 'text-[22px]' } as const;

export default function Stars({ count = 5, className = '', size = 'md' }: Props) {
  const filled = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span
      className={['tracking-[0.15em] text-sun', SIZES[size], className].join(' ')}
      aria-label={`${filled} out of 5 stars`}
      role="img"
    >
      {'★'.repeat(filled)}
      <span className="text-espresso/20">{'★'.repeat(5 - filled)}</span>
    </span>
  );
}

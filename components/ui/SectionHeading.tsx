import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  eyebrow?: string;
  lead: string;
  italic?: string;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * The Aurae section header: coral eyebrow, serif title with an italic coral
 * clause, then a narrow subtitle.
 */
export default function SectionHeading({
  eyebrow,
  lead,
  italic,
  subtitle,
  align = 'center',
  tone = 'dark',
  className = '',
}: Props) {
  const centered = align === 'center';

  return (
    <Reveal
      className={[
        centered ? 'text-center' : 'text-left',
        tone === 'light' ? 'text-ivory' : 'text-espresso',
        className,
      ].join(' ')}
    >
      {eyebrow ? (
        <p className={['u-eyebrow mb-4', centered ? '' : 'text-left'].join(' ')}>{eyebrow}</p>
      ) : null}

      <h2 className="font-display text-display-lg font-bold balance">
        {lead}
        {italic ? (
          <>
            {' '}
            <span className="u-italic">{italic}</span>
          </>
        ) : null}
      </h2>

      {subtitle ? (
        <div
          className={[
            'mt-4 text-[16px] leading-relaxed sm:text-[17px]',
            tone === 'light' ? 'text-ivory/75' : 'text-espresso/70',
            centered ? 'mx-auto max-w-prose2' : 'max-w-prose2',
          ].join(' ')}
        >
          {subtitle}
        </div>
      ) : null}
    </Reveal>
  );
}

import { parseRichText, type InlineSpan } from '@/lib/rich-text';

type Props = {
  /** Raw Shopify `rich_text_field` JSON (or plain text). */
  value: string | null | undefined;
  className?: string;
};

function Spans({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((span, index) => {
        if (span.bold) {
          return <strong key={index}>{span.text}</strong>;
        }
        if (span.italic) {
          return <em key={index}>{span.text}</em>;
        }
        return <span key={index}>{span.text}</span>;
      })}
    </>
  );
}

/** Renders Shopify rich-text metafields without dangerouslySetInnerHTML. */
export default function RichText({ value, className = '' }: Props) {
  const blocks = parseRichText(value);
  if (!blocks.length) return null;

  return (
    <div className={['rich-text', className].join(' ')}>
      {blocks.map((block, index) => {
        if (block.kind === 'list') {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Spans spans={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === 'heading') {
          return (
            <p key={index} className="font-display text-[17px] font-semibold text-espresso">
              <Spans spans={block.spans} />
            </p>
          );
        }
        return (
          <p key={index}>
            <Spans spans={block.spans} />
          </p>
        );
      })}
    </div>
  );
}

/**
 * Minimal renderer for Shopify's `rich_text_field` metafield format.
 *
 * Shopify stores rich text as a JSON tree:
 *   { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', value, bold, italic }] }] }
 *
 * We flatten that into plain blocks the UI can render without dangerouslySetInnerHTML.
 */

export type InlineSpan = { text: string; bold?: boolean; italic?: boolean };

export type RichBlock =
  | { kind: 'paragraph'; spans: InlineSpan[] }
  | { kind: 'heading'; level: number; spans: InlineSpan[] }
  | { kind: 'list'; ordered: boolean; items: InlineSpan[][] };

type Node = {
  type: string;
  value?: string;
  bold?: boolean;
  italic?: boolean;
  level?: number;
  listType?: string;
  children?: Node[];
};

function spansOf(nodes: Node[] | undefined): InlineSpan[] {
  if (!nodes) return [];
  const out: InlineSpan[] = [];
  for (const node of nodes) {
    if (node.type === 'text' && typeof node.value === 'string') {
      out.push({ text: node.value, bold: node.bold, italic: node.italic });
    } else if (node.type === 'link') {
      out.push(...spansOf(node.children));
    } else if (node.children) {
      out.push(...spansOf(node.children));
    }
  }
  return out;
}

/** Parse a rich_text_field value into renderable blocks. Tolerates plain text. */
export function parseRichText(value: string | null | undefined): RichBlock[] {
  if (!value) return [];

  let root: Node;
  try {
    root = JSON.parse(value) as Node;
  } catch {
    // Not JSON — treat it as plain text split on blank lines.
    return value
      .split(/\n{2,}/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => ({ kind: 'paragraph', spans: [{ text: chunk }] }) as RichBlock);
  }

  const blocks: RichBlock[] = [];
  for (const node of root.children ?? []) {
    if (node.type === 'paragraph') {
      const spans = spansOf(node.children);
      if (spans.some((s) => s.text.trim())) blocks.push({ kind: 'paragraph', spans });
    } else if (node.type === 'heading') {
      blocks.push({ kind: 'heading', level: node.level ?? 3, spans: spansOf(node.children) });
    } else if (node.type === 'list') {
      const items = (node.children ?? []).map((li) => spansOf(li.children));
      blocks.push({ kind: 'list', ordered: node.listType === 'ordered', items });
    }
  }
  return blocks;
}

/** Flatten rich text to a single plain string (SEO descriptions, previews). */
export function richTextToPlain(value: string | null | undefined): string {
  return parseRichText(value)
    .flatMap((block) =>
      block.kind === 'list'
        ? block.items.map((item) => item.map((s) => s.text).join(''))
        : [block.spans.map((s) => s.text).join('')],
    )
    .join('\n\n')
    .trim();
}

/**
 * Aurae stores ingredient panels in `custom.what_s_inside` as a sequence of
 * "**Name — dose**" followed by an explanation paragraph. Split that into
 * structured ingredient rows for the Ingredients table.
 */
export type IngredientRow = { name: string; dose: string | null; detail: string };

export function parseIngredientRows(value: string | null | undefined): IngredientRow[] {
  const blocks = parseRichText(value);
  const rows: IngredientRow[] = [];

  for (const block of blocks) {
    if (block.kind !== 'paragraph') continue;

    // A heading-ish paragraph: entirely (or mostly) bold.
    const boldText = block.spans.filter((s) => s.bold).map((s) => s.text).join('').trim();
    const plainText = block.spans.filter((s) => !s.bold).map((s) => s.text).join('').trim();

    if (boldText && (!plainText || plainText.length < boldText.length)) {
      const { name, dose } = splitNameAndDose(boldText);
      rows.push({ name, dose, detail: plainText });
      continue;
    }

    // Continuation text for the previous ingredient.
    const body = block.spans.map((s) => s.text).join('').trim();
    if (!body) continue;
    if (rows.length) {
      rows[rows.length - 1].detail = [rows[rows.length - 1].detail, body]
        .filter(Boolean)
        .join(' ');
    } else {
      rows.push({ name: 'Formula', dose: null, detail: body });
    }
  }

  return rows.filter((row) => row.name);
}

function splitNameAndDose(text: string): { name: string; dose: string | null } {
  const clean = text.replace(/\s+/g, ' ').trim();
  // "Trans-Resveratrol 600mg — 50% concentration" / "NAD+ 500mg" / "Collagen — 20g per serving"
  const dash = clean.split(/\s+[—–-]\s+/);
  const head = dash[0];
  const tail = dash.slice(1).join(' — ') || null;

  const doseMatch = /\s((?:\d[\d.,]*)\s?(?:mcg|mg|g|iu|%|billion cfu)\b.*)$/i.exec(head);
  if (doseMatch) {
    return {
      name: head.slice(0, doseMatch.index).trim(),
      dose: [doseMatch[1].trim(), tail].filter(Boolean).join(' · '),
    };
  }
  return { name: head, dose: tail };
}

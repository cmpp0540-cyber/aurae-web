/**
 * The FDA structure/function disclaimer, shown under sections that make
 * benefit statements. Keep the wording identical everywhere it appears.
 */
export default function FdaNote({ className = '' }: { className?: string }) {
  return (
    <p
      className={`mx-auto max-w-[720px] text-center text-[11px] leading-relaxed text-espresso/55 ${className}`}
    >
      *These statements have not been evaluated by the Food and Drug Administration. This product is
      not intended to diagnose, treat, cure, or prevent any disease.
    </p>
  );
}
